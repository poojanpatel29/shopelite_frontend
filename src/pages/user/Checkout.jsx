import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../redux/slices/cartSlice'
import { clearCart } from '../../redux/slices/cartSlice'
import { addToast } from '../../redux/slices/notificationsSlice'
import { ordersApi, addressApi } from '../../services/realApi'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Price from '../../components/common/Price'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const items     = useSelector(selectCartItems)

  const [step,              setStep]              = useState(0)
  const [loading,           setLoading]           = useState(false)
  const [addresses,         setAddresses]         = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [showNewForm,       setShowNewForm]       = useState(false)
  const [payment,           setPayment]           = useState({ method: 'upi' })

  const [newAddress, setNewAddress] = useState({
    label:     'Home',
    full_name: '',
    street:    '',
    city:      '',
    state:     '',
    zip:       '',
    phone:     '',
    country:   'India',
    is_default: false,
  })

  // Fetch addresses on mount
  useEffect(() => {
    addressApi.getAll()
      .then((data) => {
        setAddresses(data)
        const def = data.find((a) => a.is_default)
        if (def) setSelectedAddressId(def.id)
        else if (data.length > 0) setSelectedAddressId(data[0].id)
        else setShowNewForm(true)
      })
      .catch((err) => {
        console.error(err)
        setShowNewForm(true)
      })
  }, [])

  // Cart calculations
  const subtotal = items.reduce((sum, i) => {
    const price = i.discount ? i.price * (1 - i.discount / 100) : i.price
    return sum + price * i.quantity
  }, 0)
  const shipping = subtotal >= 500 ? 0 : 99
  const tax      = subtotal * 0.18
  const grand    = subtotal + shipping + tax

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)

  const f = (field) => ({
    value:    newAddress[field],
    onChange: (e) => setNewAddress((prev) => ({ ...prev, [field]: e.target.value })),
  })

  const handleSaveNewAddress = async () => {
    if (!newAddress.full_name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.phone) {
      dispatch(addToast({ type: 'error', message: 'Please fill all address fields' }))
      return
    }
    try {
      const saved = await addressApi.create(newAddress)
      setAddresses((prev) => [...prev, saved])
      setSelectedAddressId(saved.id)
      setShowNewForm(false)
      dispatch(addToast({ type: 'success', message: 'Address saved!' }))
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to save address' }))
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      dispatch(addToast({ type: 'error', message: 'Please select a delivery address' }))
      return
    }
    setLoading(true)
    try {
      const order = await ordersApi.create({
        items:          items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        address_id:     selectedAddressId,
        payment_method: payment.method,
      })
      dispatch(clearCart())
      dispatch(addToast({ type: 'success', message: 'Order placed successfully! 🎉' }))
      navigate(`/order-summary/${order.id}`)
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.detail || 'Order failed. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step  ? 'bg-green-500 text-white' :
                i === step ? 'bg-primary-600 text-white' :
                             'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? 'text-primary-600' : 'text-gray-500'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 mx-3 ${i < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Steps */}
        <div className="lg:col-span-2 space-y-6">

          {/* Step 0 — Shipping */}
          {step === 0 && (
            <div className="card p-6 space-y-4">
              <h2 className="section-title">Delivery Address</h2>

              {/* Existing addresses */}
              {addresses.length > 0 && (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1 text-primary-600"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{addr.full_name}</p>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">{addr.label}</span>
                          {addr.is_default && <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{addr.street}, {addr.city}, {addr.state} — {addr.zip}</p>
                        <p className="text-sm text-gray-500">{addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Add new address toggle */}
              {!showNewForm ? (
                <button
                  onClick={() => setShowNewForm(true)}
                  className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-4 text-sm text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-all"
                >
                  + Add New Address
                </button>
              ) : (
                <div className="border-2 border-primary-200 dark:border-primary-800 rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">New Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Full Name"    placeholder="Priya Patel"           {...f('full_name')} required />
                    <Input label="Phone"        placeholder="+91-98765-43210"        {...f('phone')}    required />
                  </div>
                  <Input   label="Street"       placeholder="12, MG Road, Banjara Hills" {...f('street')} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="City"         placeholder="Hyderabad"             {...f('city')}     required />
                    <Input label="State"        placeholder="Telangana"             {...f('state')}    required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="PIN Code"     placeholder="500034"                {...f('zip')}      required />
                    <div>
                      <label className="label">Country</label>
                      <input value="India" readOnly className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed text-gray-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={newAddress.is_default}
                      onChange={(e) => setNewAddress((p) => ({ ...p, is_default: e.target.checked }))}
                      className="rounded text-primary-600"
                    />
                    <label htmlFor="isDefault" className="text-sm text-gray-600 dark:text-gray-400">Set as default address</label>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSaveNewAddress} size="sm">Save Address</Button>
                    {addresses.length > 0 && (
                      <Button onClick={() => setShowNewForm(false)} variant="secondary" size="sm">Cancel</Button>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setStep(1)}
                disabled={!selectedAddressId}
                className="w-full"
                size="lg"
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 1 — Payment */}
          {step === 1 && (
            <div className="card p-6 space-y-4">
              <h2 className="section-title">Payment Method</h2>
              <div className="space-y-3">
                {[
                  ['upi',        '📱 UPI (GPay / PhonePe / Paytm)'],
                  ['netbanking', '🏦 Net Banking'],
                  ['card',       '💳 Credit / Debit Card'],
                  ['emi',        '📅 No Cost EMI'],
                  ['cod',        '💵 Cash on Delivery'],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      payment.method === val
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={val}
                      checked={payment.method === val}
                      onChange={(e) => setPayment({ method: e.target.value })}
                      className="text-primary-600"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={() => setStep(0)} size="lg" className="flex-1">Back</Button>
                <Button onClick={() => setStep(2)} size="lg" className="flex-1">Review Order</Button>
              </div>
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div className="card p-6 space-y-6">
              <h2 className="section-title">Review Your Order</h2>

              {/* Delivery address summary */}
              {selectedAddress && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Delivering To</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedAddress.full_name}</p>
                  <p className="text-sm text-gray-500">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} — {selectedAddress.zip}</p>
                  <p className="text-sm text-gray-500">{selectedAddress.phone}</p>
                </div>
              )}

              {/* Payment summary */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Payment</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{payment.method}</p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Items ({items.length})</p>
                {items.map((item) => {
                  const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <Price amount={price * item.quantity} className="font-semibold text-gray-900 dark:text-white" />
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={() => setStep(1)} size="lg" className="flex-1">Back</Button>
                <Button onClick={handlePlaceOrder} loading={loading} size="lg" className="flex-1">
                  {loading ? 'Placing Order...' : 'Place Order 🎉'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="space-y-4">
          <div className="card p-6 sticky top-24">
            <h2 className="section-title mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <Price amount={price * item.quantity} className="text-sm font-semibold text-gray-900 dark:text-white flex-shrink-0" />
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <Price amount={subtotal} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                {shipping === 0
                  ? <span className="text-green-500 font-medium">FREE</span>
                  : <Price amount={shipping} />
                }
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (18%)</span>
                <Price amount={tax} />
              </div>
              {subtotal < 500 && (
                <p className="text-xs text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-2 rounded-lg">
                  Add ₹{(500 - subtotal).toLocaleString('en-IN')} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <Price amount={grand} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}