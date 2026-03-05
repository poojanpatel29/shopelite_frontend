import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { addToast } from '../../redux/slices/notificationsSlice';
import { addressApi } from '../../services/realApi';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AddressBook() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    label: 'Home',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    isDefault: false,
  });

  useEffect(() => {
    addressApi.getAll().then(setAddresses).catch(console.error);
  }, []);

  const handleSave = async () => {
    try {
      const newAddr = await addressApi.create(form);
      setAddresses((prev) => [...prev, newAddr]);
      dispatch(addToast({ type: 'success', message: 'Address added!' }));
      setModal(false);
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to add address' }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await addressApi.delete(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      dispatch(addToast({ type: 'info', message: 'Address removed' }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to delete address' }));
    }
  };

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="page-title">Address Book</h1>
        <Button onClick={() => setModal(true)}>+ Add Address</Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📍</div>
          <p className="text-gray-500">No addresses saved yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="card p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{addr.label}</span>
                  {addr.isDefault && <Badge variant="primary">Default</Badge>}
                </div>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{addr.fullName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{addr.street}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {addr.city}, {addr.state} {addr.zip}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{addr.country}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add New Address">
        <div className="space-y-3">
          <div className="flex gap-3">
            {['Home', 'Work', 'Other'].map((l) => (
              <button
                key={l}
                onClick={() => setForm({ ...form, label: l })}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.label === l ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Input label="Full Name" {...f('fullName')} required />
          <Input label="Street" {...f('street')} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="City" placeholder="Mumbai" {...f('city')} required />
            <Input label="State" placeholder="Maharashtra" {...f('state')} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="PIN Code" placeholder="400001" {...f('zip')} required />
            <div>
              <label className="label">Country</label>
              <input
                value="India"
                readOnly
                className="input-field bg-gray-50 dark:bg-gray-800 cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Address
          </Button>
        </div>
      </Modal>
    </div>
  );
}
