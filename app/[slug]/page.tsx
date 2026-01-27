
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { FaRegClock } from 'react-icons/fa'
import { notFound } from 'next/navigation'
import Tags from '@/components/tags/Tags'
import { getEstimatedReadingTime } from '@/utils'

import { MDXRemote } from "next-mdx-remote-client/rsc"
import { getPostBySlug } from '@/lib/posts'

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const readingTime = getEstimatedReadingTime(post.content)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-none mx-auto py-10 px-4 area-main">
      <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <FaRegClock className="mr-2" />
        <span>{readingTime} min read</span>
      </div>
      {post.metadata.tags && <Tags tags={post.metadata.tags} />}
      <MDXRemote 
          source={post.content} 
          options={{
            mdxOptions: {
              format: 'md',
              rehypePlugins: [rehypeHighlight], 
            }
          }}
        />
    </article>
  )
}
