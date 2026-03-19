interface StatusBadgeProps {
  status: 'pending' | 'verified' | 'rejected' | 'active' | 'completed' | 'trending'
  text: string
  icon?: React.ReactNode
}

export function StatusBadge({ status, text, icon }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    verified: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    trending: 'bg-accent/20 text-accent border-accent/30',
  }

  const dotColor = {
    pending: 'bg-yellow-500',
    verified: 'bg-green-500',
    rejected: 'bg-red-500',
    active: 'bg-blue-500',
    completed: 'bg-green-500',
    trending: 'bg-accent',
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <div className={`w-2 h-2 rounded-full ${dotColor[status]} animate-pulse`}></div>
      {icon && <span>{icon}</span>}
      {text}
    </div>
  )
}
