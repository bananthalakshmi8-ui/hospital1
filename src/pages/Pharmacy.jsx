import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/ui/ProductCard'
import Modal from '../components/ui/Modal'
import StarRating from '../components/ui/StarRating'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function Pharmacy() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState('popular')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const { addToCart } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      default: result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
    }
    return result
  }, [search, selectedCategory, priceRange, sortBy])

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'all' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>{cat.icon}</span> {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-sm text-slate-500">
            <span>₹0</span>
            <span className="font-medium text-primary-600">₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field text-sm"
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Pharmacy Store</h1>
          <p className="text-white/80 mb-6">Genuine medicines and health products delivered to your doorstep</p>
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines, vitamins, supplements..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 text-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600 dark:text-slate-400">
                Showing <span className="font-semibold text-slate-800 dark:text-white">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm"
                >
                  <FiFilter size={16} /> Filters
                </button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-slate-400'}`}>
                  <FiGrid size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-slate-400'}`}>
                  <FiList size={18} />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-slate-500 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 0.05}>
                    <ProductCard product={product} onQuickView={setQuickViewProduct} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><FiX size={24} /></button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <Modal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} title="Quick View" size="lg">
        {quickViewProduct && (
          <div className="grid md:grid-cols-2 gap-6">
            <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 object-cover rounded-xl" />
            <div>
              <h3 className="text-xl font-bold mb-2">{quickViewProduct.name}</h3>
              <StarRating rating={quickViewProduct.rating} />
              <div className="flex items-center gap-2 my-4">
                <span className="text-2xl font-bold text-primary-600">₹{quickViewProduct.price}</span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-slate-400 line-through">₹{quickViewProduct.originalPrice}</span>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{quickViewProduct.description}</p>
              <button
                onClick={() => { addToCart(quickViewProduct); addToast('Added to cart'); setQuickViewProduct(null) }}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
