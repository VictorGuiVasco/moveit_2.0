import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'
import styles from './styles.module.css'

function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext)

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export { CompletedChallenges }
