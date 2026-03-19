'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Heart, Trophy } from 'lucide-react'

interface StatItem {
  label: string
  value: number
  icon: React.ReactNode
  suffix?: string
  color: string
}

export function LiveStats() {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: 'Active Users',
      value: 12847,
      icon: <Users size={28} />,
      color: 'text-blue-500',
    },
    {
      label: 'Projects Submitted',
      value: 3500,
      icon: <TrendingUp size={28} />,
      suffix: '+',
      color: 'text-accent',
    },
    {
      label: 'Total Votes',
      value: 125400,
      icon: <Heart size={28} />,
      suffix: '+',
      color: 'text-red-500',
    },
    {
      label: 'Prizes Distributed',
      value: 15,
      icon: <Trophy size={28} />,
      suffix: 'M FCFA',
      color: 'text-yellow-500',
    },
  ])

  const [displayValues, setDisplayValues] = useState(
    stats.map((s) => 0)
  )

  // Animate numbers counting up
  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      let current = 0
      const target = stat.value
      const increment = Math.ceil(target / 50)

      return setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(intervals[index])
        }
        setDisplayValues((prev) => {
          const newValues = [...prev]
          newValues[index] = current
          return newValues
        })
      }, 20)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="glass p-6 rounded-2xl hover-lift group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
              {stat.icon}
            </div>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {displayValues[i].toLocaleString('en-US')}
              {stat.suffix && (
                <span className="text-lg ml-1 text-accent">
                  {stat.suffix}
                </span>
              )}
            </p>
          </div>

          {/* Animated bar */}
          <div className="w-full h-1 bg-muted rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/50 rounded-full transition-all duration-500"
              style={{
                width: `${(displayValues[i] / stats[i].value) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
