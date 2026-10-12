import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'

const ROLES = ['admin', 'moderator', 'user']

// ইউজারের ভূমিকা বদলানোর বাছাই-বাক্স (নিজের ভূমিকা বদলানো যায় না)
export function RoleSelect({ row, ctx }) {
  const { t } = useLanguage()

  const handleChange = async (event) => {
    try {
      await api.patch(`/admin/users/${row.id}/role?role=${event.target.value}`)
      ctx.reload()
    } catch (error) {
      ctx.reportError(error)
    }
  }

  return (
    <select
      value={row.role}
      onChange={handleChange}
      disabled={row.id === ctx.currentUser.id}
      aria-label={`${t.admin.fields.role}: ${row.username}`}
      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 outline-none focus:border-brand-600 disabled:cursor-not-allowed disabled:bg-slate-50"
    >
      {ROLES.map((role) => (
        <option key={role} value={role}>
          {t.options.role[role]}
        </option>
      ))}
    </select>
  )
}

// অ্যাকাউন্ট চালু/বন্ধ করার বাটন (নিজের অ্যাকাউন্ট বন্ধ করা যায় না)
export function StatusToggle({ row, ctx }) {
  const { t } = useLanguage()
  const text = t.admin.users

  const handleClick = async () => {
    try {
      await api.patch(`/admin/users/${row.id}/status?is_active=${!row.is_active}`)
      ctx.reload()
    } catch (error) {
      ctx.reportError(error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={row.id === ctx.currentUser.id}
      aria-label={`${row.is_active ? text.deactivate : text.activate}: ${row.username}`}
      className={`rounded-full px-3 py-1 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
        row.is_active
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {row.is_active ? text.active : text.inactive}
    </button>
  )
}