import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FiMoon, FiSun } from 'react-icons/fi'
import yaml from 'js-yaml'

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

    let data = {}
    try {
      const parsed = yaml.load(match[1])
      if (parsed && typeof parsed === 'object') {
        data = parsed
      }
    } catch (error) {
      data = {}
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

  const getSpotifyEmbedUrl = (url) => {
    if (!url) return ''
    if (url.includes('open.spotify.com/embed/')) return url

    const webMatch = url.match(
      /open\.spotify\.com\/(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/,
    )
    if (webMatch) {
      return `https://open.spotify.com/embed/${webMatch[1]}/${webMatch[2]}`
    }

    const uriMatch = url.match(
      /spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]+)/,
    )
    if (uriMatch) {
      return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}`
    }

    return ''
  }

  const spotifyEmbedUrl = getSpotifyEmbedUrl(meta.spotifyUrl)

  const sections = Array.isArray(meta.sections) ? meta.sections : []

  const buildImageClass = (align) => {
    const base =
      'rounded-2xl border border-slate/60 shadow-ember mb-4 w-full object-cover'
    if (align === 'left') {
      return `${base} sm:w-56 md:w-64 float-left mr-6`
    }
    if (align === 'right') {
      return `${base} sm:w-56 md:w-64 float-right ml-6`
    }
    return `${base} max-w-2xl mx-auto`
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

      {spotifyEmbedUrl ? (
        <div className="mb-10">
          <iframe
            title={meta.spotifyLabel || 'Spotify playlist'}
            src={spotifyEmbedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl border border-slate/60 shadow-ember"
          />
        </div>
      ) : null}

      <article
        className={`prose lg:prose-lg prose-blade max-w-none ${
          theme === 'light' ? '' : 'prose-invert'
        }`}
      >
        {sections.length ? (
          sections.map((section, index) => {
            const heading = section?.heading || ''
            const text = section?.text || ''
            const image = section?.image
            const imageAlt = section?.imageAlt || meta.title || 'Entry image'
            const imageAlign = section?.imageAlign || 'none'
            const showImage = Boolean(image && imageAlign !== 'none')

            return (
              <section key={`${imageAlt}-${index}`} className="mb-8">
                {heading ? <h2>{heading}</h2> : null}
                {showImage ? (
                  <div className="not-prose">
                    <img
                      src={image}
                      alt={imageAlt}
                      className={buildImageClass(imageAlign)}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                {text ? <ReactMarkdown>{text}</ReactMarkdown> : null}
                {showImage && (imageAlign === 'left' || imageAlign === 'right') ? (
                  <div className="clear-both" />
                ) : null}
              </section>
            )
          })
        ) : null}
        {markdown ? <ReactMarkdown>{markdown}</ReactMarkdown> : null}
      </article>
    </div>
  )
}

export default Post
