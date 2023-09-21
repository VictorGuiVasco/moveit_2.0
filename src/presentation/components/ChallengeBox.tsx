import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from './ChallengeBox.module.css'

function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } =
    useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFalied() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challegeActive}>
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
              className={styles.challengeFaliedButton}
              onClick={handleChallengeFalied}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.challengSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem conpletados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="level-up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  )
}

export default ChallengeBox
