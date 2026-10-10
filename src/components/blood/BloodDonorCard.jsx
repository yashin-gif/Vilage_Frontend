import { CalendarDays, Droplets, HeartPulse, MapPin, Phone } from 'lucide-react'
import InfoCard from '../common/InfoCard'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'
import { getFullName, phoneHref } from '../../utils/helpers'

// donor = রক্তদাতার রেকর্ড, person = সেই মানুষের তথ্য (নাম, ফোন, এলাকা)
export default function BloodDonorCard({ donor, person }) {
  const { t, language } = useLanguage()
  const text = t.blood
  const phone = person?.phone

  const details = [
    {
      icon: HeartPulse,
      text: donor.is_available ? text.available : text.unavailable,
    },
    donor.last_donation_date && {
      icon: CalendarDays,
      text: `${text.lastDonation}: ${formatDate(donor.last_donation_date, language)}`,
    },
    person?.current_location && { icon: MapPin, text: person.current_location },
    phone && { icon: Phone, text: phone },
  ].filter(Boolean)

  return (
    <InfoCard
      icon={Droplets}
      tint="bg-rose-50 text-rose-700"
      title={person ? getFullName(person) : text.unknownDonor}
      badge={donor.blood_group}
      description={donor.notes}
      details={details}
    >
      {phone && (
        <a
          href={phoneHref(phone)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
        >
          <Phone size={16} />
          {text.call}
        </a>
      )}
    </InfoCard>
  )
}