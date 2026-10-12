import DataState from '../common/DataState'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'

const STATUS_STYLE = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-rose-50 text-rose-700',
  completed: 'bg-sky-50 text-sky-700',
}

// নিজের করা আবেদনগুলোর তালিকা ও অবস্থা
export default function MyHelpRequests({ requests, loading, error, onRetry }) {
  const { t, language } = useLanguage()
  const text = t.welfare

  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900">{text.mineTitle}</h2>

      <div className="mt-4">
        <DataState
          loading={loading}
          error={error}
          isEmpty={requests.length === 0}
          emptyIcon="🤝"
          emptyTitle={text.mineEmpty}
          onRetry={onRetry}
        >
          <ul className="space-y-3">
            {requests.map((request) => (
              <li
                key={request.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {text.types[request.request_type] ?? request.request_type}
                    {' · '}
                    {formatDate(request.created_at, language)}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      STATUS_STYLE[request.status] ?? 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {text.status[request.status] ?? request.status}
                  </span>
                </div>
                <h3 className="mt-2 font-bold text-slate-900">{request.title}</h3>
                <p className="mt-1 whitespace-pre-line leading-7 text-slate-600">
                  {request.description}
                </p>
              </li>
            ))}
          </ul>
        </DataState>
      </div>
    </section>
  )
}