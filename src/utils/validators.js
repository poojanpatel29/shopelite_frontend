export const validators = {
  required: (val) => (!val || !String(val).trim() ? 'This field is required' : ''),
  email: (val) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Enter a valid email' : ''),
  minLength: (val, n) => (String(val).length < n ? `Minimum ${n} characters required` : ''),
  maxLength: (val, n) => (String(val).length > n ? `Maximum ${n} characters allowed` : ''),
  numeric: (val) => (isNaN(Number(val)) ? 'Must be a number' : ''),
  positive: (val) => (Number(val) <= 0 ? 'Must be a positive number' : ''),
  phone: (val) => (!/^\+?[\d\s-()]{7,}$/.test(val) ? 'Enter a valid phone number' : ''),
  url: (val) => {
    try {
      new URL(val);
      return '';
    } catch {
      return 'Enter a valid URL';
    }
  },
  matches: (val, match, label) => (val !== match ? `Must match ${label}` : ''),
};

export function validate(rules, data) {
  const errors = {};
  Object.entries(rules).forEach(([field, fieldRules]) => {
    for (const rule of fieldRules) {
      const err = rule(data[field], data);
      if (err) {
        errors[field] = err;
        break;
      }
    }
  });
  return errors;
}
