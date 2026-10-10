import { useMemo, useState } from 'react'
import FamilyCard from './FamilyCard'
import SearchInput from '../common/SearchInput'
import useLanguage from '../../hooks/useLanguage'
import { matchesSearch } from '../../utils/helpers'

export default function FamilyList({ families, people }) {
  const { t } = useLanguage()
  const text = t.families
  const [query, setQuery] = useState('')

  // পরিবার অনুযায়ী সদস্যদের সাজিয়ে রাখে
  const membersByFamily = useMemo(() => {
    const map = new Map()

    people.forEach((person) => {
      const list = map.get(person.family_id) ?? []
      list.push(person)
      map.set(person.family_id, list)
    })

    return map
  }, [people])

  const filtered = useMemo(
    () =>
      families.filter((family) =>
        matchesSearch(
          [
            family.head_name,
            family.family_code,
            family.village,
            family.address,
            family.phone,
          ],
          query,
        ),
      ),
    [families, query],
  )

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={text.searchPlaceholder}
      />

      <p className="mt-4 text-sm font-medium text-slate-500">
        {filtered.length} {text.found}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">{text.noMatch}</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((family) => (
            <FamilyCard
              key={family.id}
              family={family}
              members={membersByFamily.get(family.id) ?? []}
            />
          ))}
        </div>
      )}
    </div>
  )
}