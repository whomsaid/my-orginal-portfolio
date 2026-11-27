import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import fr from './fr.js'
import rw from './rw.js'

export const dictionaries = { en, rw, fr }
export const languages = Object.keys(dictionaries)
const KEY = 'hx-lang'

/** Pick the right language from a { en, rw, fr } content value, falling back to English. */
export function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || ''
}

function lookup(dict, path) {
  return path.split('.').reduce((node, part) => (node == null ? node : node[part]), dict)
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved && dictionaries[saved]) return saved
    } catch {
      /* ignore */
    }
    const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : 'en'
    return dictionaries[nav] ? nav : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((next) => dictionaries[next] && setLangState(next), [])

  const value = useMemo(() => {
    const dict = dictionaries[lang]
    const t = (path) => lookup(dict, path) ?? lookup(en, path) ?? path
    return { lang, setLang, t, p: (v) => pick(v, lang) }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
