import { useState } from 'react'
import { CalendarDays, KeyRound, Mail, Phone, ShieldCheck, User, UserCheck } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'
import { getErrorMessage } from '../../utils/helpers'

const EMPTY_PASSWORD = { current: '', next: '', confirm: '' }

export default function Profile() {
  const { t, language } = useLanguage()
  const { user, updateProfile, changePassword } = useAuth()
  const page = t.profile
  const text = t.account

  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
  })
  const [profileError, setProfileError] = useState('')
  const [profileOk, setProfileOk] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  const [password, setPassword] = useState(EMPTY_PASSWORD)
  const [passwordError, setPasswordError] = useState('')
  const [passwordOk, setPasswordOk] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  const rows = [
    { key: 'username', Icon: User, value: user.username },
    { key: 'email', Icon: Mail, value: user.email },
    { key: 'phone', Icon: Phone, value: user.phone },
    { key: 'role', Icon: ShieldCheck, value: t.dashboard.roles[user.role] ?? user.role },
    { key: 'status', Icon: UserCheck, value: user.is_active ? page.active : page.inactive },
    { key: 'joined', Icon: CalendarDays, value: formatDate(user.created_at, language) },
  ]

  const handleProfileSave = async (event) => {
    event.preventDefault()
    setSavingProfile(true)
    setProfileError('')
    setProfileOk('')

    try {
      await updateProfile({
        username: profile.username.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
      })
      setProfileOk(text.profileSaved)
    } catch (err) {
      setProfileError(getErrorMessage(err, t))
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordSave = async (event) => {
    event.preventDefault()
    setPasswordError('')
    setPasswordOk('')

    if (password.next.length < 6) return setPasswordError(text.passwordShort)
    if (password.next !== password.confirm) return setPasswordError(text.passwordMismatch)

    setSavingPassword(true)

    try {
      await changePassword(password.current, password.next)
      setPassword(EMPTY_PASSWORD)
      setPasswordOk(text.passwordSaved)
    } catch (err) {
      setPasswordError(getErrorMessage(err, t))
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} />

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">{text.info}</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {rows.map(({ key, Icon, value }) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon size={18} />
                  </span>
                  <div>
                    <dt className="text-sm text-slate-500">{page[key]}</dt>
                    <dd className="font-semibold text-slate-900">{value || '—'}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">{text.editProfile}</h2>
            {profileOk && <Alert type="success">{profileOk}</Alert>}
            {profileError && <Alert>{profileError}</Alert>}

            <Input
              label={page.username}
              icon={User}
              value={profile.username}
              onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))}
            />
            <Input
              label={page.email}
              type="email"
              icon={Mail}
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
            <Input
              label={page.phone}
              type="tel"
              icon={Phone}
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={savingProfile}>
                {savingProfile ? text.saving : text.save}
              </Button>
            </div>
          </form>

          <form onSubmit={handlePasswordSave} className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <KeyRound size={18} className="text-brand-700" />
              {text.changePassword}
            </h2>
            <p className="text-sm leading-6 text-slate-600">{text.passwordNote}</p>
            {passwordOk && <Alert type="success">{passwordOk}</Alert>}
            {passwordError && <Alert>{passwordError}</Alert>}

            <Input
              label={text.currentPassword}
              type="password"
              value={password.current}
              onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))}
            />
            <Input
              label={text.newPassword}
              type="password"
              value={password.next}
              onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))}
            />
            <Input
              label={text.confirmPassword}
              type="password"
              value={password.confirm}
              onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={savingPassword || !password.current || !password.next}>
                {savingPassword ? text.saving : text.changePassword}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}