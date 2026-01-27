import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', ['rehype-autolink-headings', { behavior: 'wrap' }]],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
