/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Normalize email address (lowercase and trim)
 * @param {string} email - Email address to normalize
 * @returns {string} Normalized email
 */
const normalizeEmail = (email) => {
  return email.toLowerCase().trim();
};

/**
 * Extract domain from email
 * @param {string} email - Email address
 * @returns {string} Domain name
 */
const getEmailDomain = (email) => {
  return email.split('@')[1];
};

module.exports = {
  isValidEmail,
  normalizeEmail,
  getEmailDomain
};
