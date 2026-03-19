'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TrendingUp, Users, Trophy, MessageSquare } from 'lucide-react'

export default function StatsPage() {
  const stats = [
    {
      icon: Users,
      label: 'Entrepreneurs',
      value: '12 847',
      change: '+234 ce mois',
      color: 'text-blue-500'
    },
    {
      icon: Trophy,
      label: 'Projets soumis',
      value: '3 500+',
      change: '+89 cette semaine',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      label: 'Mentors actifs',
      value: '247',
      change: '+12 nouveaux',
      color: 'text-green-500'
    },
    {
      icon: MessageSquare,
      label: 'Sessions mentorat',
      value: '1 342',
      change: 'Ce mois',
      color: 'text-purple-500'
    }
  ]

  const regions = [
    { name: 'Douala', count: 4312, percentage: 33.6 },
    { name: 'Yaoundé', count: 3847, percentage: 29.9 },
    { name: 'Bafoussam', count: 1923, percentage: 14.9 },
    { name: 'Kumba', count: 987, percentage: 7.7 },
    { name: 'Limbe', count: 567, percentage: 4.4 },
    { name: 'Autres régions', count: 1213, percentage: 9.4 }
  ]

  const sectors = [
    { name: 'Tech/Digital', count: 3421, color: 'bg-blue-500' },
    { name: 'AgriTech', count: 2156, color: 'bg-green-500' },
    { name: 'Mode & Beauté', count: 1987, color: 'bg-pink-500' },
    { name: 'E-commerce', count: 1834, color: 'bg-orange-500' },
    { name: 'Finance', count: 1567, color: 'bg-purple-500' },
    { name: 'Autres', count: 1882, color: 'bg-gray-500' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
          YouthIn en Chiffres
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          La croissance spectaculaire du mouvement entrepreneurial camerounais. Statistiques en direct.
        </p>
      </section>

      {/* Main Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:border-accent transition">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="text-accent" size={32} />
                  <div className="text-green-500 text-sm font-semibold">↑</div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <p className="text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-sm text-accent">{stat.change}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Par Région */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12">Répartition par Région</h2>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
          {regions.map((region, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{region.name}</span>
                <span className="text-accent font-bold">{region.count.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/50 rounded-full"
                  style={{ width: `${region.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{region.percentage}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Par Secteur */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12">Secteurs Représentés</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-4 h-4 rounded-full ${sector.color}`}></div>
                <span className="font-semibold text-foreground text-lg">{sector.name}</span>
              </div>
              <div className="text-3xl font-bold text-accent">{sector.count.toLocaleString()}</div>
              <p className="text-muted-foreground text-sm mt-2">
                {((sector.count / 12847) * 100).toFixed(1)}% de la communauté
              </p>
            </div>
          ))}
        </div>
      </section>

     

      {/* Mentor Market Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Mentor Market</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="text-5xl font-bold text-accent mb-2">247</div>
            <p className="text-muted-foreground">Mentors vérifiés</p>
            <p className="text-sm text-accent mt-3">+12 nouveaux ce mois</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="text-5xl font-bold text-accent mb-2">1 342</div>
            <p className="text-muted-foreground">Sessions ce mois</p>
            <p className="text-sm text-accent mt-3">+23% vs mois dernier</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="text-5xl font-bold text-accent mb-2">4.8★</div>
            <p className="text-muted-foreground">Note moyenne</p>
            <p className="text-sm text-accent mt-3">sur 8 200 avis</p>
          </div>
        </div>
      </section>

      {/* Live Counter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center bg-accent/10 border border-accent/20 rounded-3xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">En ce moment</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Les communautés YouthIn sont vivantes 24/7. Voici ce qui se passe maintenant :
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="animate-pulse">
            <div className="text-2xl font-bold text-accent">3</div>
            <p className="text-sm text-muted-foreground">votes actifs</p>
          </div>
          <div className="animate-pulse">
            <div className="text-2xl font-bold text-accent">12</div>
            <p className="text-sm text-muted-foreground">sessions mentorat</p>
          </div>
          <div className="animate-pulse">
            <div className="text-2xl font-bold text-accent">87</div>
            <p className="text-sm text-muted-foreground">posts publiés</p>
          </div>
          <div className="animate-pulse">
            <div className="text-2xl font-bold text-accent">234</div>
            <p className="text-sm text-muted-foreground">utilisateurs en ligne</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
