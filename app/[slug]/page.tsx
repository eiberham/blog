
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
    const directory = path.join(process.cwd(), 'content')
    const folder = fs.readdirSync(directory).find(name => name === params.slug)

    if (!folder) {
      return <div>Post not found</div>;
    }

    const filePath = path.join(directory, folder, 'index.md')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    
  return (
    <div>
      <h1>{data.title}</h1>
      <div>{content}</div>
    </div>
  )
}
