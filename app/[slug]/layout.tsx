export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-10">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </article>
    </div>
  )
}