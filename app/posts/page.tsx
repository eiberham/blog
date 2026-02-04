import Link from 'next/link'

import { Post } from '@/utils/types'
import { getPostsByYear } from '@/utils'

import styles from './page.module.css'
import { getAllPosts } from '@/lib/posts'

export default function PostsPage() {
  const posts = getAllPosts()

  const articles = getPostsByYear(posts)

  return (
    <div className={styles.box}>
      {articles && Object
      .entries(articles)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([key, posts]) => (
        <div key={key}>
          <h4>
            <span>{key}</span>
          </h4>
          <ul className={styles.posts}>
          {posts && posts.map((post: Post) => {
            return (
              <li className={styles.post} key={post.slug}>
                <Link href={post.slug}>
                    <div className={styles.wrap}>
                      <span>{post.title}</span>
                      <span className={styles.date}>
                        {new Date(post.date).toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase().replace(' ', ', ')}
                      </span>
                    </div>
                    <span className={styles.description}>
                      {post.description}
                    </span>
                </Link>
              </li>
            )
          })}
          </ul>
        </div>
      ))}
    </div>
  )
}
