import { useId } from 'react'

// options = [{ value, label }]
export default function Select({ label, error, options, className = '', ...props }) {
  const id = useId()

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        id={id}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
          error ? 'border-rose-400' : 'border-slate-200'
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1.5 text-sm font-medium text-rose-600">{error}</p>}
    </div>
  )
}