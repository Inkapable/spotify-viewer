/**
 * Utils: Utilities.
 * - Global functions that can be used across multiple files.
 * -----------------------------------------------------------------------------
 */

/**
 * Get stored authorisation object.
 * @return {Object}
 */
export function getStoredAuth() {
    return JSON.parse(window.localStorage.getItem('auth-state')) || {}
}

/**
 * Set stored authorisation object.
 * @return {Object}
 */
export function setStoredAuth(authState = {}) {
    window.localStorage.setItem('auth-state', JSON.stringify(authState))
}
