import { useId } from 'react'

export default function Textarea({ label, error, rows = 4, className = '', ...props }) {
  const id = useId()

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
          error ? 'border-rose-400' : 'border-slate-200'
        }`}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}