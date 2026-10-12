import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Landmark, User } from 'lucide-react'
import DataState from '../components/common/DataState'
import MediaPlayer from '../components/bayan/MediaPlayer'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { formatDate } from '../utils/formatDate'

export default function BayanDetail() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const text = t.bayan
  const { data, loading, error, reload } = useFetch(`/bayans/${id}`)

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/bayan"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline"
        >
          <ArrowLeft size={16} />
          {text.back}
        </Link>

        <div className="mt-6">
          <DataState
            loading={loading}
            error={error}
            isEmpty={!data}
            emptyIcon="🎙️"
            emptyTitle={text.emptyTitle}
            emptyText={text.emptyText}
            onRetry={reload}
          >
            {data && (
              <article>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {data.title}
                </h1>

                <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
                  {data.speaker && (
                    <span className="inline-flex items-center gap-1.5">
                      <User size={16} />
                      {data.speaker}
                    </span>
                  )}
                  {data.mosque_name && (
                    <span className="inline-flex items-center gap-1.5">
                      <Landmark size={16} />
                      {data.mosque_name}
                    </span>
                  )}
                  {data.bayan_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={16} />
                      {formatDate(data.bayan_date, language)}
                    </span>
                  )}
                </p>

                <div className="mt-6">
                  <MediaPlayer
                    audioUrl={data.audio_url}
                    videoUrl={data.video_url}
                    title={data.title}
                  />
                </div>

                {data.summary && (
                  <p className="mt-6 text-lg leading-9 text-slate-700">{data.summary}</p>
                )}

                {data.content && (
                  <div
                    dir="auto"
                    className="mt-6 whitespace-pre-line text-lg leading-10 text-slate-800"
                  >
                    {data.content}
                  </div>
                )}
              </article>
            )}
          </DataState>
        </div>
      </div>
    </section>
  )
}