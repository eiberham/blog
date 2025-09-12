import { FaGithubSquare } from 'react-icons/fa'

import Link from 'next/link'

import styles from './Footer.module.css'

export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <footer className={styles.footer}>
            <section className={styles.section}>
                <span className={styles.content}>Content on this Site is Copyright © {year} Abraham. Licensed under a <Link aria-label="creative-commons" href="https://creativecommons.org/licenses/by/3.0">Creative Commons Attribution 3.0 License</Link></span>
                <div className={styles.follow}>
                    <Link aria-label="github" href="https://github.com/eiberham"><FaGithubSquare /></Link>
                </div>
            </section>
        </footer>
    )
}