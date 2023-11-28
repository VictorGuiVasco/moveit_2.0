import Image from 'next/image'
import { useContext } from 'react'

import { Rajdhani } from 'next/font/google'
import { CountdownContext } from '../../contexts/CountdownContext'

import styles from './styles.module.scss'

import circleImg from '/public/icons/check_circle.svg'
import playImg from '/public/icons/play_arrow.svg'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600'],
})

const totalTime = 0.1 * 60

function Countdown() {
  const {
    time,
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  var percentBar = (time / totalTime) * 100
  percentBar = (percentBar - 100) * -1
  console.log(percentBar)

  return (
    <>
      <div className={styles.countdownContainer}>
        <div className={rajdhani.className}>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span className={rajdhani.className}>:</span>

        <div className={rajdhani.className}>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado <Image src={circleImg} alt="" />
          <div style={{ width: '100%' }} className={styles.countDownBar} />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo &#10005;
              <div
                style={{ width: `${percentBar}%` }}
                className={styles.countDownBar}
              />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <Image src={playImg} alt="" />
            </button>
          )}
        </>
      )}
    </>
  )
}

export { Countdown }
