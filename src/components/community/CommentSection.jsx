import { useState } from 'react'
import Alert from '../common/Alert'
import Button from '../common/Button'
import useFetch from '../../hooks/useFetch'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { formatDate } from '../../utils/formatDate'
import { getErrorMessage } from '../../utils/helpers'

// একটা পোস্টের মন্তব্য — "মন্তব্য" বাটন চাপলে তবেই এটা খোলে ও তথ্য আনে
export default function CommentSection({ postId }) {
  const { t, language } = useLanguage()
  const text = t.community
  const { data, loading, error, reload } = useFetch(`/community/comments/${postId}`, {
    auth: true,
  })

  const [content, setContent] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const comments = data ?? []

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmed = content.trim()
    if (!trimmed) return

    setSubmitting(true)
    setSubmitError('')

    try {
      await api.post('/community/comments', { post_id: postId, content: trimmed })
      setContent('')
      reload()
    } catch (err) {
      setSubmitError(getErrorMessage(err, t))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      {loading && <p className="text-sm text-slate-500">{t.ui.loading}</p>}

      {error && <Alert>{getErrorMessage(error, t)}</Alert>}

      {!loading && !error && comments.length === 0 && (
        <p className="text-sm text-slate-500">{text.noComments}</p>
      )}

      {comments.length > 0 && (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="flex flex-wrap items-center gap-x-2 text-sm">
                <span className="font-bold text-slate-800">
                  {comment.author_name || text.member}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDate(comment.created_at, language)}
                </span>
              </p>
              <p className="mt-1 whitespace-pre-line leading-7 text-slate-700">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {submitError && (
        <div className="mt-3">
          <Alert>{submitError}</Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          aria-label={text.commentLabel}
          placeholder={text.commentPlaceholder}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
        <Button type="submit" disabled={submitting || !content.trim()}>
          {text.sendComment}
        </Button>
      </form>
    </div>
  )
}