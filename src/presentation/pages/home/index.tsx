'use client'

import Head from 'next/head'

import { ChallengesProvider } from '../../contexts/ChallengeContext'
import { CountdownProvider } from '../../contexts/CountdownContext'

import {
  ChallengeBox,
  CompletedChallenges,
  Countdown,
  ExperienceBar,
  Profile,
} from '../../components'

import styles from './Home.module.scss'

interface HomePageProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

function HomePage(props: HomePageProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />

              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export { HomePage }
