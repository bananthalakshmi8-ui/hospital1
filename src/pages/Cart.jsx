import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiTag } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useState } from 'react'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const { addToast } = useToast()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'MEDICARE10') {
      setDiscount(cartTotal * 0.1)
      addToast('Coupon applied! 10% discount')
    } else if (coupon.toUpperCase() === 'HEALTH20') {
      setDiscount(cartTotal * 0.2)
      addToast('Coupon applied! 20% discount')
    } else {
      addToast('Invalid coupon code', 'error')
    }
  }

  const deliveryFee = cartTotal > 499 ? 0 : 49
  const total = cartTotal - discount + deliveryFee

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-slate-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 mb-6">Add some medicines or health products to get started.</p>
          <Link to="/pharmacy" className="btn-primary">Browse Pharmacy</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div className="glass-card p-4 md:p-6 flex gap-4 md:gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white truncate">{item.name}</h3>
                        <p className="text-primary-600 font-bold mt-1">₹{item.price}</p>
                      </div>
                      <button onClick={() => { removeFromCart(item.id); addToast('Item removed') }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"><FiMinus size={14} /></button>
                        <span className="px-4 py-1.5 font-semibold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700"><FiPlus size={14} /></button>
                      </div>
                      <span className="font-bold text-slate-800 dark:text-white">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <button onClick={() => { clearCart(); addToast('Cart cleared') }} className="text-red-500 text-sm font-medium hover:underline">
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div>
            <ScrollReveal>
              <div className="glass-card p-6 sticky top-24">
                <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-6">Order Summary</h2>

                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button onClick={applyCoupon} className="btn-outline text-sm py-2">Apply</button>
                </div>
                <p className="text-xs text-slate-400 mb-4">Try: MEDICARE10 or HEALTH20</p>

                <div className="space-y-3 text-sm border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{Math.round(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span>Total</span>
                    <span className="text-primary-600">₹{Math.round(total)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="btn-primary w-full mt-6 justify-center">
                  Proceed to Checkout
                </Link>
                <Link to="/pharmacy" className="block text-center text-primary-600 text-sm mt-4 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
