import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

// lookups = { families: { source: '/families/', label: (item) => '...' } }
// ফর্মের "পরিবার/ব্যক্তি" বাছাই ও টেবিলের নাম দেখানোর জন্য তালিকা এনে রাখে
export default function useLookups(lookups = {}) {
  const [state, setState] = useState({ data: {}, error: null })

  useEffect(() => {
    const keys = Object.keys(lookups)
    if (keys.length === 0) return undefined

    let cancelled = false

    Promise.all(keys.map((key) => api.get(lookups[key].source, { auth: true })))
      .then((results) => {
        if (cancelled) return
        setState({
          data: Object.fromEntries(keys.map((key, index) => [key, results[index] ?? []])),
          error: null,
        })
      })
      .catch((error) => {
        if (!cancelled) setState({ data: {}, error })
      })

    return () => {
      cancelled = true
    }
  }, [lookups])

  // id → দেখানোর নাম
  const maps = useMemo(() => {
    const result = {}

    for (const [key, items] of Object.entries(state.data)) {
      result[key] = new Map(items.map((item) => [item.id, lookups[key].label(item)]))
    }

    return result
  }, [state.data, lookups])

  return { items: state.data, maps, error: state.error }
}