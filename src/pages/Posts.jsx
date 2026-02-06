import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoon, FiSun } from 'react-icons/fi'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card'

const Posts = ({ theme, onToggleTheme }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/posts/index.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data)
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts)
        }
      })
      .catch((err) => {
        console.error('Failed to load posts index:', err)
      })
  }, [])

  const normalizedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime()
      const dateB = new Date(b.date || 0).getTime()
      return dateB - dateA
    })
  }, [posts])

  const normalizeTags = (value) => {
    if (!value) return []
    if (Array.isArray(value)) return value.filter(Boolean)
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    }
    return []
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link to="/" className="text-neon hover:text-haze underline">
            ← Back to journal
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-steel">
            All entries
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-slate bg-smoke/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-fog backdrop-blur hover:text-haze hover:border-haze transition"
          aria-label="Toggle color theme"
        >
          {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
          <span className="hidden sm:inline">
            {theme === 'light' ? 'Night' : 'Day'}
          </span>
        </button>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-display text-haze">
          All journal entries
        </h1>
        <p className="text-steel mt-3">
          A collection of everything I have published so far.
        </p>
      </div>

      {normalizedPosts.length === 0 ? (
        <p className="text-steel text-center">No entries yet. Add one via the CMS!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {normalizedPosts.map((post) => {
            const tags = normalizeTags(post.tags)
            const badges = [
              ...(post.category ? [post.category] : []),
              ...tags,
            ]

            return (
              <Card
                key={post.slug}
                className="shadow-glow hover:shadow-ember transition duration-300 hover:-translate-y-1 scanline"
              >
                <CardHeader>
                  {badges.length ? (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {badges.slice(0, 3).map((badge) => (
                        <span
                          key={badge}
                          className="text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <CardTitle className="text-xl mb-1 text-haze">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs uppercase tracking-[0.2em] text-steel">
                    {post.date ? new Date(post.date).toLocaleDateString() : 'Entry'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-fog card-description-clamp">
                    {post.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/posts/${post.slug}`}
                    className="text-neon hover:text-haze underline"
                  >
                    Read entry
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Posts
