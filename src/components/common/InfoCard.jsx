// মসজিদ, প্রতিষ্ঠান, স্থান — তিন জায়গাতেই এই একটা কার্ড চলে
export default function InfoCard({
  icon: Icon,
  tint = 'bg-brand-50 text-brand-600',
  title,
  badge,
  description,
  details = [],
  children,
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}
        >
          <Icon size={24} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {badge && (
            <span className="mt-1 inline-block rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-600">
              {badge}
            </span>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
      )}

      {details.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {details.map(({ icon: DetailIcon, text, href }, index) => (
            <li key={index} className="flex items-start gap-2">
              <DetailIcon size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {href ? (
                <a href={href} className="font-semibold text-brand-700 hover:underline">
                  {text}
                </a>
              ) : (
                <span>{text}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {children && <div className="mt-5">{children}</div>}
    </article>
  )
}