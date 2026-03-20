import { useEffect, useState } from 'react'

import { animate } from 'motion'

/**
 * Animates a number from 0 to target with a smooth ease-out curve.
 * Returns the current animated value as a rounded integer.
 */
export function useAnimatedCounter(target: number, duration = 1.2): number {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [target, duration])

  return display
}
