import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import PersonList from '../components/people/PersonList'
import useDirectory from '../hooks/useDirectory'
import useLanguage from '../hooks/useLanguage'

export default function People() {
  const { t } = useLanguage()
  const page = t.people
  const { people, familyById, loading, error, reload } = useDirectory()

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DataState
            loading={loading}
            error={error}
            isEmpty={people.length === 0}
            emptyIcon="👥"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <PersonList people={people} familyById={familyById} />
          </DataState>
        </div>
      </section>
    </>
  )
}