import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'

import styles from './styles.module.css'

function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/VictorGuiVasco.png" alt="Avatar" />
      <div>
        <strong>Victor Guilherme</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export { Profile }
