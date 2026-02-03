import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../components/ui/card'

// Home page displays a grid of posts. Posts are loaded from
// public/posts/index.json. Each entry should include a slug,
// title, date and description. The Card component gives a
// consistent look and feel.
const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/posts/index.json')
      .then((res) => res.json())
      .then((data) => {
        // Support both { posts: [...] } and direct array formats.
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

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center text-center">
      <nav className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-steel">
            Charlesville
          </p>
          <p className="font-display text-lg text-haze">Game Dev Journal</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-steel">
          <a href="#posts" className="hover:text-haze transition-colors">Posts</a>
          <a href="#about" className="hover:text-haze transition-colors">About</a>
          <a href="#subscribe" className="hover:text-haze transition-colors">Subscribe</a>
        </div>
      </nav>

      <section className="glass-panel w-full max-w-6xl mt-10 px-6 py-10 sm:px-10 sm:py-12 rounded-3xl">
        <div className="flex flex-col items-center gap-6">
          <p className="text-xs uppercase tracking-[0.4em] text-steel">
            Neon-drenched notes
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-haze">
            Charles's Game Dev Blog
          </h1>
          <p className="text-steel max-w-2xl">
            Mellow dispatches from a quiet, rain-slicked future. Honest process logs,
            atmospheric experiments, and UX-first reflections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#posts"
              className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition"
            >
              Browse posts
            </a>
            <a
              href="#subscribe"
              className="px-6 py-3 rounded-full border border-slate text-fog hover:text-haze hover:border-haze transition"
            >
              Get updates
            </a>
          </div>
          <div className="w-full max-w-3xl">
            <img
              src="/hero-default.svg"
              alt="City lights reflected on rain-slick streets"
              className="w-full rounded-2xl border border-slate/60 shadow-ember"
              loading="lazy"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
            {[
              { label: 'Cadence', value: 'Bi-weekly' },
              { label: 'Focus', value: 'Narrative systems' },
              { label: 'Mood', value: 'Mellow futurism' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate/70 px-5 py-4 text-center"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-steel">
                  {item.label}
                </p>
                <p className="mt-2 text-haze font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="text-steel mt-10">No posts found. Add some via the CMS!</p>
      ) : (
        <div id="posts" className="w-full max-w-6xl mt-12">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-steel">Latest posts</p>
            <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
              Recent dispatches
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="shadow-glow hover:shadow-ember transition duration-300 hover:-translate-y-1 scanline"
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-1 text-haze">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs uppercase tracking-[0.2em] text-steel">
                    {new Date(post.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-fog">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/posts/${post.slug}`}
                    className="text-neon hover:text-haze underline"
                  >
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <section id="about" className="w-full max-w-4xl mt-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">About</p>
        <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
          Human-scale craft, pixel by pixel
        </h2>
        <p className="text-steel mt-3">
          I write about building game systems with a calm, deliberate approach.
          Expect thoughtful UX choices, design notes, and honest postmortems.
        </p>
      </section>

      <section id="subscribe" className="w-full max-w-4xl mt-14">
        <div className="glass-panel rounded-3xl px-6 py-8 sm:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">Subscribe</p>
          <h2 className="text-2xl sm:text-3xl font-display text-haze mt-2">
            Stay in the loop
          </h2>
          <p className="text-steel mt-3">
            Short notes. No noise. Just the latest posts as they land.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              className="w-full sm:w-64 rounded-full border border-slate bg-smoke px-4 py-3 text-fog placeholder:text-steel focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-neon text-noir font-semibold tracking-wide shadow-glow hover:bg-haze transition"
            >
              Notify me
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
