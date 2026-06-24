import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiZap, FiCheck, FiArrowLeft } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/ui/ProductCard'
import StarRating from '../components/ui/StarRating'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToast } = useToast()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/pharmacy" className="btn-primary">Back to Pharmacy</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedProducts(product.id, product.category)
  const inWishlist = isInWishlist(product.id)
  const images = [product.image, product.image, product.image]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    addToast(`${product.name} added to cart`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    window.location.href = '/checkout'
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/pharmacy" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium">
          <FiArrowLeft /> Back to Pharmacy
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <ScrollReveal>
            <div className="glass-card p-6">
              <div className="relative mb-4 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                {product.discount > 0 && (
                  <span className="badge-discount">-{product.discount}% OFF</span>
                )}
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal delay={0.1}>
            <div>
              <span className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                {product.category.replace('-', ' ')}
              </span>
              <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white mt-2 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary-600">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-slate-400 line-through">₹{product.originalPrice}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-lg">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-slate-700 dark:text-slate-300">Quantity:</span>
                <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">-</button>
                  <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">+</button>
                </div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button onClick={handleAddToCart} className="btn-primary flex-1 min-w-[140px]">
                  <FiShoppingCart /> Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn-secondary flex-1 min-w-[140px]">
                  <FiZap /> Buy Now
                </button>
                <button
                  onClick={() => { toggleWishlist(product); addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist') }}
                  className={`p-3 rounded-xl border-2 transition-colors ${inWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-slate-200 dark:border-slate-600 hover:border-red-300'}`}
                >
                  <FiHeart size={20} className={inWishlist ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Benefits */}
              <div className="glass-card p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Ingredients</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{product.ingredients}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1">Usage Instructions</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{product.usage}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
