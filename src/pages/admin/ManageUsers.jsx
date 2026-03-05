import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usersApi } from '../../services/realApi';
import { addToast } from '../../redux/slices/notificationsSlice';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ManageUsers() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    usersApi
      .getAll()
      .then(setUsers)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeactivate = async (id) => {
    try {
      await usersApi.deactivate(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, is_active: false } : u)));
      dispatch(addToast({ type: 'info', message: 'User deactivated' }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Failed to deactivate user' }));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-primary-600" />
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="page-title">Users ({users.length})</h1>

      <div className="max-w-sm">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['User', 'Email', 'Phone', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 font-medium text-gray-500 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || `https://i.pravatar.cc/150?u=${u.email}`}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500">{u.phone || '—'}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={u.role === 'admin' ? 'primary' : 'default'}
                        className="capitalize"
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={u.is_active ? 'success' : 'danger'}>
                        {u.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(u.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      {u.role !== 'admin' && u.is_active && (
                        <Button size="sm" variant="danger" onClick={() => handleDeactivate(u.id)}>
                          Deactivate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
