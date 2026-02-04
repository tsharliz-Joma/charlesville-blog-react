import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FiMoon, FiSun } from 'react-icons/fi'

// Post page loads a markdown file based on the slug route param and renders it.
const Post = ({ theme, onToggleTheme }) => {
  const { slug } = useParams()
  const [markdown, setMarkdown] = useState('')
  const [meta, setMeta] = useState({})

  const parseFrontmatter = (raw) => {
    if (!raw.startsWith('---')) {
      return { data: {}, content: raw }
    }

    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
    if (!match) {
      return { data: {}, content: raw }
    }

    const data = {}
    const lines = match[1].split('\n')
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i]
      if (!line.trim()) continue
      if (line.trim().startsWith('-')) continue

      const [key, ...rest] = line.split(':')
      if (!key) continue
      const trimmedKey = key.trim()
      let value = rest.join(':').trim()

      if (!value) {
        const list = []
        let j = i + 1
        while (j < lines.length && lines[j].trim().startsWith('-')) {
          const item = lines[j]
            .replace(/^-+\s*/, '')
            .trim()
            .replace(/^"(.+)"$/, '$1')
          if (item) list.push(item)
          j += 1
        }
        if (list.length) {
          data[trimmedKey] = list
          i = j - 1
          continue
        }
        data[trimmedKey] = ''
        continue
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1)
        data[trimmedKey] = value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
        continue
      }

      data[trimmedKey] = value.replace(/^"(.+)"$/, '$1')
    }

    return { data, content: match[2] }
  }

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

  useEffect(() => {
    fetch(`/posts/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found')
        return res.text()
      })
      .then((text) => {
        const parsed = parseFrontmatter(text)
        setMeta(parsed.data)
        setMarkdown(parsed.content)
      })
      .catch((err) => {
        console.error(err)
        setMeta({})
        setMarkdown('# 404\n\nPost not found.')
      })
  }, [slug])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <Link
        to="/"
        className="text-neon hover:text-haze underline"
      >
        ← Back to journal
      </Link>
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
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">
          {meta.date ? new Date(meta.date).toLocaleDateString() : 'Entry'}
        </p>
        {(meta.category || normalizeTags(meta.tags).length) ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {meta.category ? (
              <span className="text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1">
                {meta.category}
              </span>
            ) : null}
            {normalizeTags(meta.tags).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.25em] text-steel border border-slate/70 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className="text-3xl sm:text-4xl font-display text-haze mt-2">
          {meta.title || 'Untitled entry'}
        </h1>
        {meta.description ? (
          <p className="text-steel mt-3">{meta.description}</p>
        ) : null}
      </header>

      {meta.image ? (
        <div className="mb-10">
          <img
            src={meta.image}
            alt={meta.imageAlt || meta.title || 'Post image'}
            className="w-full max-h-[460px] object-cover rounded-3xl border border-slate/60 shadow-ember"
            loading="lazy"
          />
        </div>
      ) : null}

      <article className="prose lg:prose-lg prose-invert prose-blade max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </div>
  )
}

export default Post
