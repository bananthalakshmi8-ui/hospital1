import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch, FiUpload, FiShoppingBag, FiPhone, FiArrowRight,
  FiChevronLeft, FiChevronRight,
} from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/ui/ProductCard'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FAQ from '../components/ui/FAQ'
import { getBestsellers } from '../data/products'
import { doctorCategories } from '../data/doctors'
import { healthPackages } from '../data/labTests'
import { features, testimonials, stats, faqs } from '../data/content'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const navigate = useNavigate()
  const bestsellers = getBestsellers()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/pharmacy?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/60" />

        {/* Floating elements */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 text-6xl opacity-20 hidden lg:block">💊</motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-40 right-20 text-5xl opacity-20 hidden lg:block">🩺</motion.div>
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} className="absolute bottom-40 left-20 text-5xl opacity-20 hidden lg:block">❤️</motion.div>
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-20 right-10 text-6xl opacity-20 hidden lg:block">🏥</motion.div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                🏆 India's #1 Digital Healthcare Platform
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your Trusted Digital Healthcare Partner
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
                Order medicines, consult doctors, book lab tests, and manage your health — all from one trusted platform. Fast delivery, genuine products, expert care.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative mb-6 max-w-lg">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medicines, health products..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-800 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link to="/prescription" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                  <FiUpload size={18} />
                  Upload Prescription
                </Link>
                <Link to="/pharmacy" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all">
                  <FiShoppingBag size={18} />
                  Shop Medicines
                </Link>
              </div>
            </motion.div>

            {/* Emergency Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="glass-card p-8 bg-white/10 backdrop-blur-xl border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <FiPhone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">24/7 Emergency</h3>
                    <p className="text-white/70 text-sm">Always here when you need us</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span className="text-white/80">Emergency Helpline</span>
                    <span className="text-white font-bold text-xl">1800-633-4227</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span className="text-white/80">Ambulance</span>
                    <span className="text-white font-bold text-xl">108</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span className="text-white/80">Poison Control</span>
                    <span className="text-white font-bold text-xl">1066</span>
                  </div>
                </div>
                <Link to="/contact" className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">
                  Contact Emergency <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">Complete Healthcare Solutions</h2>
            <p className="section-subtitle mx-auto">Everything you need for your health and wellness, delivered with care.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="glass-card-hover p-6 text-center group cursor-pointer">
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{feature.icon}</span>
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Categories */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="section-title mb-4">Find Expert Doctors</h2>
              <p className="section-subtitle">Consult with specialists across all major departments.</p>
            </div>
            <Link to="/doctors" className="btn-primary text-sm">
              View All Doctors <FiArrowRight />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {doctorCategories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.08}>
                <Link to={`/doctors?department=${cat.id}`} className="glass-card-hover p-6 text-center block group">
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{cat.name}</h3>
                  <p className="text-xs text-primary-600 mt-1">{cat.count} Doctors</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="section-title mb-4">Best Selling Products</h2>
              <p className="section-subtitle">Top-rated medicines and health products trusted by thousands.</p>
            </div>
            <Link to="/pharmacy" className="btn-primary text-sm">
              View All Products <FiArrowRight />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">Health Checkup Packages</h2>
            <p className="section-subtitle mx-auto">Comprehensive health screening packages at affordable prices.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthPackages.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 0.1}>
                <div className="glass-card-hover overflow-hidden group">
                  <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                    <span className="text-4xl mb-2 block">{pkg.icon}</span>
                    <h3 className="font-display font-bold text-xl">{pkg.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{pkg.tests} Tests Included</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary-600">₹{pkg.price}</span>
                      <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/lab-tests" className="w-full btn-primary text-sm py-2.5 justify-center">
                      Book Now
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">What Our Patients Say</h2>
            <p className="section-subtitle mx-auto">Trusted by over 5 lakh patients across India.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 relative">
              <div className="text-6xl text-primary-200 absolute top-4 left-6">"</div>
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 relative z-10">
                  {testimonials[testimonialIndex].text}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-slate-800 dark:text-white">{testimonials[testimonialIndex].name}</h4>
                    <p className="text-sm text-slate-500">{testimonials[testimonialIndex].role}</p>
                  </div>
                </div>
              </motion.div>
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevTestimonial} className="p-2 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors">
                  <FiChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIndex ? 'bg-primary-600 w-6' : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
                <button onClick={nextTestimonial} className="p-2 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors">
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/80 font-medium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">Find answers to common questions about our services.</p>
          </ScrollReveal>
          <ScrollReveal>
            <FAQ items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20">
              <h2 className="section-title mb-4">Subscribe to Our Newsletter</h2>
              <p className="section-subtitle mx-auto mb-8">Get health tips, exclusive offers, and updates delivered to your inbox.</p>
              <form onSubmit={(e) => { e.preventDefault(); setNewsletterEmail('') }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field flex-1"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
