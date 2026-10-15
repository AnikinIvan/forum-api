import { Header } from './components/header.js'
import { PostList } from './components/postlist.js'
import { posts } from './data/post.js'
import './App.css'


export default function App() {
  return (
    <div className="page">
      <Header name="1chan" description="post whatever you are on today!" />
      <PostList posts={posts} />
    </div>
  )
}