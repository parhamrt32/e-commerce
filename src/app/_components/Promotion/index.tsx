'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7) // Set target date 7 days from now

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      const difference = Math.max(Number(targetDate) - Number(currentTime), 0)

      // Calculate remaining time in days, hours, minutes, and seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Set the timer state with the remaining time
      setTime({ days, hours, minutes, seconds })

      if (difference === 0) {
        clearInterval(interval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => clearInterval(interval) // Clean up the interval on unmount or dependency change
  }, [])
  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}> Deals of the Month </h3>
        <p>
          Get Ready for a shopping experience like never before with our Deals of the Month!
          Everyputchase come with exclusive perks and offers, making this month a celebration of
          savvy choices and amazing deals. Don't miss out!
        </p>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p> {label} </p>
  </li>
)

export default Promotion
