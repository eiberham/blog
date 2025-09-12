import Link from 'next/link'
import styles from './Tags.module.css'

export default function Tags({ tags } : { tags: string }) {
    const categories = tags.trim().split(',')
    return (
        <ul className={styles.tags}>
        {categories && categories.map(category => (
            <li className={styles.tag} key={category} >
                <Link href={`/posts?tag=${category}`} >{category}</Link>
            </li>
        ))}
        </ul>
    )
}