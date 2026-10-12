import { BookOpen, User } from 'lucide-react'
import Button from '../common/Button'
import InfoCard from '../common/InfoCard'
import useLanguage from '../../hooks/useLanguage'
import { truncate } from '../../utils/helpers'

export default function KitabCard({ kitab }) {
  const { t } = useLanguage()
  const text = t.kitab

  return (
    <InfoCard
      icon={BookOpen}
      tint="bg-violet-50 text-violet-700"
      title={kitab.title}
      description={truncate(kitab.description, 140)}
      details={kitab.author ? [{ icon: User, text: `${text.author}: ${kitab.author}` }] : []}
    >
      <Button to={`/kitab/${kitab.id}`} variant="outline" className="w-full">
        {text.read}
      </Button>
    </InfoCard>
  )
}