export function SkeletonCard() {
  return (
    <div className="glass p-6 rounded-xl animate-pulse">
      <div className="w-full h-40 bg-muted rounded-lg mb-4"></div>
      <div className="h-6 bg-muted rounded-lg mb-3"></div>
      <div className="h-4 bg-muted rounded-lg mb-3 w-3/4"></div>
      <div className="h-3 bg-muted rounded-lg mb-2"></div>
      <div className="h-3 bg-muted rounded-lg w-1/2"></div>
    </div>
  )
}

export function SkeletonText() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-muted rounded-lg w-3/4"></div>
      <div className="h-4 bg-muted rounded-lg"></div>
      <div className="h-4 bg-muted rounded-lg w-5/6"></div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
