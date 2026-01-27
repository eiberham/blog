import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

const POSTS_PATH = path.join(process.cwd(), 'content')

export const getAllPosts = cache(() => {
  const folders = fs.readdirSync(POSTS_PATH).filter((name) => 
    fs.statSync(path.join(POSTS_PATH, name)).isDirectory()
  )

  return folders
    .map((slug) => {
      const filePath = path.join(POSTS_PATH, slug, 'index.md')
      if (!fs.existsSync(filePath)) return null

      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        ...data,
        slug,
        title: data.title || slug,
        date: data.date || '',
        status: data.status || 'published',
        description: data.description || '',
      }
    })
    .filter((post): post is any => post !== null && post.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_PATH, `${slug}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // matter extracts the metadata from the YAML block
  const { data, content } = matter(fileContents)

  return {
    slug,
    metadata: data, // { title, date, etc }
    content,
  }
}