export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
};

export const truncate = (str, n = 100) => (str.length > n ? str.slice(0, n) + '...' : str);
export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const inr = (price) => '₹' + Number(price).toLocaleString('en-IN');
