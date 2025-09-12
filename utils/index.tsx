import { Post, PostsByYear } from './types'

/**
 * Gets the estimted reading time
 * @param {string} content - the post's content
 * @returns {string |number} - estimated reading time
 */
function getEstimatedReadingTime(content: string) {
  const words = content.split(' ').length - 1
  const number = words / 200

  if (!Number.isSafeInteger(number)) {
    const [ minutes ] = number.toString().split('.')
    return minutes
  }

  return number
}

/**
 * Gets all posts by year
 * @param {array} posts - The array of posts
 * @returns {object} - Posts by year
 */
function getPostsByYear(posts: Post[]): PostsByYear | null {
  if (!Array.isArray(posts)) return null
  return posts.reduce((acc: { [year: number]: Post[] }, value) => {
    const date = new Date(value.date).getFullYear()
    return {
        ...acc,
        [date]: [
            ...(acc[date] || []),
            value
        ]
    }
  }, {} as { [year: number]: Post[] })
}

/**
 * Gets all posts by tag
 * @param {array} posts - The array of posts
 * @returns {array} - The array of posts filtered by tag
 */
function getPostsByTag(posts: Post[]) {
  if (!Array.isArray(posts)) return null
  return (tag: string) => posts.filter(post => post.tags?.includes(tag))
}

export {
  getEstimatedReadingTime,
  getPostsByYear,
  getPostsByTag
}