import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../redux/slices/authSlice';
import { addToast } from '../../redux/slices/notificationsSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { usersApi } from '../../services/realApi';

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await usersApi.update({ name: form.name, phone: form.phone });
      dispatch(updateUser(updated));
      dispatch(addToast({ type: 'success', message: 'Profile updated!' }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Update failed' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="page-title mb-8">Edit Profile</h1>
      <div className="card p-8">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Button type="submit" size="lg" loading={loading} className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
