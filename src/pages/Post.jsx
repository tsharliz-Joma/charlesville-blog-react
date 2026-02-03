import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// Post page loads a markdown file based on the slug route param and renders it.
const Post = () => {
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
    match[1].split('\n').forEach((line) => {
      if (!line.trim()) return
      const [key, ...rest] = line.split(':')
      if (!key) return
      const value = rest.join(':').trim().replace(/^"(.+)"$/, '$1')
      data[key.trim()] = value
    })

    return { data, content: match[2] }
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
      <Link
        to="/"
        className="text-neon hover:text-haze underline mb-6 inline-block"
      >
        ← Back to posts
      </Link>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">
          {meta.date ? new Date(meta.date).toLocaleDateString() : 'Post'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-display text-haze mt-2">
          {meta.title || 'Untitled post'}
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
