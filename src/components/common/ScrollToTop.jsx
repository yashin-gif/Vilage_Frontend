import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// পেজ বদলালে উপরে স্ক্রল করে দেয়
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}