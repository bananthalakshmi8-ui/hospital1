import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import StarRating from './StarRating'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToast } = useToast()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    addToast(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card-hover group relative overflow-hidden"
    >
      {product.discount > 0 && (
        <span className="badge-discount">-{product.discount}%</span>
      )}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-2xl bg-slate-50 dark:bg-slate-700/50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            {onQuickView && (
              <button
                onClick={(e) => { e.preventDefault(); onQuickView(product) }}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
              >
                <FiEye size={18} className="text-primary-600" />
              </button>
            )}
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full shadow-lg transition-colors ${inWishlist ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-50'}`}
            >
              <FiHeart size={18} className={inWishlist ? '' : 'text-red-500'} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <StarRating rating={product.rating} size={14} />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-primary-600">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button onClick={handleAddToCart} className="w-full btn-primary text-sm py-2.5">
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}
