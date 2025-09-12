import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

import { Post } from '@/utils/types'
import { getPostsByYear } from '@/utils'

import styles from './page.module.css'

export default function PostsPage() {
  const directory = path.join(process.cwd(), 'content')
  const folders = fs.readdirSync(directory).filter((name) => {
    const folder = path.join(directory, name)
    return fs.statSync(folder).isDirectory()
  })

  const posts: Post[] = folders
    .map((folder) => {
      const filePath = path.join(directory, folder, 'index.md')
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return { 
        ...data, 
        title: data.title || folder,
        status: data.status,
        date: data.date || '',
        slug: folder }
    })
    .filter(post => post.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
