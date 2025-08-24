export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: any, type: string): boolean => {
  if (!value) return false;
  
  switch (type) {
    case 'text':
    case 'textarea':
    case 'email':
      return typeof value === 'string' && value.trim().length > 0;
    case 'number':
      return typeof value === 'number' && !isNaN(value) && value > 0;
    case 'select':
      return typeof value === 'string' && value.length > 0;
    case 'multiselect':
      return Array.isArray(value) && value.length > 0;
    default:
      return true;
  }
};

export const sanitizeInput = (value: any, type: string): any => {
  switch (type) {
    case 'text':
    case 'textarea':
    case 'email':
      return typeof value === 'string' ? value.trim() : '';
    case 'number':
      return typeof value === 'number' ? value : (typeof value === 'string' ? parseInt(value, 10) : 0);
    case 'select':
      return typeof value === 'string' ? value : '';
    case 'multiselect':
      return Array.isArray(value) ? value : [];
    default:
      return value;
  }
};