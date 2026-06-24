import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

function readWishlist() {
  try {
    const saved = localStorage.getItem('medicare-wishlist')
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem('medicare-wishlist')
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readWishlist)

  useEffect(() => {
    localStorage.setItem('medicare-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const safeWishlist = Array.isArray(wishlist) ? wishlist : []
  const isInWishlist = (productId) => safeWishlist.some((item) => item?.id === productId)

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <WishlistContext.Provider value={{ wishlist: safeWishlist, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

const defaultWishlist = {
  wishlist: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  removeFromWishlist: () => {},
}

export const useWishlist = () => useContext(WishlistContext) ?? defaultWishlist
