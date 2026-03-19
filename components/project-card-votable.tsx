'use client'

import { useState } from 'react'
import { Heart, Share2, MessageCircle, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { VotePaymentModal } from './vote-payment-modal'

export interface Project {
  id: string
  title: string
  description: string
  category: string
  founderName: string
  image: string
  votes: number
  budget: number
  createdAt: Date
}

interface ProjectCardVotableProps {
  project: Project
  onVote?: (projectId: string, votes: number) => void
}

export function ProjectCardVotable({
  project,
  onVote,
}: ProjectCardVotableProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [currentVotes, setCurrentVotes] = useState(project.votes)
  const [hasVotedRecently, setHasVotedRecently] = useState(false)

  const handleVoteSuccess = () => {
    setCurrentVotes((prev) => prev + 1)
    setHasVotedRecently(true)
    onVote?.(project.id, currentVotes + 1)
    setTimeout(() => setHasVotedRecently(false), 24 * 60 * 60 * 1000) // 24h
  }

  return (
    <>
      <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/20 group">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-card">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => console.error('Image failed:', project.image)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-40"></div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-accent rounded-full">
              {project.category}
            </span>
          </div>

          {/* Vote Count Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
            <TrendingUp size={14} className="text-accent" />
            <span className="font-bold text-foreground">{currentVotes}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg text-foreground line-clamp-2 hover:text-accent transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          {/* Founder */}
          <p className="text-xs text-muted-foreground">
            by <span className="text-accent font-semibold">{project.founderName}</span>
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setIsVoteModalOpen(true)}
              disabled={hasVotedRecently}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all ${hasVotedRecently
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-accent text-primary-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-yellow-400/50'
                }`}
            >
              <Heart
                size={16}
                className={hasVotedRecently ? '' : 'group-hover:scale-110'}
              />
              Vote 75F
            </button>

            <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors">
              <Share2 size={16} className="text-muted-foreground" />
            </button>

            <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors">
              <MessageCircle size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Footer */}
          {hasVotedRecently && (
            <p className="text-xs text-accent text-center py-2 bg-accent/10 rounded-lg">
              You voted today. Come back in 24h to vote again!
            </p>
          )}
        </div>
      </div>

      {/* Vote Payment Modal */}
      <VotePaymentModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        projectTitle={project.title}
        projectId={project.id}
        onSuccess={handleVoteSuccess}
      />
    </>
  )
}
