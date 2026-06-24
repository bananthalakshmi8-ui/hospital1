import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

function readCart() {
  try {
    const saved = localStorage.getItem('medicare-cart')
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem('medicare-cart')
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart)

  useEffect(() => {
    localStorage.setItem('medicare-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCart([])

  const safeCart = Array.isArray(cart) ? cart : []
  const cartTotal = safeCart.reduce((sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0), 0)
  const cartCount = safeCart.reduce((sum, item) => sum + (item?.quantity ?? 0), 0)

  return (
    <CartContext.Provider
      value={{ cart: safeCart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

const defaultCart = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
}

export const useCart = () => useContext(CartContext) ?? defaultCart
