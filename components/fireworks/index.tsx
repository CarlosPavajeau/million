import { create } from 'canvas-confetti'
import { createRef, useEffect, useState } from 'react'
import { styled } from '@nextui-org/react'

const StyledCanvas = styled('canvas', {
  background: '#f0f0f0',
  height: '100%',
  left: 0,
  pointerEvents: 'none',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: -1,
})

const randomInRange = (min: number, max: number): number => Math.random() * (max - min) + min

const Fireworks = () => {
  const refConfetti = createRef<HTMLCanvasElement>()
  const confetti = create(refConfetti.current as HTMLCanvasElement | undefined, {
    resize: true,
    useWorker: true
  })

  const [intervalId] = useState<NodeJS.Timeout | null>(null)

  const getAnimationSettings = (originXA: number, originXB: number) => {
    return {
      startVelocity: 30,
      spread: 360,
      zIndex: 0,
      particleCount: 150,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random() - 0.2
      }
    }
  }

  const nextTick = () => {
    if (!confetti) {
      return
    }

    for (let i = 0; i < 4; i++) {
      confetti(getAnimationSettings(0.1, 0.3))
      confetti(getAnimationSettings(0.7, 0.9))
    }
  }

  useEffect(() => {
    nextTick()

    return () => {
      confetti.reset()
      intervalId && clearInterval(intervalId)
    }
  }, [])

  return (
    <StyledCanvas ref={refConfetti} className="canvas"/>
  )
}

export default Fireworks
