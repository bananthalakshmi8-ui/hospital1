const STORAGE_KEYS = {
  theme: 'medicare-theme',
  cart: 'medicare-cart',
  wishlist: 'medicare-wishlist',
}

export function sanitizeAppStorage() {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.theme)
    if (theme) {
      const parsed = JSON.parse(theme)
      if (typeof parsed !== 'boolean') {
        localStorage.removeItem(STORAGE_KEYS.theme)
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.theme)
  }

  try {
    const cart = localStorage.getItem(STORAGE_KEYS.cart)
    if (cart) {
      const parsed = JSON.parse(cart)
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(STORAGE_KEYS.cart)
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.cart)
  }

  try {
    const wishlist = localStorage.getItem(STORAGE_KEYS.wishlist)
    if (wishlist) {
      const parsed = JSON.parse(wishlist)
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(STORAGE_KEYS.wishlist)
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.wishlist)
  }
}
