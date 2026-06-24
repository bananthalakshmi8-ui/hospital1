import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useState } from 'react'
import { useToast } from '../../context/ToastContext'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/pharmacy', label: 'Pharmacy' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/lab-tests', label: 'Lab Tests' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const services = [
  { to: '/appointment', label: 'Book Appointment' },
  { to: '/prescription', label: 'Upload Prescription' },
  { to: '/lab-tests', label: 'Book Lab Test' },
  { to: '/pharmacy', label: 'Order Medicines' },
  { to: '/dashboard', label: 'My Dashboard' },
]

const socials = [
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { addToast } = useToast()

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      addToast('Successfully subscribed to newsletter!')
      setEmail('')
    }
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M+</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                MediCare <span className="text-primary-400">Plus</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your trusted digital healthcare partner. Quality medicines, expert doctors, and comprehensive health services at your fingertips.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-4">Stay Updated</h3>
            <p className="text-slate-400 mb-4 text-sm">Subscribe for health tips and exclusive offers.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                required
              />
              <button type="submit" className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors">
                <FiMail size={18} />
              </button>
            </form>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FiPhone className="text-primary-400" size={16} />
                1800-MEDICARE (6334227)
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-primary-400" size={16} />
                support@medicareplus.com
              </p>
              <p className="flex items-start gap-2">
                <FiMapPin className="text-primary-400 mt-0.5" size={16} />
                123 Healthcare Avenue, Medical District, Mumbai 400001
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} MediCare Plus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
