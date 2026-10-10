import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import BloodDonorCard from '../components/blood/BloodDonorCard'
import BloodSearch from '../components/blood/BloodSearch'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { BLOOD_GROUPS } from '../utils/constants'

export default function BloodDonors() {
  const { t } = useLanguage()
  const page = t.blood
  const [searchParams, setSearchParams] = useSearchParams()
  const [availableOnly, setAvailableOnly] = useState(false)

  // হোম পেজ থেকে ?group=A%2B দিয়ে এলে সেই গ্রুপ আগে থেকেই বাছাই থাকে
  const rawGroup = searchParams.get('group') ?? ''
  const group = BLOOD_GROUPS.includes(rawGroup) ? rawGroup : ''

  const donorsRequest = useFetch('/blood/', { auth: true })
  const peopleRequest = useFetch('/people/', { auth: true })

  const loading = donorsRequest.loading || peopleRequest.loading
  const error = donorsRequest.error || peopleRequest.error
  const allDonors = donorsRequest.data ?? []

  const donors = useMemo(() => {
    const personById = new Map((peopleRequest.data ?? []).map((person) => [person.id, person]))

    return (donorsRequest.data ?? [])
      .map((donor) => ({ donor, person: personById.get(donor.person_id) }))
      .filter(
        ({ donor }) =>
          (!group || donor.blood_group === group) &&
          (!availableOnly || donor.is_available),
      )
      // যারা এখন প্রস্তুত তারা আগে
      .sort((a, b) => Number(b.donor.is_available) - Number(a.donor.is_available))
  }, [donorsRequest.data, peopleRequest.data, group, availableOnly])

  const handleGroupChange = (next) => {
    const params = new URLSearchParams(searchParams)

    if (next) params.set('group', next)
    else params.delete('group')

    setSearchParams(params, { replace: true })
  }

  const reload = () => {
    donorsRequest.reload()
    peopleRequest.reload()
  }

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DataState
            loading={loading}
            error={error}
            isEmpty={allDonors.length === 0}
            emptyIcon="🩸"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <BloodSearch
              group={group}
              onGroupChange={handleGroupChange}
              availableOnly={availableOnly}
              onAvailableChange={setAvailableOnly}
            />

            <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
              {page.note}
            </p>

            <p className="mt-6 text-sm font-medium text-slate-500">
              {donors.length} {page.found}
            </p>

            {donors.length === 0 ? (
              <p className="mt-10 text-center text-slate-600">{page.noMatch}</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {donors.map(({ donor, person }) => (
                  <BloodDonorCard key={donor.id} donor={donor} person={person} />
                ))}
              </div>
            )}
          </DataState>
        </div>
      </section>
    </>
  )
}