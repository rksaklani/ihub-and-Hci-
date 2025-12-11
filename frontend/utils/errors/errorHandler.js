/**
 * Extract error message from RTK Query error
 * @param {Object} error - RTK Query error object
 * @returns {string} - Error message
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  // RTK Query error with data
  if (error.data) {
    return error.data.message || error.data.error || 'An error occurred';
  }

  // Network error
  if (error.status === 'FETCH_ERROR') {
    return 'Network error. Please check your connection and try again.';
  }

  // Timeout error
  if (error.status === 'TIMEOUT_ERROR') {
    return 'Request timed out. Please try again.';
  }

  // Parsing error
  if (error.status === 'PARSING_ERROR') {
    return 'Error parsing server response.';
  }

  // Custom error
  if (error.status === 'CUSTOM_ERROR') {
    return error.error || 'An error occurred';
  }

  // HTTP errors
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access forbidden. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. Resource already exists.';
      case 422:
        return 'Validation error. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return `Error: ${error.status}`;
    }
  }

  // Validation errors
  if (error.errors && Array.isArray(error.errors)) {
    return error.errors.map((err) => err.message).join(', ');
  }

  // Default message
  return error.message || error.error || 'An unexpected error occurred';
};

/**
 * Check if error is authentication error
 * @param {Object} error - RTK Query error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error?.status === 401 || error?.status === 403;
};

/**
 * Check if error is network error
 * @param {Object} error - RTK Query error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error?.status === 'FETCH_ERROR' || !navigator.onLine;
};

/**
 * Check if error is validation error
 * @param {Object} error - RTK Query error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error?.status === 400 || error?.status === 422;
};

/**
 * Format validation errors for form display
 * @param {Object} error - RTK Query error object
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const formatValidationErrors = (error) => {
  const formattedErrors = {};

  if (error?.data?.errors && Array.isArray(error.data.errors)) {
    error.data.errors.forEach((err) => {
      if (err.field) {
        formattedErrors[err.field] = err.message;
      }
    });
  }

  return formattedErrors;
};

/**
 * Log error to console in development
 * @param {Object} error - Error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
  }
};

/**
 * Show error notification/toast
 * @param {Object} error - RTK Query error object
 * @param {Function} notifyFn - Function to display notification
 * @param {string} fallbackMessage - Fallback error message
 */
export const showErrorNotification = (
  error,
  notifyFn,
  fallbackMessage = 'An error occurred'
) => {
  const message = getErrorMessage(error) || fallbackMessage;

  if (notifyFn && typeof notifyFn === 'function') {
    notifyFn(message, 'error');
  } else {
    // Fallback to alert if no notification function provided
    if (typeof window !== 'undefined') {
      alert(message);
    }
  }
};

export default {
  getErrorMessage,
  isAuthError,
  isNetworkError,
  isValidationError,
  formatValidationErrors,
  logError,
  showErrorNotification,
};
