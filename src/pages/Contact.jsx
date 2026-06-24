import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useToast } from '../context/ToastContext'

const emergencyNumbers = [
  { label: 'Emergency Helpline', number: '1800-633-4227', available: '24/7' },
  { label: 'Ambulance', number: '108', available: '24/7' },
  { label: 'Poison Control', number: '1066', available: '24/7' },
  { label: 'Mental Health Helpline', number: '1800-599-0019', available: '24/7' },
]

const supportInfo = [
  { title: 'Customer Support', desc: 'For orders, deliveries, and general queries', email: 'support@medicareplus.com', hours: 'Mon-Sat, 8AM-10PM' },
  { title: 'Medical Queries', desc: 'For prescription and medicine-related questions', email: 'medical@medicareplus.com', hours: 'Mon-Sat, 9AM-8PM' },
  { title: 'Lab Test Support', desc: 'For lab bookings and report queries', email: 'labs@medicareplus.com', hours: 'Mon-Sun, 7AM-9PM' },
]

export default function Contact() {
  const { addToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addToast('Message sent successfully! We\'ll get back to you soon.')
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/80">We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <ScrollReveal>
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your Name *" required />
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="Email *" required />
                </div>
                <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
                <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="Subject *" required />
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="input-field resize-none" placeholder="Your Message *" required />
                <button type="submit" className="btn-primary w-full">
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-sm text-slate-500 mt-1">123 Healthcare Avenue, Medical District, Mumbai 400001, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-sm text-slate-500 mt-1">1800-MEDICARE (6334227)</p>
                      <p className="text-sm text-slate-500">+91 22 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-sm text-slate-500 mt-1">support@medicareplus.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiClock className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Working Hours</h3>
                      <p className="text-sm text-slate-500 mt-1">Mon - Sat: 8:00 AM - 10:00 PM</p>
                      <p className="text-sm text-slate-500">Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Numbers */}
              <div className="glass-card p-6 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30">
                <h2 className="text-xl font-bold mb-4 text-red-700 dark:text-red-400">🚨 Emergency Numbers</h2>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyNumbers.map((item) => (
                    <div key={item.label} className="p-3 bg-white dark:bg-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="font-bold text-red-600">{item.number}</p>
                      <p className="text-xs text-green-600">{item.available}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Support Information */}
        <ScrollReveal className="mt-12">
          <h2 className="section-title text-center mb-8">Support Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportInfo.map((info) => (
              <div key={info.title} className="glass-card p-6 text-center">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{info.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{info.desc}</p>
                <p className="text-primary-600 text-sm font-medium">{info.email}</p>
                <p className="text-xs text-slate-400 mt-1">{info.hours}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Google Maps */}
        <ScrollReveal className="mt-12">
          <div className="glass-card overflow-hidden">
            <h2 className="text-xl font-bold p-6 pb-0">Find Us on Map</h2>
            <div className="p-6">
              <div className="w-full h-80 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                <iframe
                  title="MediCare Plus Location"
                  src="https://maps.google.com/maps?q=Mumbai+Medical+District&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
