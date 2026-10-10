import { useMemo, useState } from 'react'
import PersonCard from './PersonCard'
import SearchInput from '../common/SearchInput'
import useLanguage from '../../hooks/useLanguage'
import { BLOOD_GROUPS } from '../../utils/constants'
import { getFullName, matchesSearch } from '../../utils/helpers'

export default function PersonList({ people, familyById }) {
  const { t } = useLanguage()
  const text = t.people
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('')

  const filtered = useMemo(
    () =>
      people.filter((person) => {
        if (group && person.blood_group !== group) return false

        const family = familyById.get(person.family_id)

        return matchesSearch(
          [
            getFullName(person),
            person.phone,
            person.occupation,
            person.current_location,
            family?.head_name,
          ],
          query,
        )
      }),
    [people, familyById, query, group],
  )

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={text.searchPlaceholder}
        />

        <select
          value={group}
          onChange={(event) => setGroup(event.target.value)}
          aria-label={text.bloodFilter}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          <option value="">{text.allGroups}</option>
          {BLOOD_GROUPS.map((bloodGroup) => (
            <option key={bloodGroup} value={bloodGroup}>
              {bloodGroup}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {filtered.length} {text.found}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">{text.noMatch}</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              family={familyById.get(person.family_id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}