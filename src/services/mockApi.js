import { PRODUCTS } from '../mock/products';
import { MOCK_ORDERS } from '../mock/orders';
import { MOCK_USERS } from '../mock/users';

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const api = {
  // Products
  getProducts: async () => {
    await delay();
    return PRODUCTS;
  },
  getProductById: async (id) => {
    await delay();
    return PRODUCTS.find((p) => p.id === Number(id));
  },
  createProduct: async (data) => {
    await delay();
    const p = { ...data, id: Date.now() };
    PRODUCTS.push(p);
    return p;
  },
  updateProduct: async (id, d) => {
    await delay();
    const i = PRODUCTS.findIndex((p) => p.id === Number(id));
    if (i !== -1) PRODUCTS[i] = { ...PRODUCTS[i], ...d };
    return PRODUCTS[i];
  },
  deleteProduct: async (id) => {
    await delay();
    const i = PRODUCTS.findIndex((p) => p.id === Number(id));
    PRODUCTS.splice(i, 1);
    return true;
  },

  // Orders
  getOrders: async () => {
    await delay();
    return MOCK_ORDERS;
  },
  getOrdersByUser: async (userId) => {
    await delay();
    return MOCK_ORDERS.filter((o) => o.userId === userId);
  },
  createOrder: async (data) => {
    await delay();
    const o = { ...data, id: `ORD-${Date.now()}`, createdAt: new Date().toISOString() };
    MOCK_ORDERS.push(o);
    return o;
  },
  updateOrderStatus: async (id, status) => {
    await delay();
    const o = MOCK_ORDERS.find((o) => o.id === id);
    if (o) o.status = status;
    return o;
  },

  // Auth
  login: async (email, password) => {
    await delay(800);
    const u = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!u) throw new Error('Invalid credentials');
    const { password: _, ...safe } = u;
    return safe;
  },
  register: async (data) => {
    await delay(800);
    const e = MOCK_USERS.find((u) => u.email === data.email);
    if (e) throw new Error('Email already registered');
    const u = { ...data, id: Date.now(), role: 'user', isActive: true };
    MOCK_USERS.push(u);
    const { password: _, ...safe } = u;
    return safe;
  },
};
