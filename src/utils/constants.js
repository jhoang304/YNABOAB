// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
}

// Default category colors
export const DEFAULT_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#84CC16', // Lime
  '#6366F1'  // Indigo
]

// Default categories
export const DEFAULT_CATEGORIES = [
  { name: 'Food & Dining', color: '#EF4444', icon: '🍽️' },
  { name: 'Transportation', color: '#3B82F6', icon: '🚗' },
  { name: 'Shopping', color: '#F59E0B', icon: '🛍️' },
  { name: 'Entertainment', color: '#8B5CF6', icon: '🎬' },
  { name: 'Bills & Utilities', color: '#6B7280', icon: '💡' },
  { name: 'Healthcare', color: '#10B981', icon: '🏥' },
  { name: 'Travel', color: '#14B8A6', icon: '✈️' },
  { name: 'Education', color: '#6366F1', icon: '📚' },
  { name: 'Salary', color: '#10B981', icon: '💰' },
  { name: 'Investment', color: '#3B82F6', icon: '📈' }
]

// Date formats
export const DATE_FORMATS = {
  'MM/DD/YYYY': 'MM/DD/YYYY',
  'DD/MM/YYYY': 'DD/MM/YYYY',
  'YYYY-MM-DD': 'YYYY-MM-DD'
}

// Currencies
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
}

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'ynaboab_theme',
  CURRENCY: 'ynaboab_currency',
  DATE_FORMAT: 'ynaboab_date_format'
}

// API error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please sign in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.'
}