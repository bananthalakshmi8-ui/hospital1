import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import DoctorCard from '../components/ui/DoctorCard'
import { doctors } from '../data/doctors'

export default function Doctors() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState(searchParams.get('department') || 'all')
  const [availability, setAvailability] = useState('all')
  const [experience, setExperience] = useState('all')

  const filteredDoctors = useMemo(() => {
    let result = [...doctors]
    if (search) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.specialization.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (department !== 'all') {
      result = result.filter((d) => d.department === department)
    }
    if (availability !== 'all') {
      result = result.filter((d) => d.availability === availability)
    }
    if (experience === '5+') {
      result = result.filter((d) => d.experience >= 5)
    } else if (experience === '10+') {
      result = result.filter((d) => d.experience >= 10)
    } else if (experience === '15+') {
      result = result.filter((d) => d.experience >= 15)
    }
    return result
  }, [search, department, availability, experience])

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedic', label: 'Orthopedic' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'general', label: 'General Medicine' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Our Expert Doctors</h1>
          <p className="text-white/80 mb-6">Book appointments with top specialists across all departments</p>
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors by name or specialization..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 text-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <ScrollReveal>
          <div className="glass-card p-4 md:p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-primary-600" />
              <h3 className="font-semibold text-slate-800 dark:text-white">Filter Doctors</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="input-field text-sm">
                  {departments.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Availability</label>
                <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="input-field text-sm">
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Experience</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="input-field text-sm">
                  <option value="all">All Experience</option>
                  <option value="5+">5+ Years</option>
                  <option value="10+">10+ Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Showing <span className="font-semibold text-slate-800 dark:text-white">{filteredDoctors.length}</span> doctors
        </p>

        {filteredDoctors.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-slate-500 text-lg">No doctors found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, i) => (
              <ScrollReveal key={doctor.id} delay={i * 0.05}>
                <DoctorCard doctor={doctor} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
