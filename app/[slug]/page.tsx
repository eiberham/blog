
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { FaRegClock } from 'react-icons/fa';

import { notFound } from 'next/navigation'

import Tags from '@/components/tags/Tags'
import { getEstimatedReadingTime } from '@/utils'

import styles from './page.module.css'

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const directory = path.join(process.cwd(), 'content')
  const folder = fs.readdirSync(directory).find(name => name === params.slug)

  if (!folder) notFound()

  const filePath = path.join(directory, folder, 'index.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const minutes = getEstimatedReadingTime(content)

  const markup = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const date = new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <article className={styles.article}>
      <span className={styles.date}>Published on {date}</span>
      <h1>{data.title}</h1>
      <h2 className={styles.time}><FaRegClock />&nbsp;{minutes} minutes</h2>
      <Tags tags={data.tags} />
      <div dangerouslySetInnerHTML={{ __html: markup.toString() }} />
    </article>
  )
}
