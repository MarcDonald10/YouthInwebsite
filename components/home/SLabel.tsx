

export function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: '#DCF763' }} />
      <span className="fd text-xs font-black uppercase tracking-[3px]" style={{ color: 'rgba(220,247,99,.6)' }}>{children}</span>
    </div>
  )
}