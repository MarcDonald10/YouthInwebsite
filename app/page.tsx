'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Star, Zap, ChevronRight, ChevronDown, TrendingUp, Shield, CheckCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const G = `
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes heroReveal{from{opacity:0;transform:translateY(60px) skewY(2deg)}to{opacity:1;transform:none}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
  @keyframes pulseBtn{0%,100%{box-shadow:0 0 0 0 rgba(220,247,99,0)}50%{box-shadow:0 0 28px 6px rgba(220,247,99,.17)}}
  @keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(200vh)}}
  @keyframes floatCard{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-9px) rotate(.6deg)}70%{transform:translateY(4px) rotate(-.6deg)}}
  @keyframes shimmer{from{background-position:-200% center}to{background-position:200% center}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes barIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes borderRun{0%{background-position:0% 50%}100%{background-position:200% 50%}}
  @keyframes heroPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.85;transform:scale(1.12)}}
  @keyframes heroFloatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  .fd{font-family:'Clash Display',sans-serif}
  .h1{animation:heroReveal 1s cubic-bezier(.16,1,.3,1) .08s both}
  .h2{animation:heroReveal 1s cubic-bezier(.16,1,.3,1) .2s both}
  .hs{animation:fadeUp .8s ease .48s both}
  .hc{animation:fadeUp .8s ease .62s both}
  .hp{animation:fadeUp .8s ease .76s both}
  .sy{background:linear-gradient(90deg,#DCF763 0%,#fff 35%,#DCF763 55%,#fff 80%,#DCF763 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
  .mq{animation:marquee 22s linear infinite}
  .mq:hover{animation-play-state:paused}
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s ease,transform .7s ease}
  .rv.on{opacity:1;transform:none}
  .cd{position:fixed;pointer-events:none;z-index:9999;mix-blend-mode:difference;border-radius:50%;transition:transform .15s}
  .cr{position:fixed;pointer-events:none;z-index:9998;border-radius:50%;transition:transform .15s}
  .cg:hover{box-shadow:0 0 0 1px rgba(220,247,99,.14),0 24px 80px rgba(0,0,0,.7)}
  .bar{transform-origin:left;animation:barIn 1s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
  .lborder{background:linear-gradient(#030303,#030303) padding-box,linear-gradient(90deg,#DCF763,rgba(220,247,99,.2),#DCF763) border-box;border:1px solid transparent;background-size:200% 100%;animation:borderRun 3s linear infinite}
  .heroPanel{background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.1);box-shadow:0 22px 60px rgba(0,0,0,.45)}
  .heroChip{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);backdrop-filter:blur(4px)}
  .heroOrb{animation:heroPulse 4.2s ease-in-out infinite}
  .heroSoftFloat{animation:heroFloatSlow 6.4s ease-in-out infinite}
`

function NetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')!
    const sz = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    sz(); window.addEventListener('resize', sz)
    const mx = { x: -999, y: -999 }
    const onMove = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mx.x = e.clientX - r.left; mx.y = e.clientY - r.top }
    c.addEventListener('mousemove', onMove)
    const N = 60
    const P = Array.from({ length: N }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .5 }))
    let af: number
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = Math.hypot(dx, dy)
        if (d < 115) { ctx.beginPath(); ctx.strokeStyle = `rgba(220,247,99,${(1-d/115)*.11})`; ctx.lineWidth=.6; ctx.moveTo(P[i].x,P[i].y); ctx.lineTo(P[j].x,P[j].y); ctx.stroke() }
      }
      for (const p of P) {
        const dx = mx.x-p.x, dy = mx.y-p.y, d = Math.hypot(dx,dy)
        if (d>0 && d<150) { p.vx+=(dx/d)*.013; p.vy+=(dy/d)*.013 }
        const sp=Math.hypot(p.vx,p.vy); if(sp>1.1){p.vx*=.94;p.vy*=.94}
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>c.width) p.vx*=-1
        if(p.y<0||p.y>c.height) p.vy*=-1
        ctx.beginPath(); ctx.fillStyle=`rgba(220,247,99,${d<120?.9:.3})`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()
      }
      af = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(af); window.removeEventListener('resize', sz); c.removeEventListener('mousemove', onMove) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-55" />
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  return reducedMotion
}

function useCoarsePointer() {
  const [coarsePointer, setCoarsePointer] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setCoarsePointer(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  return coarsePointer
}

function Cursor() {
  const dot=useRef<HTMLDivElement>(null), ring=useRef<HTMLDivElement>(null)
  const pos=useRef({x:0,y:0}), rp=useRef({x:0,y:0})
  useEffect(() => {
    const mv=(e:MouseEvent)=>{pos.current={x:e.clientX,y:e.clientY};if(dot.current){dot.current.style.left=e.clientX+'px';dot.current.style.top=e.clientY+'px'}}
    let af:number
    const lr=()=>{rp.current.x+=(pos.current.x-rp.current.x)*.11;rp.current.y+=(pos.current.y-rp.current.y)*.11;if(ring.current){ring.current.style.left=rp.current.x+'px';ring.current.style.top=rp.current.y+'px'};af=requestAnimationFrame(lr)}
    lr()
    const dn=()=>{if(dot.current)dot.current.style.transform='translate(-50%,-50%) scale(.6)';if(ring.current)ring.current.style.transform='translate(-50%,-50%) scale(.6)'}
    const up=()=>{if(dot.current)dot.current.style.transform='translate(-50%,-50%) scale(1)';if(ring.current)ring.current.style.transform='translate(-50%,-50%) scale(1)'}
    window.addEventListener('mousemove',mv);window.addEventListener('mousedown',dn);window.addEventListener('mouseup',up)
    return ()=>{cancelAnimationFrame(af);window.removeEventListener('mousemove',mv);window.removeEventListener('mousedown',dn);window.removeEventListener('mouseup',up)}
  },[])
  return (
    <>
      <div ref={dot} className="cd" style={{width:8,height:8,background:'#DCF763',left:-20,top:-20,transform:'translate(-50%,-50%)'}} />
      <div ref={ring} className="cr" style={{width:34,height:34,border:'1.5px solid rgba(220,247,99,.45)',left:-20,top:-20,transform:'translate(-50%,-50%)'}} />
    </>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.08})
    els.forEach(el=>obs.observe(el)); return ()=>obs.disconnect()
  },[])
}

function Count({n,sfx=''}:{n:number;sfx?:string}) {
  const [v,setV]=useState(0); const ref=useRef<HTMLSpanElement>(null); const go=useRef(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!go.current){go.current=true;const t0=performance.now();const run=(now:number)=>{const p=Math.min((now-t0)/2000,1);const ease=1-Math.pow(1-p,4);setV(Math.round(ease*n));if(p<1)requestAnimationFrame(run)};requestAnimationFrame(run)}
    },{threshold:.5})
    if(ref.current)obs.observe(ref.current);return ()=>obs.disconnect()
  },[n])
  return <span ref={ref}>{v.toLocaleString('fr-FR')}{sfx}</span>
}

function SLabel({children}:{children:React.ReactNode}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-4 rounded-full" style={{background:'#DCF763'}} />
      <span className="text-xs font-black uppercase tracking-[3px]" style={{color:'rgba(220,247,99,.6)'}}>{children}</span>
    </div>
  )
}

const PILLARS = [
  {emoji:'🏆',tag:'Concours',href:'/concours',color:'#F59E0B',title:'Compétis.\nGagne.\nGrandis.',desc:'Un concours national 4 phases. Vote public, jury expert, Grande Finale à Douala. Jusqu\'à 2 000 000 FCFA à remporter.',cta:'Voir le concours',kpi:{v:'3 500+',l:'Projets soumis'}},
  {emoji:'👨\u200d🏫',tag:'Mentor Market',href:'/mentors',color:'#8B5CF6',title:'Apprends\ndes meilleurs.',desc:'+200 mentors vérifiés dans tous les secteurs. Sessions 1-to-1 payées en Mobile Money. Finance, Tech, BTP, Santé, AgriTech.',cta:'Trouver un mentor',kpi:{v:'1 342',l:'Sessions ce mois'}},
  {emoji:'⚡',tag:'YouthIn Index™',href:'#index',color:'#DCF763',title:'Ton score\nde crédibilité.',desc:'De 0 à 1000 pts sur 4 piliers. Reconnu par les banques partenaires. Rapport officiel PDF transmissible.',cta:"Comprendre l'Index",kpi:{v:'891',l:'Score Elite max'}},
  {emoji:'🏘️',tag:'Villages™',href:'/communaute',color:'#14B8A6',title:'Ta\ncommunauté\nlocale.',desc:"Rejoins le Village™ de ton quartier, ta ville, ton secteur. Publie. Partage. Attire l'équipe YouthIn.",cta:'Rejoindre',kpi:{v:'12 847',l:'Membres actifs'}},
]

const LEVELS = [
  {emoji:'🥉',label:'Bronze',range:'0–199',color:'#CD7F32',w:'20%',desc:'Voter · Villages™ · Feed communautaire'},
  {emoji:'🥈',label:'Silver',range:'200–399',color:'#9E9E9E',w:'40%',desc:'Soumettre au concours · Formations avancées'},
  {emoji:'🥇',label:'Gold',range:'400–599',color:'#F59E0B',w:'60%',desc:'Mentor certifié · Badge vérifié sur le profil'},
  {emoji:'💎',label:'Platinum',range:'600–799',color:'#A78BFA',w:'80%',desc:'Rapport bancaire PDF · Dossier investisseurs'},
  {emoji:'⚡',label:'Elite',range:'800–1000',color:'#DCF763',w:'100%',desc:'Jury concours · Featured · Transmis aux banques'},
]

const TESTIMONIALS = [
  {name:'Fatima Mbarga',loc:'Yaoundé · AgriTech',lvl:'Gold · 521 pts',init:'FM',color:'#F59E0B',q:"En 3 mois, mon projet AgriConnect a reçu 3 847 votes. J'ai signé mon premier partenariat commercial. YouthIn m'a donné la visibilité que je n'avais pas."},
  {name:'Arnauld Kodo',loc:'Mentor Elite · 87 sessions',lvl:'Elite · 891 pts',init:'AK',color:'#DCF763',q:"La qualité des entrepreneurs camerounais m'impressionne. Ce qu'il leur manque, c'est l'accès. YouthIn est exactement cet accès."},
  {name:'Donald Baliaba',loc:'Douala · Tech/Digital',lvl:'Gold · 642 pts',init:'DB',color:'#8B5CF6',q:"Grâce au YouthIn Index™, une banque partenaire m'a accordé un microcrédit sans collatéral. Mon score a parlé pour moi."},
]

const LEADERBOARD = [
  {rank:1,name:'AgriConnect Cameroun',founder:'Fatima Mbarga',sector:'AgriTech',votes:3847,delta:'+284',color:'#F59E0B',av:'FM'},
  {rank:2,name:'TechServices BTP',founder:'Donald Baliaba',sector:'Tech/Digital',votes:2841,delta:'+156',color:'#DCF763',av:'DB'},
  {rank:3,name:'MediCam Téléconsult.',founder:'Dr. Sarah Fotso',sector:'Santé',votes:2103,delta:'+98',color:'#EC4899',av:'SF'},
  {rank:4,name:'EcoTextile Cameroun',founder:'Amina Ngassa',sector:'Mode',votes:1924,delta:'+67',color:'#8B5CF6',av:'AN'},
  {rank:5,name:'SolarKit Rural',founder:'E. Tchouata',sector:'Énergie',votes:1587,delta:'+45',color:'#14B8A6',av:'ET'},
]

const VILLAGES_LIVE = [
  {name:"Village™ Makepe",city:'Douala',members:342,active:89,type:'Quartier',color:'#DCF763',trend:true},
  {name:'YouthIn Yaoundé',city:'Yaoundé',members:2847,active:421,type:'Ville',color:'#F59E0B',trend:true},
  {name:'Tech/Digital Cameroun',city:'National',members:1876,active:312,type:'Secteur',color:'#8B5CF6',trend:false},
  {name:"Village™ Akwa",city:'Douala',members:218,active:54,type:'Quartier',color:'#14B8A6',trend:false},
  {name:'AgriTech Cameroun',city:'National',members:934,active:187,type:'Secteur',color:'#EC4899',trend:true},
  {name:'YouthIn Bafoussam',city:'Bafoussam',members:1124,active:203,type:'Ville',color:'#F59E0B',trend:false},
]

const ROADMAP = [
  {date:'Déc 2024',event:'Fondation YouthIn',desc:'Création de l\'équipe fondatrice à Douala. Début du développement app + site.',done:true,color:'#22C55E'},
  {date:'Fév 2025',event:'Beta privée',desc:'500 membres testeurs. Villages™ pilotes à Douala et Yaoundé.',done:true,color:'#22C55E'},
  {date:'Oct 2025',event:'Lancement officiel',desc:'App sur App Store + Google Play. 5 000 membres en 30 jours.',done:true,color:'#22C55E'},
  {date:'Fév 2026',event:'Concours Season 1',desc:'Ouverture soumissions. 847 projets en 28 jours. Record absolu.',done:true,color:'#DCF763'},
  {date:'30 Avr 2026',event:'Grande Finale',desc:'Cérémonie à Douala. 5 finalistes. 3 750 000 FCFA distribués. Live national.',done:false,color:'#F59E0B'},
  {date:'S2 2026',event:'Expansion Nationale',desc:'8 nouvelles villes. 50 000 membres cibles. Tontine Smart lancée.',done:false,color:'#8B5CF6'},
  {date:'2027',event:'YouthIn Afrique',desc:"Expansion vers la Côte d'Ivoire et le Sénégal. Standard africain entrepreneurial.",done:false,color:'#A78BFA'},
]

const TRUST = [
  {Icon:Shield,label:'Mentors vérifiés',desc:'Chaque mentor est validé par l\'équipe YouthIn avant publication.'},
  {Icon:CheckCircle,label:'Milestones validés',desc:'Validés par 3 pairs Platinum/Elite — jamais auto-déclarés.'},
  {Icon:TrendingUp,label:'Score en temps réel',desc:'Le YouthIn Index™ se met à jour à chaque action concrète.'},
  {Icon:Clock,label:'Support 6j/7',desc:"L'équipe YouthIn répond en moins de 24h à chaque message."},
]

const FAQ_DATA = [
  {q:'YouthIn est-il gratuit ?',a:"L'app est entièrement gratuite. Les sessions mentor sont payantes (tarif fixé par le mentor). La soumission au concours est gratuite. Les votes sur le site coûtent 75 FCFA. Dans l'app, le vote est gratuit pour les membres vérifiés."},
  {q:'Comment fonctionne le YouthIn Index™ ?',a:"Score de 0 à 1000 pts sur 4 piliers : Régularité (20%), Résultats (40%), Réseau (15%) et Réputation (25%). Le score monte avec chaque action concrète — milestone validé, session mentor, participation concours, engagement communautaire."},
  {q:'Qui peut participer au concours ?',a:'Tout jeune de 18 à 28 ans de nationalité camerounaise ou résidant légalement au Cameroun, avec un compte YouthIn vérifié. 1 seul projet par participant. La soumission est gratuite.'},
  {q:"Qu'est-ce qu'un Village™ ?",a:"Un Village™ est un espace communautaire structuré avec chat, fil d'actu, événements et détection de talents. Il y a 4 types : National, Ville, Quartier et Secteur. Chaque Village™ a ses propres activités et rencontres physiques mensuelles."},
  {q:'Comment le YouthIn Index™ est reconnu par les banques ?',a:'Les membres Platinum et Elite peuvent générer un rapport PDF officiel avec QR code de vérification. Ce rapport est transmissible aux banques partenaires qui acceptent comme preuve de crédibilité entrepreneuriale sans collatéral.'},
  {q:"Comment rejoindre l'équipe YouthIn ?",a:'YouthIn recrute des ambassadeurs dans chaque ville. Les membres Elite avec un fort engagement sont prioritairement approchés. Contactez-nous via careers@youthin.cm'},
]

const MQ = ['🇨🇲 Cameroun','🏆 3 750 000 FCFA','⚡ YouthIn Index™','🏘️ Villages™','👨‍🏫 Mentor Market','🌍 12 847 Membres','📈 Concours Season 1','🥇 Grande Finale Douala','💎 Platinum · Elite','🚀 Entrepreneuriat Africain','🎯 Milestones validés','🤝 Mentor certifié','📱 App gratuite']

export default function Home() {
  useReveal()
  const [openFaq,setOpenFaq]=useState<number|null>(null)
  const reducedMotion = useReducedMotion()
  const coarsePointer = useCoarsePointer()
  const customCursorEnabled = !reducedMotion && !coarsePointer

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{backgroundColor:'#030303',cursor:customCursorEnabled?'none':'auto',fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`${G}
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
          .rv { opacity: 1 !important; transform: none !important; }
        }
        @media (hover: none), (pointer: coarse) {
          .cd, .cr { display: none !important; }
        }
      `}</style>
      {customCursorEnabled && <Cursor />}
      <Header />

      {/* === 1. HERO === */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
        <NetCanvas />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 right-0 h-px" style={{background:'rgba(220,247,99,.06)',animation:'scanline 9s linear infinite'}} />
          <div className="absolute top-24 left-[14%] w-52 h-52 rounded-full blur-[90px] heroOrb" style={{background:'rgba(220,247,99,.08)'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]" style={{background:'radial-gradient(ellipse,rgba(220,247,99,.055) 0%,transparent 65%)'}} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px]" style={{background:'radial-gradient(ellipse at 100% 100%,rgba(139,92,246,.05) 0%,transparent 60%)'}} />
          <div className="absolute -bottom-10 left-[8%] w-[420px] h-[420px] rounded-full blur-[120px]" style={{background:'radial-gradient(circle,rgba(245,158,11,.07),transparent 70%)'}} />
          <div className="absolute inset-0 opacity-[.026]" style={{backgroundImage:'linear-gradient(rgba(220,247,99,1) 1px,transparent 1px),linear-gradient(90deg,rgba(220,247,99,1) 1px,transparent 1px)',backgroundSize:'72px 72px'}} />
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 80% at 50% 50%,transparent 40%,rgba(3,3,3,.75) 100%)'}} />
        </div>
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_430px] gap-20 items-center">
            <div>
              <div className="hs inline-flex items-center gap-3 mb-8 border border-zinc-800/70 rounded-full px-5 py-2.5 backdrop-blur-sm" style={{background:'rgba(255,255,255,.025)'}}>
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                <span className="text-zinc-500 text-sm">Concours 2026 · <span className="text-emerald-400 font-medium">Phase Vote en cours</span></span>
              </div>
              <div className="mb-7">
                <h1 className="h1 fd" style={{fontSize:'clamp(54px,8vw,108px)',fontWeight:700,lineHeight:.88,letterSpacing:'-.03em',color:'#fff'}}>
                  L'entrepreneuriat,
                  <span className="h2 sy block" style={{marginTop:'.07em'}}>c'est pour toi.</span>
                </h1>
              </div>
              <div className="hs">
                <p className="text-xl text-zinc-300 leading-relaxed mb-3 max-w-xl" style={{fontWeight:300}}>La première plateforme qui transforme les jeunes Camerounais de 18 à 28 ans en entrepreneurs accomplis.</p>
                <p className="text-sm text-zinc-500 mb-10 tracking-wide">Concours · Mentor Market · YouthIn Index™ · Villages™</p>
              </div>
              <div className="hc flex flex-wrap gap-4 mb-14">
                <Link
                  href="/soumettre"
                  className="group relative flex items-center gap-3 fd font-semibold text-black text-base px-9 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(220,247,99,.35)]"
                  style={{background:'#DCF763',animation:'pulseBtn 3.5s ease-in-out infinite 2s'}}
                >
                  <span className="relative z-10">Soumettre un projet</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)',animation:'shimmer 1.4s linear infinite'}} />
                </Link>
                <Link href="/voter" className="flex items-center gap-2 text-zinc-300 font-medium text-base px-8 py-4 rounded-2xl border border-zinc-700/90 bg-zinc-900/45 hover:border-zinc-500 hover:text-white transition-all">Voter pour un projet</Link>
              </div>
              <div className="hs flex flex-wrap gap-2.5 mb-12">
                {[
                  '⚡ Accès gratuit à l’app',
                  '🏆 Finale nationale à Douala',
                  '🤝 Mentors vérifiés',
                ].map((chip) => (
                  <span key={chip} className="heroChip rounded-full px-3.5 py-1.5 text-xs text-zinc-300 tracking-wide">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="hp flex items-center gap-5">
                <div className="flex -space-x-2.5">
                  {['#DCF763','#8B5CF6','#F59E0B','#14B8A6','#EC4899'].map((c,i)=>(
                    <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black text-black" style={{backgroundColor:c,borderColor:'#030303'}}>{['F','A','D','K','M'][i]}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><Star key={i} size={12} className="fill-[#DCF763] text-[#DCF763]" />)}</div>
                  <p className="text-zinc-600 text-xs tracking-wide">+12 000 entrepreneurs · Douala · Yaoundé · Bafoussam</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block" style={{animation:'fadeUp 1s ease .9s both'}}>
              <div className="relative heroSoftFloat" style={{animationDelay:'1s'}}>
                <div className="absolute inset-0 rounded-3xl blur-[70px] scale-110 pointer-events-none" style={{background:'rgba(220,247,99,.07)'}} />
                <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{background:'linear-gradient(120deg,rgba(220,247,99,.35),rgba(220,247,99,0),rgba(139,92,246,.34))',opacity:.38}} />
                <div className="relative rounded-3xl overflow-hidden heroPanel">
                  <div className="px-4 py-3 border-b flex items-center justify-between" style={{borderColor:'rgba(255,255,255,.08)'}}>
                    <span className="text-[10px] uppercase tracking-[3px] font-black" style={{color:'rgba(220,247,99,.68)'}}>Dashboard Live</span>
                    <span className="text-[10px] text-zinc-500">Douala · Yaoundé</span>
                  </div>
                  <div className="aspect-[4/3] relative">
                    <Image src="/hero-1.jpg" alt="Jeunes entrepreneurs YouthIn" fill className="object-cover opacity-50" priority />
                    <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(3,3,3,1) 0%,rgba(3,3,3,.25) 50%,transparent 100%)'}} />
                    <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(220,247,99,.012) 2px,rgba(220,247,99,.012) 4px)'}} />
                  </div>
                  <div className="p-4 space-y-2.5">
                    {[{l:'Entrepreneurs actifs',v:'12 847',d:'+284 / sem.',c:'#22C55E'},{l:'Sessions mentor ce mois',v:'1 342',d:'+18%',c:'#22C55E'}].map(({l,v,d,c})=>(
                      <div key={l} className="flex items-center justify-between px-4 py-3 rounded-2xl border" style={{background:'rgba(255,255,255,.04)',borderColor:'rgba(255,255,255,.06)'}}>
                        <div><p className="text-zinc-600 text-xs mb-0.5">{l}</p><p className="fd font-semibold text-lg text-white leading-none">{v}</p></div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{color:c,background:`${c}15`,border:`1px solid ${c}25`}}>{d}</span>
                      </div>
                    ))}
                    <div className="px-4 pt-1.5 pb-2.5 rounded-2xl border" style={{background:'rgba(220,247,99,.04)',borderColor:'rgba(220,247,99,.16)'}}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-zinc-400 text-xs">Progression concours</p>
                        <p className="text-[#DCF763] text-xs font-semibold">78%</p>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.08)'}}>
                        <div className="h-full rounded-full" style={{width:'78%',background:'linear-gradient(90deg,#DCF763,rgba(220,247,99,.45))'}} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 rounded-2xl px-4 py-3 shadow-2xl" style={{background:'#DCF763'}}>
                  <p className="text-black text-[10px] fd font-semibold uppercase tracking-widest">Phase en cours</p>
                  <p className="text-black fd font-semibold text-base leading-tight">Vote Public 🗳️</p>
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 border" style={{background:'rgba(139,92,246,.14)',borderColor:'rgba(139,92,246,.28)'}}>
                  <p className="text-[#A78BFA] text-[10px] fd uppercase tracking-widest mb-0.5">YouthIn Index™</p>
                  <p className="text-white fd font-semibold text-sm">891 pts · Elite ⚡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{animation:'fadeUp .8s ease 1.3s both'}}>
          <div className="w-px h-12" style={{background:'linear-gradient(to bottom,transparent,rgba(220,247,99,.35),transparent)'}} />
          <p className="text-zinc-600 text-[10px] tracking-[3px] uppercase">Scroll pour découvrir</p>
        </div>
      </section>

      {/* === 2. MARQUEE === */}
      <div className="border-y overflow-hidden py-3.5" style={{borderColor:'rgba(220,247,99,.07)'}}>
        <p className="sr-only">Points clés YouthIn: concours, index de crédibilité, villages communautaires et mentorat.</p>
        <div className="flex whitespace-nowrap">
          <div className="mq flex gap-12 items-center pr-12" aria-hidden="true">
            {[...MQ,...MQ].map((item,i)=><span key={i} className="text-sm font-semibold tracking-widest" style={{color:i%2===0?'rgba(220,247,99,.7)':'rgba(255,255,255,.18)'}}>{item}</span>)}
          </div>
        </div>
      </div>

      {/* === 3. STATS === */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b" style={{borderColor:'rgba(255,255,255,.04)',background:'rgba(255,255,255,.013)'}}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{n:12847,s:'',l:'Entrepreneurs',sub:'inscrits'},{n:3500,s:'+',l:'Projets',sub:'soumis'},{n:200,s:'+',l:'Mentors',sub:'vérifiés'},{n:10,s:'',l:'Régions',sub:'couvertes'}].map(({n,s,l,sub},i)=>(
            <div key={i} className="rv text-center" style={{transitionDelay:`${i*.1}s`}}>
              <p className="fd tabular-nums mb-1 leading-none" style={{fontSize:'clamp(34px,5vw,54px)',fontWeight:700,color:'#DCF763',letterSpacing:'-.04em'}}><Count n={n} sfx={s} /></p>
              <p className="text-white font-medium text-sm mt-1">{l}</p><p className="text-zinc-600 text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === 4. CLASSEMENT EN DIRECT === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <SLabel>Concours Season 1 · En direct</SLabel>
              <h2 className="fd text-white" style={{fontSize:'clamp(36px,5vw,64px)',fontWeight:700,lineHeight:.95,letterSpacing:'-.03em'}}>Top 5 du classement<br /><span style={{color:'#DCF763'}}>en ce moment.</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
              <div className="flex items-center gap-2 text-sm" style={{color:'rgba(220,247,99,.7)'}}>
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                Mise à jour en temps réel
              </div>
              <Link href="/voter" className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-all">Voir le classement complet <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="space-y-3 rv" style={{transitionDelay:'.1s'}}>
            {LEADERBOARD.map((p,i)=>(
              <div key={i} className={`group flex items-center gap-5 px-6 py-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${i===0?'lborder':''}`}
                style={{background:i===0?'rgba(220,247,99,.04)':'rgba(255,255,255,.025)',borderColor:i===0?'transparent':'rgba(255,255,255,.07)'}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center fd font-semibold text-sm flex-shrink-0"
                  style={{background:i<3?`${p.color}20`:'rgba(255,255,255,.05)',color:i<3?p.color:'#888'}}>
                  {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${p.rank}`}
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black flex-shrink-0" style={{background:p.color}}>{p.av}</div>
                <div className="flex-1 min-w-0">
                  <p className="fd font-semibold text-white text-sm truncate">{p.name}</p>
                  <p className="text-zinc-600 text-xs">{p.founder} · {p.sector}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="fd font-semibold text-white">{p.votes.toLocaleString('fr-FR')}</p>
                  <p className="text-xs" style={{color:'#22C55E'}}>{p.delta} aujourd'hui</p>
                </div>
                <div className="w-24 hidden md:block">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.06)'}}>
                    <div className="h-full rounded-full" style={{width:`${(p.votes/3847)*100}%`,background:p.color}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rv" style={{transitionDelay:'.3s'}}>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-600">
              <span>🗳️ Sur le site : <span className="text-white font-semibold">75 FCFA / vote</span></span>
              <span className="text-zinc-800">·</span>
              <span>📱 Dans l'app : <span style={{color:'#DCF763'}} className="font-semibold">Gratuit</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* === 5. PILIERS === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 border-t" style={{borderColor:'rgba(255,255,255,.04)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="rv text-center mb-20">
            <SLabel>L'écosystème complet</SLabel>
            <h2 className="fd mb-5 text-white" style={{fontSize:'clamp(36px,6vw,72px)',fontWeight:700,lineHeight:1,letterSpacing:'-.03em'}}>Tout ce dont tu as besoin<br /><span style={{color:'#DCF763'}}>pour réussir.</span></h2>
            <p className="text-zinc-500 text-xl max-w-xl mx-auto" style={{fontWeight:300}}>YouthIn n'est pas juste une app. C'est un écosystème complet pensé pour l'entrepreneur camerounais.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {PILLARS.map((p,i)=>(
              <Link key={i} href={p.href}>
                <div className="group relative rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 cg rv"
                  style={{borderColor:'rgba(255,255,255,.06)',background:`linear-gradient(135deg,${p.color}10,${p.color}04)`,transitionDelay:`${i*.08}s`}}>
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:`linear-gradient(90deg,transparent,${p.color},transparent)`}} />
                  <div className="absolute top-0 right-0 w-52 h-52 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background:`radial-gradient(circle at top right,${p.color}14,transparent 70%)`}} />
                  <div className="p-9 sm:p-12">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl" style={{display:'inline-block',animation:`floatCard ${4+i*.6}s ease-in-out infinite ${i*.4}s`}}>{p.emoji}</span>
                        <span className="text-xs font-black uppercase tracking-[3px] px-3 py-1.5 rounded-full border" style={{color:p.color,borderColor:`${p.color}30`,background:`${p.color}10`}}>{p.tag}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:bg-white/5 transition-all" style={{borderColor:'rgba(255,255,255,.1)'}}>
                        <ArrowRight size={15} className="text-zinc-700 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                    <h3 className="fd mb-4 whitespace-pre-line text-white" style={{fontSize:'clamp(22px,3vw,34px)',fontWeight:700,letterSpacing:'-.02em',lineHeight:1.05}}>{p.title}</h3>
                    <p className="text-zinc-500 leading-relaxed mb-8" style={{fontWeight:300}}>{p.desc}</p>
                    <div className="flex items-end justify-between">
                      <div><p className="fd font-semibold text-2xl" style={{color:p.color}}>{p.kpi.v}</p><p className="text-zinc-700 text-xs mt-0.5">{p.kpi.l}</p></div>
                      <p className="text-sm font-semibold flex items-center gap-1.5" style={{color:p.color}}>{p.cta}<ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === 6. INDEX™ === */}
      <section id="index" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 border-y pointer-events-none" style={{borderColor:'rgba(220,247,99,.04)',background:'rgba(255,255,255,.01)'}} />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(220,247,99,.032) 0%,transparent 60%)'}} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="rv">
              <SLabel>YouthIn Index™</SLabel>
              <h2 className="fd mb-6" style={{fontSize:'clamp(34px,5vw,60px)',fontWeight:700,lineHeight:1,letterSpacing:'-.03em'}}>
                <span className="text-white">La cote de crédibilité</span><br /><span style={{color:'#DCF763'}}>entrepreneuriale.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5 max-w-lg" style={{fontWeight:300}}>Là où les banques refusent les jeunes faute d'historique financier, le YouthIn Index™ crée cet historique — basé sur le comportement réel, pas sur des garanties matérielles.</p>
              <p className="text-zinc-600 leading-relaxed mb-12 max-w-lg">Score 0–1000 pts · 4 piliers : Régularité, Résultats, Réseau, Réputation. Reconnu par les banques partenaires.</p>
              <div className="flex flex-wrap gap-3">
                {[['1 000','Score max'],['4R','Piliers'],['PDF','Rapport Platinum+'],['3×','Banques partenaires']].map(([v,l])=>(
                  <div key={l} className="rounded-2xl border px-5 py-4" style={{background:'rgba(255,255,255,.03)',borderColor:'rgba(255,255,255,.07)'}}>
                    <p className="fd font-semibold text-2xl text-white">{v}</p><p className="text-zinc-600 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2.5 rv" style={{transitionDelay:'.2s'}}>
              {LEVELS.map((lvl,i)=>(
                <div key={i} className="group flex items-center gap-5 rounded-2xl border px-5 py-4 transition-all duration-300 cursor-default hover:-translate-x-1"
                  style={{background:'rgba(255,255,255,.025)',borderColor:'rgba(255,255,255,.06)'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=`${lvl.color}40`)}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,.06)')}>
                  <span className="text-2xl flex-shrink-0">{lvl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <p className="fd font-semibold text-white text-sm">{lvl.label}</p>
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{color:lvl.color,background:`${lvl.color}15`}}>{lvl.range} pts</span>
                    </div>
                    <p className="text-zinc-600 text-xs">{lvl.desc}</p>
                  </div>
                  <div className="w-20 h-1 rounded-full flex-shrink-0 overflow-hidden" style={{background:'rgba(255,255,255,.06)'}}>
                    <div className="h-full rounded-full bar" style={{width:lvl.w,background:lvl.color,'--d':`${.3+i*.08}s`} as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === 7. VILLAGES EN DIRECT === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <SLabel>Communauté · Villages™</SLabel>
              <h2 className="fd text-white" style={{fontSize:'clamp(36px,5vw,64px)',fontWeight:700,lineHeight:.95,letterSpacing:'-.03em'}}>Ton Village™<br /><span style={{color:'#DCF763'}}>t'attend.</span></h2>
            </div>
            <Link href="/communaute" className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white transition-all">Explorer tous les Villages™ <ArrowRight size={14} /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 rv" style={{transitionDelay:'.1s'}}>
            {VILLAGES_LIVE.map((v,i)=>(
              <div key={i} className="group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{background:`linear-gradient(135deg,${v.color}08,rgba(255,255,255,.02))`,borderColor:'rgba(255,255,255,.07)'}}>
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{background:`linear-gradient(90deg,transparent,${v.color},transparent)`}} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{color:v.color,background:`${v.color}15`}}>{v.type}</span>
                        {v.trend&&<span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><TrendingUp size={11} />Trending</span>}
                      </div>
                      <h3 className="fd font-semibold text-white text-sm mt-1">{v.name}</h3>
                      <p className="text-zinc-600 text-xs">{v.city}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#22C55E'}} />
                      <span className="text-xs text-emerald-400 font-semibold">{v.active} actifs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-600 text-xs"><span className="text-zinc-300 font-semibold">{v.members.toLocaleString('fr-FR')}</span> membres</p>
                    <div className="w-20 h-1 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.06)'}}>
                      <div className="h-full rounded-full" style={{width:`${Math.min((v.active/v.members)*100*3,100)}%`,background:v.color}} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 8. ROADMAP === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 border-y" style={{borderColor:'rgba(255,255,255,.04)',background:'rgba(255,255,255,.01)'}}>
        <div className="max-w-5xl mx-auto">
          <div className="rv text-center mb-16">
            <SLabel>Historique & Vision</SLabel>
            <h2 className="fd text-white" style={{fontSize:'clamp(36px,5vw,64px)',fontWeight:700,lineHeight:.95,letterSpacing:'-.03em'}}>Notre parcours.<br /><span style={{color:'#DCF763'}}>Notre cap.</span></h2>
          </div>
          <div className="relative rv" style={{transitionDelay:'.1s'}}>
            <div className="absolute left-[21px] top-0 bottom-0 w-px" style={{background:'linear-gradient(to bottom,transparent,rgba(220,247,99,.2),rgba(220,247,99,.1),transparent)'}} />
            <div className="space-y-0">
              {ROADMAP.map((item,i)=>(
                <div key={i} className="flex gap-8 group">
                  <div className="flex flex-col items-center flex-shrink-0" style={{width:42}}>
                    <div className="relative w-[18px] h-[18px] rounded-full border-2 mt-1.5 z-10 transition-all duration-300 group-hover:scale-125 flex-shrink-0"
                      style={{borderColor:item.color,background:item.done?item.color:'#030303'}}>
                      {item.done&&<div className="absolute inset-0 rounded-full animate-pulse" style={{background:`${item.color}30`}} />}
                    </div>
                  </div>
                  <div className={`pb-10 flex-1 ${i===ROADMAP.length-1?'pb-0':''}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{color:item.color}}>{item.date}</span>
                      {item.done?<span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">Accompli</span>:<span className="text-xs font-bold text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-md">À venir</span>}
                    </div>
                    <h3 className="fd font-semibold text-white mb-1.5">{item.event}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed" style={{fontWeight:300}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === 9. TÉMOIGNAGES === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rv flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SLabel>Témoignages</SLabel>
              <h2 className="fd text-white" style={{fontSize:'clamp(38px,6vw,72px)',fontWeight:700,letterSpacing:'-.03em',lineHeight:.95}}>Ce qu'ils<br />disent.</h2>
            </div>
            <p className="text-zinc-600 max-w-xs" style={{fontWeight:300}}>Des entrepreneurs réels. Des résultats réels. Pas du marketing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="group relative rounded-3xl border overflow-hidden transition-all duration-400 hover:-translate-y-2 cg rv"
                style={{background:'rgba(255,255,255,.025)',borderColor:'rgba(255,255,255,.07)',transitionDelay:`${i*.1}s`}}>
                <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{background:`linear-gradient(to bottom,${t.color}08,transparent)`}} />
                <div className="absolute top-5 right-6 fd leading-none select-none pointer-events-none" style={{fontSize:80,color:`${t.color}10`,fontWeight:700}}>"</div>
                <div className="relative p-8">
                  <div className="flex gap-0.5 mb-6">{[...Array(5)].map((_,j)=><Star key={j} size={13} className="fill-[#DCF763] text-[#DCF763]" />)}</div>
                  <p className="text-zinc-300 leading-relaxed mb-8 relative z-10" style={{fontWeight:300}}>"{t.q}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t" style={{borderColor:'rgba(255,255,255,.06)'}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black flex-shrink-0" style={{background:t.color}}>{t.init}</div>
                    <div className="min-w-0 flex-1"><p className="fd font-semibold text-white text-sm">{t.name}</p><p className="text-zinc-700 text-xs truncate">{t.loc}</p></div>
                    <span className="text-xs font-bold px-2.5 py-1.5 rounded-xl flex-shrink-0" style={{color:t.color,background:`${t.color}12`}}>{t.lvl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 10. CONFIANCE === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 border-y" style={{borderColor:'rgba(255,255,255,.04)',background:'rgba(255,255,255,.01)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="rv text-center mb-14">
            <SLabel>Pourquoi nous faire confiance</SLabel>
            <h2 className="fd text-white" style={{fontSize:'clamp(32px,4vw,54px)',fontWeight:700,letterSpacing:'-.03em'}}>Construit pour durer.<br /><span style={{color:'#DCF763'}}>Conçu pour toi.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 rv" style={{transitionDelay:'.1s'}}>
            {TRUST.map(({Icon,label,desc},i)=>(
              <div key={i} className="group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 cg"
                style={{background:'rgba(255,255,255,.02)',borderColor:'rgba(255,255,255,.07)'}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{background:'rgba(220,247,99,.1)',border:'1px solid rgba(220,247,99,.2)'}}>
                  <Icon size={18} color="#DCF763" />
                </div>
                <h3 className="fd font-semibold text-white text-sm mb-2">{label}</h3>
                <p className="text-zinc-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 11. FAQ === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rv text-center mb-14">
            <SLabel>Questions fréquentes</SLabel>
            <h2 className="fd text-white" style={{fontSize:'clamp(32px,5vw,58px)',fontWeight:700,letterSpacing:'-.03em',lineHeight:.95}}>Tu as des<br /><span style={{color:'#DCF763'}}>questions ?</span></h2>
          </div>
          <div className="space-y-3 rv" style={{transitionDelay:'.1s'}}>
            {FAQ_DATA.map((item,i)=>(
              <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{background:openFaq===i?'rgba(220,247,99,.04)':'rgba(255,255,255,.025)',borderColor:openFaq===i?'rgba(220,247,99,.2)':'rgba(255,255,255,.07)'}}>
                <button
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
                  onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  aria-expanded={openFaq===i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                >
                  <p className="fd font-semibold text-white text-sm leading-relaxed">{item.q}</p>
                  <div className="flex-shrink-0 transition-transform duration-300" style={{transform:openFaq===i?'rotate(180deg)':'none'}}>
                    <ChevronDown size={16} color={openFaq===i?'#DCF763':'#666'} />
                  </div>
                </button>
                {openFaq===i&&(
                  <div className="px-6 pb-6 border-t" style={{borderColor:'rgba(220,247,99,.1)'}} id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`}>
                    <p className="text-zinc-400 text-sm leading-relaxed pt-4" style={{fontWeight:300}}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 12. CTA FINAL === */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px]" style={{background:'radial-gradient(ellipse,rgba(220,247,99,.055) 0%,transparent 60%)'}} />
          <div className="absolute inset-0 opacity-[.018]" style={{backgroundImage:'linear-gradient(rgba(220,247,99,1) 1px,transparent 1px)',backgroundSize:'100% 56px'}} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="rv relative rounded-[40px] border overflow-hidden" style={{borderColor:'rgba(220,247,99,.12)',background:'rgba(255,255,255,.018)'}}>
            <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{background:'linear-gradient(90deg,transparent 0%,rgba(220,247,99,.85) 50%,transparent 100%)'}} />
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 rounded-tl-[40px]" style={{borderColor:'rgba(220,247,99,.18)'}} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 rounded-br-[40px]" style={{borderColor:'rgba(220,247,99,.18)'}} />
            <div className="px-8 sm:px-20 py-24 text-center">
              <p className="text-xs font-black uppercase tracking-[5px] mb-8" style={{color:'rgba(220,247,99,.45)'}}>Rejoins le mouvement</p>
              <h2 className="fd mb-8" style={{fontSize:'clamp(46px,8vw,96px)',fontWeight:700,letterSpacing:'-.04em',lineHeight:.9}}>
                <span className="text-white">Ta place</span><br /><span style={{color:'#DCF763'}}>est ici.</span>
              </h2>
              <p className="text-zinc-400 text-xl mb-14 max-w-lg mx-auto leading-relaxed" style={{fontWeight:300}}>+12 000 entrepreneurs te font déjà confiance. Télécharge l'app, crée ton compte, et commence à construire.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <Link href="/telecharger" className="group relative flex items-center gap-3 fd font-semibold text-black text-lg px-12 py-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(220,247,99,.4)]" style={{background:'#DCF763'}}>
                  <span className="relative z-10">Télécharger YouthIn — Gratuit</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)',animation:'shimmer 1.4s linear infinite'}} />
                </Link>
              </div>
              <div className="flex items-center justify-center gap-8 text-zinc-700 text-sm">
                {[{l:'App Store',d:'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'},{l:'Google Play',d:'M3.18 23.76c.3.17.64.17.94 0l11.24-6.42-2.37-2.37-9.81 8.79zm-1.76-20.5C1.18 3.6 1 4 1 4.56v14.88c0 .56.18.96.42 1.3l.09.08 8.33-8.33v-.2L1.42 3.26zm19.1 8.05-2.87-1.64-2.58 2.58 2.58 2.58 2.88-1.64c.82-.47.82-1.23 0-1.88zM4.12.24 15.36 6.66 12.99 9.03 3.18.24c.3-.18.64-.17.94 0z'}].map(({l,d})=>(
                  <div key={l} className="flex items-center gap-2 hover:text-zinc-400 transition-colors cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={d} /></svg><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}