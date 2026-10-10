import { Landmark, MapPin, Phone, User } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import InfoCard from '../components/common/InfoCard'
import MapLink from '../components/places/MapLink'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { phoneHref } from '../utils/helpers'

export default function Mosques() {
  const { t } = useLanguage()
  const page = t.mosques
  const { data, loading, error, reload } = useFetch('/mosques/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="🕌"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((mosque) => (
                <InfoCard
                  key={mosque.id}
                  icon={Landmark}
                  tint="bg-emerald-50 text-emerald-700"
                  title={mosque.name}
                  description={mosque.description}
                  details={[
                    mosque.address && { icon: MapPin, text: mosque.address },
                    mosque.imam_name && {
                      icon: User,
                      text: `${page.imam}: ${mosque.imam_name}`,
                    },
                    mosque.contact_phone && {
                      icon: Phone,
                      text: mosque.contact_phone,
                      href: phoneHref(mosque.contact_phone),
                    },
                  ].filter(Boolean)}
                >
                  <MapLink item={mosque} />
                </InfoCard>
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}