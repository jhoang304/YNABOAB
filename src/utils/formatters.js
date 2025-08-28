export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount || 0)
}

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }
  
  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatNumber = (number, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number || 0)
}

export const formatPercentage = (value, decimals = 1) => {
  return `${(value || 0).toFixed(decimals)}%`
}