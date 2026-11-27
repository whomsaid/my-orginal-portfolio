import { useEffect, useState } from 'react'

/** Track which section is in view so the nav can highlight it. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = null
        let bestRatio = 0
        ids.forEach((id) => {
          const r = visible.get(id) || 0
          if (r > bestRatio) {
            best = id
            bestRatio = r
          }
        })
        if (best) setActive(best)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
