import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'
import { CountdownContext } from '../../contexts/CountdownContext'

import styles from './styles.module.scss'

function ChallengeBox() {
  const {
    activeChallenge,
    isWaitingChallenge,
    completeChallenge,
    resetChallenge,
  } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {isWaitingChallenge ? (
        <div className={styles.isWaitingChallenge}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="level-up" />
            Complete-os e ganhe experiência e avance de leve.
          </p>
        </div>
      ) : activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img
              src={`icons/${activeChallenge.type}.svg`}
              alt={activeChallenge.type}
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="level-up" />
            Avance de level completando os desafios.
          </p>
        </div>
      )}
    </div>
  )
}

export { ChallengeBox }
