import { useMemo } from 'react'
import useFetch from './useFetch'

// "গ্রামের মানুষ" ও "পরিবার" — দুই তালিকা একসাথে এনে জোড়া লাগায়
export default function useDirectory() {
  const peopleRequest = useFetch('/people/', { auth: true })
  const familiesRequest = useFetch('/families/', { auth: true })

  const people = useMemo(() => peopleRequest.data ?? [], [peopleRequest.data])
  const families = useMemo(() => familiesRequest.data ?? [], [familiesRequest.data])

  const familyById = useMemo(
    () => new Map(families.map((family) => [family.id, family])),
    [families],
  )

  return {
    people,
    families,
    familyById,
    loading: peopleRequest.loading || familiesRequest.loading,
    error: peopleRequest.error || familiesRequest.error,
    reload: () => {
      peopleRequest.reload()
      familiesRequest.reload()
    },
  }
}