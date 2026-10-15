import type { Post } from '../types/post.js'
import { PostCard } from './postcard.js'

interface PostListProps {
  posts: Post[]
}

export function PostList({posts}: PostListProps) {
  return (
    <section className="postList">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}