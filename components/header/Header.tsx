import Link from 'next/link'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/"><span className={styles.logo}>Abraham's Blog</span></Link>
      </div>
    </header>
  )
}