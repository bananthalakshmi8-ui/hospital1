import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiGrid, FiPackage, FiCalendar, FiFileText, FiHeart, FiActivity,
  FiSettings, FiBell, FiChevronRight, FiUser,
} from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProductCard from '../components/ui/ProductCard'
import { useWishlist } from '../context/WishlistContext'

const sidebarLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { id: 'orders', label: 'My Orders', icon: FiPackage },
  { id: 'appointments', label: 'Appointments', icon: FiCalendar },
  { id: 'prescriptions', label: 'Prescriptions', icon: FiFileText },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'reports', label: 'Lab Reports', icon: FiActivity },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

const recentOrders = [
  { id: 'MC78293451', date: '2024-06-18', items: 3, total: 1247, status: 'Delivered' },
  { id: 'MC78291823', date: '2024-06-12', items: 1, total: 549, status: 'Delivered' },
  { id: 'MC78289001', date: '2024-06-05', items: 2, total: 899, status: 'In Transit' },
]

const upcomingAppointments = [
  { doctor: 'Dr. Sarah Mitchell', dept: 'Cardiology', date: '2024-06-25', time: '10:00 AM' },
  { doctor: 'Dr. Rajesh Kumar', dept: 'General Medicine', date: '2024-07-02', time: '02:30 PM' },
]

const labReports = [
  { name: 'Complete Blood Count', date: '2024-06-10', status: 'Ready' },
  { name: 'Thyroid Profile', date: '2024-05-28', status: 'Ready' },
]

const notifications = [
  { text: 'Your order #MC78289001 is out for delivery', time: '2 hours ago' },
  { text: 'Lab report for CBC is ready to download', time: '1 day ago' },
  { text: 'Appointment reminder: Dr. Mitchell on June 25', time: '2 days ago' },
]

const statusColors = {
  Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { wishlist } = useWishlist()

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            {recentOrders.map((order) => (
              <div key={order.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-slate-500">{order.date} · {order.items} items</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary-600">₹{order.total}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )
      case 'appointments':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Appointments</h2>
              <Link to="/appointment" className="btn-primary text-sm">Book New</Link>
            </div>
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="glass-card p-5">
                <h3 className="font-semibold">{apt.doctor}</h3>
                <p className="text-sm text-primary-600">{apt.dept}</p>
                <p className="text-sm text-slate-500 mt-2">{apt.date} at {apt.time}</p>
              </div>
            ))}
          </div>
        )
      case 'wishlist':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">My Wishlist ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-slate-500">No items in wishlist</p>
                <Link to="/pharmacy" className="btn-primary mt-4 inline-flex">Browse Products</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Lab Reports</h2>
            {labReports.map((report, i) => (
              <div key={i} className="glass-card p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-slate-500">{report.date}</p>
                </div>
                <button className="btn-outline text-sm">Download</button>
              </div>
            ))}
          </div>
        )
      case 'settings':
        return (
          <div className="glass-card p-6 max-w-lg">
            <h2 className="text-xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Full Name</label>
                <input className="input-field" defaultValue="John Doe" />
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Email</label>
                <input className="input-field" defaultValue="john@example.com" />
              </div>
              <div>
                <label className="text-sm text-slate-500 mb-1 block">Phone</label>
                <input className="input-field" defaultValue="9876543210" />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: '12', icon: FiPackage, color: 'from-blue-500 to-cyan-500' },
                { label: 'Appointments', value: '3', icon: FiCalendar, color: 'from-green-500 to-emerald-500' },
                { label: 'Lab Reports', value: '5', icon: FiActivity, color: 'from-purple-500 to-pink-500' },
                { label: 'Wishlist', value: wishlist.length, icon: FiHeart, color: 'from-red-500 to-orange-500' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Orders</h2>
                <button onClick={() => setActiveTab('orders')} className="text-primary-600 text-sm font-medium flex items-center gap-1">View All <FiChevronRight /></button>
              </div>
              <div className="space-y-3">
                {recentOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="glass-card p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-slate-500">{order.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Upcoming Appointments</h2>
                <button onClick={() => setActiveTab('appointments')} className="text-primary-600 text-sm font-medium flex items-center gap-1">View All <FiChevronRight /></button>
              </div>
              {upcomingAppointments.slice(0, 1).map((apt, i) => (
                <div key={i} className="glass-card p-4">
                  <h3 className="font-medium">{apt.doctor}</h3>
                  <p className="text-sm text-slate-500">{apt.date} at {apt.time}</p>
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FiBell className="text-primary-600" /> Notifications</h2>
              <div className="space-y-2">
                {notifications.map((n, i) => (
                  <div key={i} className="glass-card p-4 flex justify-between items-start">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{n.text}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <FiUser className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, John Doe</h1>
              <p className="text-white/70 text-sm">Manage your health journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="glass-card p-4 lg:sticky lg:top-24">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === link.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <ScrollReveal key={activeTab}>{renderContent()}</ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
