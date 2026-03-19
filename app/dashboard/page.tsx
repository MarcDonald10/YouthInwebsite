'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Heart, Upload, TrendingUp, Award, Clock, CheckCircle } from 'lucide-react'

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: 'Marc Tchamba',
    email: 'marc@example.com',
    joinDate: new Date('2023-06-15'),
    totalSpent: 125000,
    projectsSubmitted: 2,
    votesGiven: 47,
    index: 750,
    indexLevel: 'Silver',
  }

  const userProjects = [
    {
      id: '1',
      title: 'AgriTech: Smart Farming',
      status: 'verified',
      votes: 1245,
      submittedAt: new Date('2024-01-15'),
      amount: 10000,
    },
    {
      id: '2',
      title: 'HealthHub Platform',
      status: 'pending',
      votes: 0,
      submittedAt: new Date('2024-02-20'),
      amount: 10000,
    },
  ]

  const userVotes = [
    { projectId: '3', projectTitle: 'FinTech Wallet', voteDate: new Date(), amount: 75 },
    { projectId: '4', projectTitle: 'EduConnect', voteDate: new Date(), amount: 75 },
    { projectId: '2', projectTitle: 'HealthHub', voteDate: new Date(), amount: 75 },
  ]

  const indexLevelColor = {
    Bronze: 'from-orange-500 to-orange-600',
    Silver: 'from-gray-400 to-gray-500',
    Gold: 'from-yellow-400 to-yellow-500',
    Platinum: 'from-cyan-400 to-cyan-500',
    Elite: 'from-purple-500 to-pink-500',
  } as const

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <section className="px-4 md:px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Ton Tableau de Bord</h1>
            <p className="text-muted-foreground">
              Bienvenue {user.name}. Voici un aperçu de ton activité YouthIn.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-4 md:px-6 mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Index Card */}
            <div
              className={`glass p-6 rounded-2xl border border-accent/20 bg-gradient-to-br ${
                indexLevelColor[user.indexLevel as keyof typeof indexLevelColor]
              } opacity-20`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">YouthIn Index</p>
                  <p className="text-3xl font-bold text-accent">{user.index}</p>
                  <p className="text-sm text-accent font-semibold mt-2">
                    {user.indexLevel} Level
                  </p>
                </div>
                <Award className="text-accent" size={28} />
              </div>
            </div>

            {/* Projects Submitted */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Projets Soumis
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {user.projectsSubmitted}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Total: {user.projectsSubmitted * 10000} FCFA
                  </p>
                </div>
                <Upload className="text-accent" size={28} />
              </div>
            </div>

            {/* Votes Given */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Votes Given</p>
                  <p className="text-3xl font-bold text-foreground">
                    {user.votesGiven}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Total: {user.votesGiven * 75} FCFA
                  </p>
                </div>
                <Heart className="text-accent" size={28} />
              </div>
            </div>

            {/* Total Spent */}
            <div className="glass p-6 rounded-2xl hover-lift">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-accent">
                    {(user.totalSpent / 1000).toFixed(0)}K FCFA
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Since {user.joinDate.toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <TrendingUp className="text-accent" size={28} />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-4 md:px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Projects</h2>

            {userProjects.length === 0 ? (
              <div className="glass p-8 text-center rounded-2xl">
                <Upload className="text-muted-foreground mx-auto mb-4" size={40} />
                <p className="text-muted-foreground mb-4">No projects submitted yet</p>
                <a
                  href="/soumettre"
                  className="inline-block px-6 py-2 bg-accent hover:bg-accent/90 text-primary-foreground font-semibold rounded-lg transition-all hover-glow"
                >
                  Submit Your First Project
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="glass p-6 rounded-xl flex items-center justify-between hover-lift"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Submitted:{' '}
                          {project.submittedAt.toLocaleDateString('fr-FR')}
                        </span>
                        <span>Votes: {project.votes}</span>
                        <span>Cost: {project.amount} FCFA</span>
                      </div>
                    </div>

                    {project.status === 'verified' ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs font-semibold">
                        <CheckCircle size={14} />
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-semibold">
                        <Clock size={14} />
                        Pending
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Votes */}
        <section className="px-4 md:px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Recent Votes</h2>

            {userVotes.length === 0 ? (
              <div className="glass p-8 text-center rounded-2xl">
                <Heart className="text-muted-foreground mx-auto mb-4" size={40} />
                <p className="text-muted-foreground mb-4">No votes yet</p>
                <a
                  href="/voter"
                  className="inline-block px-6 py-2 bg-accent hover:bg-accent/90 text-primary-foreground font-semibold rounded-lg transition-all hover-glow"
                >
                  Start Voting
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {userVotes.map((vote, i) => (
                  <div
                    key={i}
                    className="glass p-4 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {vote.projectTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {vote.voteDate.toLocaleDateString('fr-FR')}{' '}
                        {vote.voteDate.toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                    <span className="font-semibold text-accent">
                      -{vote.amount} FCFA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
