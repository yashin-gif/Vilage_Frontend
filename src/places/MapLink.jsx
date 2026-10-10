import { ExternalLink, MapPin } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'
import { getMapQuery, mapSearchUrl } from '../../utils/helpers'

// কোঅর্ডিনেট বা ঠিকানা থাকলে "ম্যাপে দেখুন" লিংক দেখায়
export default function MapLink({ item }) {
  const { t } = useLanguage()
  const query = getMapQuery(item)

  if (!query) return null

  return (
    <a
      href={mapSearchUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
    >
      <MapPin size={16} />
      {t.ui.openOnMap}
      <ExternalLink size={14} />
    </a>
  )
}