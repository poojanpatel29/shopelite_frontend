import { useState } from 'react';
import { CATEGORIES } from '../../mock/categories';
import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/slices/notificationsSlice';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

export default function ManageCategories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(CATEGORIES);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', icon: '📦' });

  const handleAdd = () => {
    const newCat = {
      id: Date.now(),
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, '-'),
      icon: form.icon,
      productCount: 0,
    };
    setCategories([...categories, newCat]);
    dispatch(addToast({ type: 'success', message: `Category "${form.name}" added!` }));
    setModal(false);
    setForm({ name: '', icon: '📦' });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
    dispatch(addToast({ type: 'info', message: 'Category deleted' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Categories ({categories.length})</h1>
        <Button onClick={() => setModal(true)}>+ Add Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="card p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{cat.icon}</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.productCount} products</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Category">
        <div className="space-y-4">
          <Input
            label="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Furniture"
          />
          <Input
            label="Icon (emoji)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="📦"
          />
          <Button className="w-full" onClick={handleAdd} disabled={!form.name}>
            Add Category
          </Button>
        </div>
      </Modal>
    </div>
  );
}
