import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'

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
        <button
          type="button"
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 rounded-full border border-slate bg-smoke/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-fog backdrop-blur hover:text-haze hover:border-haze transition"
        >
          {theme === 'light' ? 'Night Mode' : 'Day Mode'}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
