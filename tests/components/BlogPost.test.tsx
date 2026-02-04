import '@testing-library/jest-dom'
import { expect, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

jest.mock('rehype-highlight', () => () => {})

jest.mock('next-mdx-remote-client/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div>{source}</div>,
}))

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => { throw new Error('NEXT_NOT_FOUND') }),
}))

jest.mock('react-icons/fa', () => ({
  FaRegClock: () => <span data-testid="clock-icon" />,
}))

const mockPost = {
  slug: 'test-post',
  metadata: {
    title: 'Test Post',
    date: '2024-01-01',
    tags: 'test, blog',
  },
  content: 'This is a test blog post content.',
}

jest.mock('@/lib/posts', () => ({
  getPostBySlug: jest.fn(() => mockPost),
}))

jest.mock('@/utils', () => ({
  getEstimatedReadingTime: jest.fn(() => 5),
}))

import BlogPost from '@/app/[slug]/page'
import { notFound } from 'next/navigation'

describe('BlogPost Component', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('matches the snapshot', async () => {
        const Component = await BlogPost({ 
            params: { slug: 'test-post' }
        })

        const { container } = render(Component)
        expect(container).toMatchSnapshot()
    })

    it('renders blog post correctly', async () => {
        const Component = await BlogPost({ 
            params: { slug: 'test-post' }
        })

        render(Component)

        expect(screen.getByText('Test Post')).toBeInTheDocument()
        expect(screen.getByText('5 min read')).toBeInTheDocument()
        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByText('blog')).toBeInTheDocument()
        expect(screen.getByText('This is a test blog post content.')).toBeInTheDocument()
    })

    it('redirects to notFound for missing post', async () => {
        jest.spyOn(require('@/lib/posts'), 'getPostBySlug').mockImplementation(() => {
            return null;
        })

        await expect(BlogPost({ 
            params: { slug: 'non-existent-post' }
        })).rejects.toThrow('NEXT_NOT_FOUND')

        expect(notFound).toHaveBeenCalled()
    })
})
