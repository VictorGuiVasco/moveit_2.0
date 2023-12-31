import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../utils/challenges.json'
import { LevelUpModal } from '../components/'

interface Challenge {
  type: 'body' | 'eye' | string
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel: number
  isWaitingChallenge: boolean
  activeChallenge: Challenge | null
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
  setIsWaitingChallenge: (b: boolean) => void
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  )

  const [isWaitingChallenge, setIsWaitingChallenge] = useState(false)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp(experience: number, xpToNextLevel: number, level: number) {
    let tempLevel = level + 1
    experience = experience - experienceToNextLevel
    xpToNextLevel = Math.pow((tempLevel + 1) * 4, 2)

    if (experience >= xpToNextLevel) {
      levelUp(experience, xpToNextLevel, tempLevel)
    } else {
      setLevel(tempLevel)
      setIsLevelUpModalOpen(true)
    }
    return experience
  }

  function startNewChallenge() {
    const randomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallenge]

    setIsWaitingChallenge(false)
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', {
        body: `Valendo ${challenge.amount}xp`,
      })
    }
  }

  function completeChallenge() {
    if (!activeChallenge) return

    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = levelUp(finalExperience, experienceToNextLevel, level)
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        isWaitingChallenge,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
        setIsWaitingChallenge,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
