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

  const isRecentPost = (dateValue) => {
    const time = new Date(dateValue || 0).getTime()
    if (!Number.isFinite(time)) return false
    const diff = Date.now() - time
    const twoWeeks = 14 * 24 * 60 * 60 * 1000
    return diff >= 0 && diff <= twoWeeks
  }

  const getReadingTime = (post) => {
    const minutes = Number(post?.readingTime)
    if (Number.isFinite(minutes) && minutes > 0) return minutes
    const words = (post?.description || '').split(/\s+/).filter(Boolean).length
    return words ? Math.max(1, Math.round(words / 200)) : null
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
            const isNew = isRecentPost(post.date)
            const readingTime = getReadingTime(post)
            const badges = [
              ...(post.category ? [post.category] : []),
              ...tags,
            ]
            const maxBadges = 4
            const extraCount = badges.length - maxBadges
            const displayBadges =
              extraCount > 0
                ? [...badges.slice(0, maxBadges - 1), `+${extraCount} more`]
                : badges.slice(0, maxBadges)

            return (
              <Card
                key={post.slug}
                className="card-interactive shadow-glow hover:shadow-ember transition duration-300 hover:-translate-y-1 scanline"
              >
                <CardHeader>
                  <div className="card-tag-row flex flex-wrap gap-2 mb-3">
                    {isNew ? (
                      <span className="card-badge card-badge--new text-[10px] uppercase tracking-[0.25em] rounded-full px-3 py-1">
                        New
                      </span>
                    ) : null}
                    {displayBadges.map((badge) => (
                      <span
                        key={badge}
                        className="card-badge text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <CardTitle className="text-xl mb-1 text-haze">
                    {post.title}
                  </CardTitle>
                  <div className="card-meta">
                    <CardDescription className="text-xs uppercase tracking-[0.2em] text-steel">
                      {post.date ? new Date(post.date).toLocaleDateString() : 'Entry'}
                    </CardDescription>
                    {readingTime ? (
                      <span className="card-readtime">~{readingTime} min read</span>
                    ) : null}
                  </div>
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
