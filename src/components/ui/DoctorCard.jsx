import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiUser } from 'react-icons/fi'
import StarRating from './StarRating'

export default function DoctorCard({ doctor }) {
  const availabilityColors = {
    available: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    busy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card-hover overflow-hidden">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover object-top"
          loading="lazy"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${availabilityColors[doctor.availability]}`}>
          {doctor.availability === 'available' ? 'Available' : 'Busy'}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
          {doctor.name}
        </h3>
        <p className="text-primary-600 font-medium text-sm mb-2">{doctor.specialization}</p>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <FiUser size={14} />
            {doctor.experience} yrs
          </span>
          <StarRating rating={doctor.rating} size={14} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">Consultation Fee</span>
          <span className="font-bold text-primary-600">₹{doctor.fee}</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/appointment?doctor=${doctor.id}`}
            className="flex-1 btn-primary text-sm py-2.5 justify-center"
          >
            <FiCalendar size={16} />
            Book
          </Link>
          <Link
            to={`/doctors`}
            className="flex-1 btn-secondary text-sm py-2.5 justify-center"
          >
            Profile
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
