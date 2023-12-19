import { cookies } from 'next/headers'
import { HomePage } from '@/presentation/pages/home'

export default function Home() {
  const data = cookies().getAll()

  const level = data.find((item) => item.name === 'level')
  const experience = data.find((item) => item.name === 'currentExperience')
  const challengesCompleted = data.find(
    (item) => item.name === 'challengesCompleted'
  )

  return (
    <HomePage
      level={level ? Number(level.value) : 0}
      currentExperience={experience ? Number(experience.value) : 0}
      challengesCompleted={
        challengesCompleted ? Number(challengesCompleted.value) : 0
      }
    />
  )
}
