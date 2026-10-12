import { useState } from 'react'
import Alert from '../common/Alert'
import Button from '../common/Button'
import Input from '../common/Input'
import Select from '../common/Select'
import Textarea from '../common/Textarea'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/helpers'

const TYPE_KEYS = ['food', 'medical', 'education', 'housing', 'other']
const EMPTY_FORM = { request_type: 'food', title: '', description: '' }

export default function HelpRequestForm({ onCreated }) {
  const { t } = useLanguage()
  const text = t.welfare

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSuccess(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = form.title.trim()
    const description = form.description.trim()
    const nextErrors = {}

    if (!title) nextErrors.title = text.titleRequired
    else if (title.length > 200) nextErrors.title = text.titleTooLong
    if (!description) nextErrors.description = text.descriptionRequired

    setErrors(nextErrors)
    setSubmitError('')
    setSuccess(false)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    try {
      await api.post('/help-requests/', {
        request_type: form.request_type,
        title,
        description,
      })
      setForm(EMPTY_FORM)
      setSuccess(true)
      onCreated()
    } catch (error) {
      setSubmitError(getErrorMessage(error, t))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-lg font-bold text-slate-900">{text.formTitle}</h2>

      {success && <Alert type="success">{text.success}</Alert>}
      {submitError && <Alert>{submitError}</Alert>}

      <Select
        label={text.typeLabel}
        name="request_type"
        value={form.request_type}
        onChange={handleChange}
        options={TYPE_KEYS.map((key) => ({ value: key, label: text.types[key] }))}
      />

      <Input
        label={text.titleLabel}
        name="title"
        placeholder={text.titlePlaceholder}
        value={form.title}
        onChange={handleChange}
        error={errors.title}
      />

      <Textarea
        label={text.descriptionLabel}
        name="description"
        placeholder={text.descriptionPlaceholder}
        value={form.description}
        onChange={handleChange}
        error={errors.description}
      />

      <Button type="submit" disabled={submitting}>
        {submitting ? text.submitting : text.submit}
      </Button>
    </form>
  )
}