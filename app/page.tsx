import Link from 'next/link'
import { PostItem } from '@/components/post-item/PostItem'
import { getAllPosts } from '@/lib/posts'
/* import Chat from '@/components/chat/Chat' */

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 area-main">
      {/* <Chat /> */}
      {posts.map(post => (
        <Link href={post.slug} key={post.slug}>
          <PostItem 
            key={post.slug}
            title={post.title}
            description={post.description}
            date={new Date(post.date)
              .toLocaleString('en-US', { month: 'short', year: 'numeric' })
              .toUpperCase().replace(' ', ', ')
            }
          />
        </Link>
      ))}
    </div>
  )
}
