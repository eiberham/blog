import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

interface Post {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string;
  status?: string;
}

export default function Home() {
  const directory = path.join(process.cwd(), 'content')
  const folders = fs.readdirSync(directory).filter((name) => {
    const folder = path.join(directory, name)
    return fs.statSync(folder).isDirectory()
  })

  const posts: Post[] = folders.map((folder) => {
    const filePath = path.join(directory, folder, 'index.md')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return { 
      ...data, 
      title: data.title || folder,
      slug: folder }
  })

  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
