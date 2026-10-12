import { Link } from 'react-router-dom'

// ড্যাশবোর্ডের একটা সংখ্যার কার্ড — চাপলে সংশ্লিষ্ট তালিকায় যায়
export default function StatCard({ label, value, to, Icon, tint }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>
        <Icon size={24} />
      </span>
      <span className="min-w-0">
        <span className="block text-2xl font-bold text-slate-900">{value}</span>
        <span className="block text-sm font-semibold text-slate-600">{label}</span>
      </span>
    </Link>
  )
}