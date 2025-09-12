import Image from 'next/image';
import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFound(){
    return (
        <div className={styles.notfound}>
            <Image src="/not-found.png" alt="Not Found" width={500} height={500} />
            <h1>Post not found.</h1> <Link href="/">Go back to home</Link>
        </div>
    );
}