import { CalendarDays, Landmark, Mic, User } from 'lucide-react'
import Button from '../common/Button'
import InfoCard from '../common/InfoCard'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'
import { truncate } from '../../utils/helpers'

export default function BayanCard({ bayan }) {
  const { t, language } = useLanguage()
  const text = t.bayan

  const media = [bayan.audio_url && text.audio, bayan.video_url && text.video]
    .filter(Boolean)
    .join(' · ')

  const details = [
    bayan.speaker && { icon: User, text: `${text.speaker}: ${bayan.speaker}` },
    bayan.mosque_name && { icon: Landmark, text: bayan.mosque_name },
    bayan.bayan_date && { icon: CalendarDays, text: formatDate(bayan.bayan_date, language) },
  ].filter(Boolean)

  return (
    <InfoCard
      icon={Mic}
      tint="bg-emerald-50 text-emerald-700"
      title={bayan.title}
      badge={media || undefined}
      description={truncate(bayan.summary, 140)}
      details={details}
    >
      <Button to={`/bayan/${bayan.id}`} variant="outline" className="w-full">
        {text.open}
      </Button>
    </InfoCard>
  )
}