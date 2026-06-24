import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiCreditCard, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { FaGooglePay, FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { SiPaytm } from 'react-icons/si'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const paymentMethods = [
  { id: 'upi', label: 'UPI', icons: ['GPay', 'Paytm', 'PhonePe'] },
  { id: 'credit', label: 'Credit Card', icons: ['Visa', 'Mastercard'] },
  { id: 'debit', label: 'Debit Card', icons: ['Visa', 'Mastercard'] },
  { id: 'netbanking', label: 'Net Banking', icons: ['All Banks'] },
  { id: 'cod', label: 'Cash on Delivery', icons: ['Pay on delivery'] },
]

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { addToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [address, setAddress] = useState({
    fullName: '', phone: '', email: '', address: '', city: '', state: '', pincode: '',
  })

  const deliveryFee = cartTotal > 499 ? 0 : 49
  const total = cartTotal + deliveryFee

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!address.fullName || !address.phone || !address.address || !address.pincode) {
      addToast('Please fill all required fields', 'error')
      return
    }
    setOrderPlaced(true)
    clearCart()
    addToast('Order placed successfully!')
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
          <Link to="/pharmacy" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-10 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
          <p className="text-slate-500 mb-2">Order ID: #MC{Date.now().toString().slice(-8)}</p>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Your order will be delivered within 24-48 hours.</p>
          <Link to="/dashboard" className="btn-primary">View Orders</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-primary-600 mb-6 font-medium">
          <FiArrowLeft /> Back to Cart
        </Link>
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Address */}
              <ScrollReveal>
                <div className="glass-card p-6">
                  <h2 className="flex items-center gap-2 font-bold text-lg mb-6">
                    <FiMapPin className="text-primary-600" /> Delivery Address
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="fullName" value={address.fullName} onChange={handleChange} className="input-field" placeholder="Full Name *" required />
                    <input name="phone" value={address.phone} onChange={handleChange} className="input-field" placeholder="Phone Number *" required />
                    <input name="email" type="email" value={address.email} onChange={handleChange} className="input-field md:col-span-2" placeholder="Email Address" />
                    <input name="address" value={address.address} onChange={handleChange} className="input-field md:col-span-2" placeholder="Street Address *" required />
                    <input name="city" value={address.city} onChange={handleChange} className="input-field" placeholder="City" />
                    <input name="state" value={address.state} onChange={handleChange} className="input-field" placeholder="State" />
                    <input name="pincode" value={address.pincode} onChange={handleChange} className="input-field" placeholder="PIN Code *" required />
                  </div>
                </div>
              </ScrollReveal>

              {/* Payment */}
              <ScrollReveal delay={0.1}>
                <div className="glass-card p-6">
                  <h2 className="flex items-center gap-2 font-bold text-lg mb-6">
                    <FiCreditCard className="text-primary-600" /> Payment Method
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="accent-primary-600"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-slate-800 dark:text-white">{method.label}</span>
                          <div className="flex gap-2 mt-1">
                            {method.id === 'upi' && (
                              <>
                                <FaGooglePay className="text-xl text-slate-600" />
                                <SiPaytm className="text-xl text-blue-500" />
                              </>
                            )}
                            {(method.id === 'credit' || method.id === 'debit') && (
                              <>
                                <FaCcVisa className="text-2xl text-blue-600" />
                                <FaCcMastercard className="text-2xl text-red-500" />
                              </>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Order Summary */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="glass-card p-6 sticky top-24">
                  <h2 className="font-bold text-lg mb-6">Order Summary</h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>₹{cartTotal}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span>Total</span><span className="text-primary-600">₹{total}</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-6 justify-center text-lg py-4">
                    Place Order — ₹{total}
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
