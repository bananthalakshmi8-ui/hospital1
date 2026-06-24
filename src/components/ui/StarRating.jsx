import { FiStar } from 'react-icons/fi'

export default function StarRating({ rating, size = 16, showValue = true }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
        />
      ))}
      {showValue && (
        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
          {rating}
        </span>
      )}
    </div>
  )
}
