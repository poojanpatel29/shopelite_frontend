import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllProducts,
  deleteProduct,
  setProducts,
  setTotal,
} from '../../redux/slices/productsSlice';
import { addToast } from '../../redux/slices/notificationsSlice';
import { useEffect } from 'react';
import { productsApi } from '../../services/realApi';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ManageProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    productsApi.getAll({ per_page: 100 }).then((data) => {
      dispatch(setProducts(data.items));
      dispatch(setTotal(data.total));
    });
  }, [dispatch]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await productsApi.delete(id);
      dispatch(deleteProduct(id));
      dispatch(addToast({ type: 'info', message: `${name} deleted` }));
    } catch {
      dispatch(addToast({ type: 'error', message: 'Delete failed' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Products ({products.length})</h1>
        <Link to="/admin/products/new">
          <Button>+ Add Product</Button>
        </Link>
      </div>

      <div className="max-w-sm">
        <Input
          placeholder="Search products..."
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
                {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map((h) => (
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
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                        {p.discount > 0 && (
                          <Badge variant="danger" className="text-[10px]">
                            -{p.discount}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-500">{p.category}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ₹{p.price}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={p.stock > 20 ? 'success' : p.stock > 0 ? 'warning' : 'danger'}>
                      {p.stock}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-medium text-gray-900 dark:text-white">{p.rating}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/products/${p.id}/edit`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(p.id, p.name)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
