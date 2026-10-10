import { CalendarDays, Mail, Phone, ShieldCheck, User, UserCheck } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'

export default function Profile() {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const page = t.profile

  const rows = [
    { key: 'username', Icon: User, value: user.username },
    { key: 'email', Icon: Mail, value: user.email },
    { key: 'phone', Icon: Phone, value: user.phone },
    { key: 'role', Icon: ShieldCheck, value: t.dashboard.roles[user.role] ?? user.role },
    { key: 'status', Icon: UserCheck, value: user.is_active ? page.active : page.inactive },
    { key: 'joined', Icon: CalendarDays, value: formatDate(user.created_at, language) },
  ]

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} />

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <dl className="divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            {rows.map(({ key, Icon, value }) => (
              <div key={key} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold text-slate-500">{page[key]}</dt>
                  <dd className="mt-0.5 break-words font-semibold text-slate-900">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-center text-sm text-slate-500">{page.note}</p>
        </div>
      </section>
    </>
  )
}