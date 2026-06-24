import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Pharmacy from './pages/Pharmacy'
import ProductDetails from './pages/ProductDetails'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import LabTests from './pages/LabTests'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import PrescriptionUpload from './pages/PrescriptionUpload'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prescription" element={<PrescriptionUpload />} />
      </Routes>
    </Layout>
  )
}
