import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function Tags({ tags } : { tags: string }) {
    const categories = tags.trim().split(',')
    return (
        <div className="flex items-center gap-2 justify-center mt-6 mb-6 ml-0 mr-0">
            {categories && categories.map(category => (
                <Badge variant="outline" asChild key={category} className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Link href={`/posts?tag=${category}`} >{category}</Link>
                </Badge>
            ))}
        </div>
    )
}