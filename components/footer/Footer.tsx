import { FaGithubSquare } from 'react-icons/fa'

import Link from 'next/link'

export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <footer className="grid area-foot bg-transparent border-t border-[#eeeeee] justify-items-center p-[1rem] h-[20vh] col-span-full self-end">
            <section className="flex flex-col justify-center max-w-[1120px] w-full items-start">
                <span className="text-[.9rem] leading-tight pt-4 px-2 text-justify">Content on this Site is Copyright © {year} Abraham. Licensed under a <Link aria-label="creative-commons" href="https://creativecommons.org/licenses/by/3.0">Creative Commons Attribution 3.0 License</Link></span>
                <div className="flex items-center basis-1/2 flex-row text-[2.5rem] justify-end px-2 w-full">
                    <Link aria-label="github" href="https://github.com/eiberham"><FaGithubSquare /></Link>
                </div>
            </section>
        </footer>
    )
}