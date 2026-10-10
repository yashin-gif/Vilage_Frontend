import { Briefcase, House, MapPin, Phone, UserRound } from 'lucide-react'
import InfoCard from '../common/InfoCard'
import useLanguage from '../../hooks/useLanguage'
import { getFullName, phoneHref } from '../../utils/helpers'

// এখানে ইচ্ছে করেই বিধবা/প্রতিবন্ধী/সাহায্যপ্রার্থী চিহ্ন দেখানো হয় না —
// ওগুলো শুধু অ্যাডমিনের পেজে থাকবে
export default function PersonCard({ person, family }) {
  const { t } = useLanguage()
  const text = t.people

  const details = [
    family && { icon: House, text: `${text.family}: ${family.head_name}` },
    person.occupation && { icon: Briefcase, text: person.occupation },
    person.current_location && { icon: MapPin, text: person.current_location },
    person.phone && {
      icon: Phone,
      text: person.phone,
      href: phoneHref(person.phone),
    },
  ].filter(Boolean)

  return (
    <InfoCard
      icon={UserRound}
      tint="bg-sky-50 text-sky-700"
      title={getFullName(person)}
      badge={person.blood_group ? `${text.blood}: ${person.blood_group}` : undefined}
      details={details}
    />
  )
}