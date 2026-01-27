import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-[74px] border-b border-gray-300 dark:border-gray-700 bg-neutral-900 area-head self-start py-[10px] px-2 top-0 fixed">
      <div className="flex items-center px-4 max-w-[1120px] w-full">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-2xl text-blue-600">Abraham's Blog</span>
        </Link>
      </div>
    </header>
  )
}