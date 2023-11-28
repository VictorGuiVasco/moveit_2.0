'use client'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

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
          <title>Inicio | move.it</title>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}

export { HomePage }
