export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-700'
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  }
  return <div className={`${base} ${variants[variant]} ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-4 space-y-4">
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-3/4 h-5" variant="text" />
      <Skeleton className="w-1/2 h-4" variant="text" />
      <div className="flex justify-between">
        <Skeleton className="w-20 h-6" variant="text" />
        <Skeleton className="w-24 h-10 rounded-xl" />
      </div>
    </div>
  )
}

export function DoctorCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="w-24 h-24 mx-auto" variant="circle" />
      <Skeleton className="w-3/4 h-5 mx-auto" variant="text" />
      <Skeleton className="w-1/2 h-4 mx-auto" variant="text" />
      <Skeleton className="w-full h-10 rounded-xl" />
    </div>
  )
}
