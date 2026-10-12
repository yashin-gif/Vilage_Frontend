import { NavLink } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'

const tabClass = ({ isActive }) =>
  `rounded-xl px-5 py-2.5 text-sm font-bold transition ${
    isActive
      ? 'bg-brand-600 text-white shadow-sm'
      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-700'
  }`

// "বয়ান" ও "কিতাব" — দুই পেজের মাঝে যাওয়ার ট্যাব
export default function BayanTabs() {
  const { t } = useLanguage()

  return (
    <nav aria-label={t.bayan.title} className="flex justify-center gap-3">
      <NavLink to="/bayan" end className={tabClass}>
        {t.bayan.tabBayan}
      </NavLink>
      <NavLink to="/kitab" className={tabClass}>
        {t.bayan.tabKitab}
      </NavLink>
    </nav>
  )
}