import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Footer from './components/footer'

// Root application component. Sets up routing and a dark background.
const App = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    const nextTheme = stored || (prefersLight ? 'light' : 'dark')
    setTheme(nextTheme)
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light')
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-noir text-fog antialiased">
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} onToggleTheme={toggleTheme} />}
          />
          <Route
            path="/posts/:slug"
            element={<Post theme={theme} onToggleTheme={toggleTheme} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
