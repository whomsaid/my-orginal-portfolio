import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })
const KEY = 'hx-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#050814' : '#f2f4fb')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
