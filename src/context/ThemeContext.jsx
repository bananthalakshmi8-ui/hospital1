import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

function readThemePreference() {
  try {
    const saved = localStorage.getItem('medicare-theme')
    if (!saved) return false
    const parsed = JSON.parse(saved)
    return typeof parsed === 'boolean' ? parsed : false
  } catch {
    localStorage.removeItem('medicare-theme')
    return false
  }
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(readThemePreference)

  useEffect(() => {
    localStorage.setItem('medicare-theme', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const defaultTheme = { darkMode: false, toggleTheme: () => {} }

export const useTheme = () => useContext(ThemeContext) ?? defaultTheme
