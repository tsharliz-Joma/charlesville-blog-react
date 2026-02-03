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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-400">
        Charles's Game Dev Blog
      </h1>
      {posts.length === 0 ? (
        <p>No posts found. Add some via the CMS!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="bg-gray-800 text-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl mb-1">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/posts/${post.slug}`}
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Read more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
