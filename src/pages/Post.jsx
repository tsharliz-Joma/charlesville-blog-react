import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FiCheck, FiMoon, FiPlay, FiSun, FiX } from 'react-icons/fi'
import yaml from 'js-yaml'

// Post page loads a markdown file based on the slug route param and renders it.
const Post = ({ theme, onToggleTheme }) => {
  const { slug } = useParams()
  const [markdown, setMarkdown] = useState('')
  const [meta, setMeta] = useState({})
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizError, setQuizError] = useState('')
  const [readingProgress, setReadingProgress] = useState(0)

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
  const spotifyEmbedHeight = 80

  const sections = Array.isArray(meta.sections) ? meta.sections : []
  const quizQuestions = Array.isArray(meta.quiz) ? meta.quiz : []

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
        setQuizAnswers({})
        setQuizScore(null)
        setQuizCompleted(false)
        setQuizError('')
      })
      .catch((err) => {
        console.error(err)
        setMeta({})
        setMarkdown('# 404\n\nPost not found.')
      })
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0
      setReadingProgress(Math.max(0, Math.min(1, progress)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleOptionChange = (questionIndex, optionIndex, multiple) => {
    setQuizAnswers((prev) => {
      const next = { ...prev }
      if (multiple) {
        const current = new Set(Array.isArray(prev[questionIndex]) ? prev[questionIndex] : [])
        if (current.has(optionIndex)) {
          current.delete(optionIndex)
        } else {
          current.add(optionIndex)
        }
        next[questionIndex] = Array.from(current).sort()
      } else {
        next[questionIndex] = optionIndex
      }
      return next
    })
    setQuizError('')
  }

  const handleQuizSubmit = (event) => {
    event.preventDefault()
    if (!quizQuestions.length) return

    const hasMissing = quizQuestions.some((question, index) => {
      const multiple = Boolean(question?.multiple)
      const answer = quizAnswers[index]
      if (multiple) {
        return !Array.isArray(answer) || answer.length === 0
      }
      return answer === undefined || answer === null
    })

    if (hasMissing) {
      setQuizError('Please answer all questions before submitting.')
      return
    }

    let correctCount = 0
    quizQuestions.forEach((question, index) => {
      const options = Array.isArray(question?.options) ? question.options : []
      const normalizedOptions = options.map((option) =>
        typeof option === 'string' ? { text: option, correct: false } : option,
      )
      const correctIndexes = normalizedOptions
        .map((option, optionIndex) => (option?.correct ? optionIndex : null))
        .filter((value) => value !== null)
      const multiple = Boolean(question?.multiple)
      const answer = quizAnswers[index]

      if (multiple) {
        const selected = Array.isArray(answer) ? answer : []
        const sortedSelected = [...selected].sort()
        const sortedCorrect = [...correctIndexes].sort()
        const isCorrect =
          sortedSelected.length === sortedCorrect.length &&
          sortedSelected.every((value, idx) => value === sortedCorrect[idx])
        if (isCorrect) correctCount += 1
      } else {
        if (correctIndexes.length === 1 && answer === correctIndexes[0]) {
          correctCount += 1
        }
      }
    })

    const score = Math.round((correctCount / quizQuestions.length) * 100)
    setQuizScore(score)
    setQuizCompleted(true)
    setQuizError('')
  }

  return (
    <>
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${readingProgress})` }}
        aria-hidden="true"
      />
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
        <div className="mb-10 w-full max-w-md mx-auto">
          <iframe
            title={meta.spotifyLabel || 'Spotify playlist'}
            src={spotifyEmbedUrl}
            width="100%"
            height={spotifyEmbedHeight}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            scrolling="no"
            loading="lazy"
            className="rounded-2xl border border-slate/60 shadow-ember h-[80px]"
          />
        </div>
      ) : null}

      {quizQuestions.length ? (
        <div className="mb-10 flex justify-center">
          <button
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className={`quiz-trigger inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] transition ${
              quizCompleted ? 'quiz-trigger--done' : 'quiz-trigger--idle'
            }`}
          >
            {quizCompleted ? <FiCheck size={16} /> : <FiPlay size={16} />}
            {quizCompleted ? 'Quiz completed' : 'Take the quiz'}
          </button>
        </div>
      ) : null}

      {isQuizOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsQuizOpen(false)}
          />
          <div className="relative w-full max-w-3xl rounded-3xl border border-slate bg-smoke/95 p-6 shadow-ember">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-steel">
                  Quiz
                </p>
                <h3 className="text-2xl font-display text-haze mt-2">
                  Quick check-in
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQuizOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate bg-smoke px-3 py-3 text-fog hover:text-haze hover:border-haze transition"
                aria-label="Close quiz"
              >
                <FiX size={16} />
              </button>
            </div>

            {quizScore !== null ? (
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-steel">
                  Your result
                </p>
                <p className="text-4xl font-display text-haze mt-2">
                  {quizScore}%
                </p>
                <p className="text-steel mt-2">
                  Thanks for taking the quiz.
                </p>
                <button
                  type="button"
                  onClick={() => setIsQuizOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-slate px-5 py-2 text-xs uppercase tracking-[0.3em] text-fog hover:text-haze hover:border-haze transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                {quizQuestions.map((question, index) => {
                  const multiple = Boolean(question?.multiple)
                  const options = Array.isArray(question?.options)
                    ? question.options
                    : []
                  const normalizedOptions = options.map((option) =>
                    typeof option === 'string'
                      ? { text: option, correct: false }
                      : option,
                  )
                  const answer = quizAnswers[index]
                  return (
                    <div
                      key={`${question?.question || 'question'}-${index}`}
                      className="rounded-2xl border border-slate/60 px-5 py-4"
                    >
                      <p className="text-haze font-semibold">
                        {question?.question || `Question ${index + 1}`}
                      </p>
                      <div className="mt-4 grid gap-3">
                        {normalizedOptions.map((option, optionIndex) => {
                          const isChecked = multiple
                            ? Array.isArray(answer) &&
                              answer.includes(optionIndex)
                            : answer === optionIndex
                          return (
                            <label
                              key={`${option?.text || 'option'}-${optionIndex}`}
                              className="flex items-start gap-3 rounded-xl border border-slate/60 px-3 py-2 text-sm text-fog hover:border-haze transition"
                            >
                              <input
                                type={multiple ? 'checkbox' : 'radio'}
                                name={`question-${index}`}
                                checked={isChecked}
                                onChange={() =>
                                  handleOptionChange(
                                    index,
                                    optionIndex,
                                    multiple,
                                  )
                                }
                                className="mt-1"
                              />
                              <span>
                                {option?.text || `Option ${optionIndex + 1}`}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {quizError ? (
                  <p className="text-pulse text-sm">{quizError}</p>
                ) : null}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsQuizOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-slate px-5 py-2 text-xs uppercase tracking-[0.3em] text-fog hover:text-haze hover:border-haze transition"
                  >
                    Exit quiz
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-neon px-6 py-2 text-xs uppercase tracking-[0.3em] text-noir font-semibold shadow-glow hover:bg-haze transition"
                  >
                    Submit quiz
                  </button>
                </div>
              </form>
            )}
          </div>
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
    </>
  )
}

export default Post
