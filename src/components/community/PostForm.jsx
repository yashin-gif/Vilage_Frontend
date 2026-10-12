import { useState } from 'react'
import Alert from '../common/Alert'
import Button from '../common/Button'
import Input from '../common/Input'
import Textarea from '../common/Textarea'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/helpers'

export default function PostForm({ onCreated }) {
  const { t } = useLanguage()
  const text = t.community

  const [form, setForm] = useState({ title: '', content: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = form.title.trim()
    const content = form.content.trim()
    const nextErrors = {}

    if (!title) nextErrors.title = text.titleRequired
    else if (title.length > 200) nextErrors.title = text.titleTooLong
    if (!content) nextErrors.content = text.contentRequired

    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    try {
      const post = await api.post('/community/posts', { title, content })
      setForm({ title: '', content: '' })
      onCreated(post)
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
      <h2 className="text-lg font-bold text-slate-900">{text.newPost}</h2>

      {submitError && <Alert>{submitError}</Alert>}

      <Input
        label={text.titleLabel}
        name="title"
        placeholder={text.titlePlaceholder}
        value={form.title}
        onChange={handleChange}
        error={errors.title}
      />

      <Textarea
        label={text.contentLabel}
        name="content"
        placeholder={text.contentPlaceholder}
        value={form.content}
        onChange={handleChange}
        error={errors.content}
      />

      <Button type="submit" disabled={submitting}>
        {submitting ? text.publishing : text.publish}
      </Button>
    </form>
  )
}