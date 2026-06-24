import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import Modal from '../components/ui/Modal'
import { doctors, departments } from '../data/doctors'

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
]

export default function Appointment() {
  const [searchParams] = useSearchParams()
  const preselectedDoctor = searchParams.get('doctor')
  const [form, setForm] = useState({
    patientName: '',
    mobile: '',
    email: '',
    doctor: preselectedDoctor || '',
    department: '',
    date: '',
    time: '',
    symptoms: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.patientName.trim()) newErrors.patientName = 'Patient name is required'
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = 'Valid 10-digit mobile required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required'
    if (!form.doctor) newErrors.doctor = 'Please select a doctor'
    if (!form.department) newErrors.department = 'Please select department'
    if (!form.date) newErrors.date = 'Please select date'
    if (!form.time) newErrors.time = 'Please select time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setShowSuccess(true)
  }

  const selectedDoctor = doctors.find((d) => d.id === Number(form.doctor))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Book an Appointment</h1>
          <p className="text-white/80">Schedule a consultation with our expert doctors</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <FiUser size={16} /> Patient Name *
                </label>
                <input name="patientName" value={form.patientName} onChange={handleChange} className={`input-field ${errors.patientName ? 'border-red-500' : ''}`} placeholder="Enter full name" />
                {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <FiPhone size={16} /> Mobile Number *
                </label>
                <input name="mobile" value={form.mobile} onChange={handleChange} className={`input-field ${errors.mobile ? 'border-red-500' : ''}`} placeholder="10-digit mobile number" />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <FiMail size={16} /> Email Address *
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={`input-field ${errors.email ? 'border-red-500' : ''}`} placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Department *</label>
                <select name="department" value={form.department} onChange={handleChange} className={`input-field ${errors.department ? 'border-red-500' : ''}`}>
                  <option value="">Select Department</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Select Doctor *</label>
                <select name="doctor" value={form.doctor} onChange={handleChange} className={`input-field ${errors.doctor ? 'border-red-500' : ''}`}>
                  <option value="">Choose Doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
                  ))}
                </select>
                {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
              </div>
            </div>

            {selectedDoctor && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <img src={selectedDoctor.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{selectedDoctor.name}</h4>
                  <p className="text-sm text-primary-600">{selectedDoctor.specialization}</p>
                  <p className="text-sm text-slate-500">Fee: ₹{selectedDoctor.fee}</p>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <FiCalendar size={16} /> Preferred Date *
                </label>
                <input name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={`input-field ${errors.date ? 'border-red-500' : ''}`} />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <FiClock size={16} /> Preferred Time *
                </label>
                <select name="time" value={form.time} onChange={handleChange} className={`input-field ${errors.time ? 'border-red-500' : ''}`}>
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Symptoms / Reason for Visit</label>
              <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={4} className="input-field resize-none" placeholder="Describe your symptoms or reason for consultation..." />
            </div>

            <button type="submit" className="btn-primary w-full text-lg py-4">
              <FiCalendar /> Confirm Appointment
            </button>
          </form>
        </ScrollReveal>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} size="md">
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="text-green-500" size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Appointment Booked!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Your appointment with {selectedDoctor?.name || 'the doctor'} on {form.date} at {form.time} has been confirmed.
          </p>
          <p className="text-sm text-slate-500 mb-6">Confirmation sent to {form.email}</p>
          <button onClick={() => setShowSuccess(false)} className="btn-primary">Done</button>
        </div>
      </Modal>
    </div>
  )
}
