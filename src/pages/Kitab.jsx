import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import BayanTabs from '../components/bayan/BayanTabs'
import KitabCard from '../components/bayan/KitabCard'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'

export default function Kitab() {
  const { t } = useLanguage()
  const page = t.kitab
  const { data, loading, error, reload } = useFetch('/kitabs/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <BayanTabs />
          </div>

          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="📖"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((kitab) => (
                <KitabCard key={kitab.id} kitab={kitab} />
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}