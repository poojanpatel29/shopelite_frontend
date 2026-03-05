import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, addProduct, updateProduct } from '../../redux/slices/productsSlice';
import { addToast } from '../../redux/slices/notificationsSlice';
import { CATEGORIES } from '../../mock/categories';
import { productsApi } from '../../services/realApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existing = useSelector(id ? selectProductById(id) : () => null);
  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    name: existing?.name || '',
    category: existing?.category || 'electronics',
    price: existing?.price || '',
    discount: existing?.discount || 0,
    stock: existing?.stock || '',
    image: existing?.image || '',
    description: existing?.description || '',
    rating: existing?.rating || 4.5,
    reviews: existing?.reviews || 0,
    isFeatured: existing?.isFeatured || false,
    isNew: existing?.isNew || false,
  });
  const [loading, setLoading] = useState(false);

  const f = (key) => ({
    value: form[key],
    onChange: (e) =>
      setForm({
        ...form,
        [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const updated = await productsApi.update(id, form);
        dispatch(updateProduct(updated));
        dispatch(addToast({ type: 'success', message: 'Product updated!' }));
      } else {
        const created = await productsApi.create({
          ...form,
          images: [form.image],
          slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        });
        dispatch(addProduct(created));
        dispatch(addToast({ type: 'success', message: 'Product added!' }));
      }
      navigate('/admin/products');
    } catch (err) {
      dispatch(
        addToast({ type: 'error', message: err.response?.data?.detail || 'Failed to save product' })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          ← Back
        </Button>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Product Name" {...f('name')} required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select {...f('category')} className="input-field">
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Input label="Price (₹)" type="number" min="0" step="0.01" {...f('price')} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Discount (%)" type="number" min="0" max="100" {...f('discount')} />
            <Input label="Stock" type="number" min="0" {...f('stock')} required />
          </div>
          <Input label="Image URL" placeholder="https://..." {...f('image')} required />
          <div>
            <label className="label">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="input-field resize-none"
              placeholder="Product description..."
            />
          </div>
          <div className="flex gap-6">
            {[
              ['isFeatured', 'Featured Product'],
              ['isNew', 'Mark as New'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </label>
            ))}
          </div>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            {isEdit ? 'Save Changes' : 'Add Product'}
          </Button>
        </form>
      </div>
    </div>
  );
}
