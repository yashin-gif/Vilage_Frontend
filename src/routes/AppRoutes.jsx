import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Biography from '../pages/Biography'
import About from '../pages/About'
import News from '../pages/News'
import Announcements from '../pages/Announcements'
import NewsDetail from '../pages/NewsDetail'
import Mosques from '../pages/Mosques'
import Institutions from '../pages/Institutions'
import Places from '../pages/Places'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import People from '../pages/People'
import Families from '../pages/Families'
import BloodDonors from '../pages/BloodDonors'
import Dashboard from '../pages/dashboard/Dashboard'
import Profile from '../pages/dashboard/Profile'
import ComingSoon from '../pages/ComingSoon'
import NotFound from '../pages/NotFound'

// এখনো যে পেজগুলো বানানো হয়নি — একটা একটা করে আসল পেজ দিয়ে বদলে দেব
const PLACEHOLDER_PATHS = [
  '/bayan',
  '/community',
  '/welfare',
]

export default function AppRoutes() {
  return (
    <Routes>
      {/* সবার জন্য খোলা */}
      <Route path="/" element={<Home />} />
      <Route path="/biography" element={<Biography />} />
      <Route path="/about" element={<About />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/mosques" element={<Mosques />} />
      <Route path="/institutions" element={<Institutions />} />
      <Route path="/places" element={<Places />} />

      {/* লগইন সম্পর্কিত */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* শুধু লগইন করা সদস্যদের জন্য */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/people" element={<People />} />
        <Route path="/families" element={<Families />} />
        <Route path="/blood-donors" element={<BloodDonors />} />
      </Route>

      {PLACEHOLDER_PATHS.map((path) => (
        <Route key={path} path={path} element={<ComingSoon />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}