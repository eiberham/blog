import { Separator } from "@/components/ui/separator"

interface PostItemProps {
  title: string;
  description: string | undefined;
  date: string;
}

export function PostItem({ title, description, date }: PostItemProps) {
  return (
    <div className="py-6 group cursor-pointer">
      <div className="flex flex-col space-y-2">
        <span className="text-sm text-muted-foreground font-medium">
          {date}
        </span>
        <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
          {title}
        </h2>
        {/* <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p> */}
      </div>
      <Separator className="mt-6" />
    </div>
  )
}