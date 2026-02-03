import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// Post page loads a markdown file based on the slug route param and renders it.
const Post = () => {
  const { slug } = useParams()
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    fetch(`/posts/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found')
        return res.text()
      })
      .then((text) => setMarkdown(text))
      .catch((err) => {
        console.error(err)
        setMarkdown('# 404\n\nPost not found.')
      })
  }, [slug])

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-primary-400 hover:text-primary-300 underline mb-4 inline-block"
      >
        ← Back to posts
      </Link>
      <article className="prose lg:prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </div>
  )
}

export default Post
