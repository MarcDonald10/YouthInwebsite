import { useEffect, useRef } from "react";


export function Cursor() {
    const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: 0, y: 0 }), rp = useRef({ x: 0, y: 0 })
    useEffect(() => {
        const mv = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px' } }
        let af: number
        const lr = () => { rp.current.x += (pos.current.x - rp.current.x) * .11; rp.current.y += (pos.current.y - rp.current.y) * .11; if (ring.current) { ring.current.style.left = rp.current.x + 'px'; ring.current.style.top = rp.current.y + 'px' }; af = requestAnimationFrame(lr) }
        lr()
        const dn = () => { if (dot.current) dot.current.style.transform = 'translate(-50%,-50%) scale(.6)'; if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(.6)' }
        const up = () => { if (dot.current) dot.current.style.transform = 'translate(-50%,-50%) scale(1)'; if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1)' }
        window.addEventListener('mousemove', mv); window.addEventListener('mousedown', dn); window.addEventListener('mouseup', up)
        return () => { cancelAnimationFrame(af); window.removeEventListener('mousemove', mv); window.removeEventListener('mousedown', dn); window.removeEventListener('mouseup', up) }
    }, [])
    return (
        <>
            <div ref={dot} className="cd" style={{ width: 8, height: 8, background: '#DCF763', left: -20, top: -20, transform: 'translate(-50%,-50%)' }} />
            <div ref={ring} className="cr" style={{ width: 34, height: 34, border: '1.5px solid rgba(220,247,99,.45)', left: -20, top: -20, transform: 'translate(-50%,-50%)' }} />
        </>
    )
}