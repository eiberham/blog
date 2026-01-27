import Image from 'next/image';
import Link from 'next/link';

export default function NotFound(){
    return (
        <div className="text-center mt-16 area-main">
            <Image src="/not-found.png" alt="Not Found" width={500} height={500} />
            <h1>Post not found.</h1> <Link href="/">Go back to home</Link>
        </div>
    );
}