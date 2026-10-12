import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import Button from '../components/common/Button'
import DataState from '../components/common/DataState'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'

const FONT_SIZES = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

function Reader({ id }) {
  const { t } = useLanguage()
  const text = t.kitab
  const { data, loading, error, reload } = useFetch(`/kitabs/${id}`)

  const [chapterIndex, setChapterIndex] = useState(0)
  const [fontStep, setFontStep] = useState(1)

  const chapters = useMemo(
    () => [...(data?.chapters ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
    [data],
  )
  const chapter = chapters[chapterIndex]

  const goTo = (index) => {
    setChapterIndex(index)
    window.scrollTo?.({ top: 0 })
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/kitab"
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
            emptyIcon="📖"
            emptyTitle={text.emptyTitle}
            emptyText={text.emptyText}
            onRetry={reload}
          >
            {data && (
              <article>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {data.title}
                </h1>
                {data.author && (
                  <p className="mt-2 font-semibold text-slate-600">
                    {text.author}: {data.author}
                  </p>
                )}

                {chapters.length === 0 ? (
                  <p className="mt-10 text-center text-slate-600">{text.noChapters}</p>
                ) : (
                  <>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <select
                        value={chapterIndex}
                        onChange={(event) => goTo(Number(event.target.value))}
                        aria-label={text.chapters}
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                      >
                        {chapters.map((item, index) => (
                          <option key={item.id} value={index}>
                            {item.title}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          aria-label={text.fontSmaller}
                          disabled={fontStep === 0}
                          onClick={() => setFontStep((step) => step - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          aria-label={text.fontLarger}
                          disabled={fontStep === FONT_SIZES.length - 1}
                          onClick={() => setFontStep((step) => step + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-slate-900">{chapter.title}</h2>
                    <div
                      dir="auto"
                      className={`mt-4 whitespace-pre-line leading-10 text-slate-800 ${FONT_SIZES[fontStep]}`}
                    >
                      {chapter.content}
                    </div>

                    <div className="mt-10 flex justify-between gap-3 border-t border-slate-100 pt-6">
                      <Button
                        variant="outline"
                        disabled={chapterIndex === 0}
                        onClick={() => goTo(chapterIndex - 1)}
                      >
                        <ChevronLeft size={16} />
                        {text.prev}
                      </Button>
                      <Button
                        variant="outline"
                        disabled={chapterIndex === chapters.length - 1}
                        onClick={() => goTo(chapterIndex + 1)}
                      >
                        {text.next}
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </article>
            )}
          </DataState>
        </div>
      </div>
    </section>
  )
}

// এক কিতাব থেকে আরেক কিতাবে গেলে অধ্যায় ও লেখার আকার নতুন করে শুরু হয়
export default function KitabReader() {
  const { id } = useParams()

  return <Reader key={id} id={id} />
}