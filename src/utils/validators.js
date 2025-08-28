export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== ''
}

export const validateAmount = (amount) => {
  const numAmount = parseFloat(amount)
  return !isNaN(numAmount) && numAmount > 0
}

export const validateDate = (date) => {
  const parsedDate = new Date(date)
  return parsedDate instanceof Date && !isNaN(parsedDate)
}

export const validateTransactionType = (type) => {
  return ['income', 'expense'].includes(type)
}

export const validateCategoryName = (name) => {
  return name && name.trim().length > 0 && name.trim().length <= 100
}

export const validateHexColor = (color) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color)
}