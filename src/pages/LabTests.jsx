import { Link } from 'react-router-dom'
import { FiHome, FiClock, FiCheck } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import { labTests } from '../data/labTests'

export default function LabTests() {
  const popularTests = labTests.filter((t) => t.popular)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Lab Tests & Diagnostics</h1>
          <p className="text-white/80">Accurate results with free home sample collection</p>
        </div>
      </div>

      {/* Home Collection Card */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <ScrollReveal>
          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FiHome className="text-white" size={28} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-2">Free Home Collection</h2>
              <p className="text-slate-600 dark:text-slate-400">Our certified phlebotomists will collect samples from your home at your preferred time. Reports delivered digitally within 24 hours.</p>
            </div>
            <Link to="/appointment" className="btn-primary whitespace-nowrap">Book Collection</Link>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ScrollReveal className="mb-10">
          <h2 className="section-title mb-2">Popular Lab Tests</h2>
          <p className="section-subtitle">Most booked diagnostic tests with accurate results</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTests.map((test, i) => (
            <ScrollReveal key={test.id} delay={i * 0.08}>
              <div className="glass-card-hover overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={test.image} alt={test.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-lg">Popular</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-1">{test.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{test.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><FiClock size={14} /> {test.duration}</span>
                    <span>{test.parameters} parameters</span>
                    {test.fasting && <span className="text-amber-600 font-medium">Fasting Required</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary-600">₹{test.price}</span>
                      <span className="text-sm text-slate-400 line-through ml-2">₹{test.originalPrice}</span>
                    </div>
                    <Link to="/appointment" className="btn-primary text-sm py-2 px-4">Book Test</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* All Tests */}
        <ScrollReveal className="mt-16 mb-10">
          <h2 className="section-title mb-2">All Available Tests</h2>
        </ScrollReveal>
        <div className="space-y-4">
          {labTests.map((test, i) => (
            <ScrollReveal key={test.id} delay={i * 0.05}>
              <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-hover transition-shadow">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{test.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{test.parameters} parameters · {test.duration} report time</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-bold text-primary-600">₹{test.price}</span>
                    <span className="text-sm text-slate-400 line-through ml-2">₹{test.originalPrice}</span>
                  </div>
                  <Link to="/appointment" className="btn-outline text-sm">Book</Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Why Choose Us */}
        <ScrollReveal className="mt-16">
          <div className="glass-card p-8 md:p-12">
            <h2 className="section-title text-center mb-8">Why Choose Our Lab Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'NABL Accredited', desc: 'All tests performed in NABL accredited laboratories' },
                { title: 'Digital Reports', desc: 'Reports delivered via email and accessible in your dashboard' },
                { title: 'Expert Consultation', desc: 'Free doctor consultation included with health packages' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
