import { useEffect, useState } from "react"

type CountUpProps = {
  target: number
  duration?: number
}

const CountUp = ({ target, duration = 2000 }: CountUpProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now() // Get the current time
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, duration])

  return (
    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
      {count}
    </h1>
  )
}

export default CountUp
