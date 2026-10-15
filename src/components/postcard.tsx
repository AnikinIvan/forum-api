import type { Post } from '../types/post.js'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card">
        <h3 className = "title">{post.title}</h3>
        <h4>{post.content}</h4>
        <h4 className = "author">posted by {post.author}</h4>
        <h4>#{post.category}</h4>
    </article>
  )
}