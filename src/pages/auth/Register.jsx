import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Lock, Mail, Phone, User } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import AuthLayout from '../../components/auth/AuthLayout'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { getErrorMessage } from '../../utils/helpers'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ব্যাকএন্ডের নিয়মের সাথে মিলিয়ে: ইউজারনেম ৩–৫০, ফোন ৬–২০, পাসওয়ার্ড ৬–১০০
function validate(form, v) {
  const errors = {}
  const username = form.username.trim()
  const phone = form.phone.trim()

  if (username.length < 3 || username.length > 50) errors.username = v.usernameLength
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = v.emailInvalid
  if (phone.length < 6 || phone.length > 20) errors.phone = v.phoneLength
  if (form.password.length < 6 || form.password.length > 100) {
    errors.password = v.passwordLength
  }
  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = v.passwordMismatch
  }

  return errors
}

export default function Register() {
  const { t } = useLanguage()
  const { register, user, loading } = useAuth()
  const navigate = useNavigate()
  const text = t.auth.register

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(form, t.auth.validation)
    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setSubmitError(getErrorMessage(error, t))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      badge={text.badge}
      title={text.title}
      subtitle={text.subtitle}
      footer={
        <>
          {text.haveAccount}{' '}
          <Link to="/login" className="font-bold text-brand-700 hover:underline">
            {text.login}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {submitError && <Alert>{submitError}</Alert>}

        <Input
          label={text.username}
          name="username"
          icon={User}
          autoComplete="username"
          placeholder={text.usernamePlaceholder}
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label={text.email}
          name="email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder={text.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label={text.phone}
          name="phone"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          inputMode="tel"
          placeholder={text.phonePlaceholder}
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label={text.password}
          name="password"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          placeholder={text.passwordPlaceholder}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          label={text.confirmPassword}
          name="confirmPassword"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? text.submitting : text.submit}
        </Button>
      </form>
    </AuthLayout>
  )
}