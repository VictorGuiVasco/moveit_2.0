import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'

import styles from './styles.module.css'

function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="fechar modal" />
        </button>
      </div>
    </div>
  )
}

export { LevelUpModal }
