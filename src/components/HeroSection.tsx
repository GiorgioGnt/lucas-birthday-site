import { motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const skyBits = [
  'left-[8%] top-[14%] bg-amber-300',
  'left-[20%] top-[28%] bg-sky-300',
  'left-[38%] top-[10%] bg-rose-400',
  'left-[58%] top-[20%] bg-lime-300',
  'left-[76%] top-[12%] bg-orange-300',
  'left-[88%] top-[34%] bg-cyan-300',
  'left-[14%] top-[62%] bg-violet-300',
]

function PixelCloud({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute h-8 w-20 ${className}`} aria-hidden="true">
      <span className="absolute bottom-0 left-1 h-5 w-8 bg-white shadow-[0_5px_0_#7dd3fc]" />
      <span className="absolute bottom-0 left-7 h-8 w-8 bg-white shadow-[0_5px_0_#7dd3fc]" />
      <span className="absolute bottom-0 left-13 h-5 w-9 bg-white shadow-[0_5px_0_#7dd3fc]" />
    </div>
  )
}

function PixelBlock({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute h-12 w-12 border-4 border-[#7c2d12] bg-amber-400 shadow-[inset_0_-8px_0_#f97316,6px_6px_0_#050816] ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-2xl font-black text-yellow-900">
        ?
      </span>
    </span>
  )
}

function PixelPipe({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute w-20 ${className}`} aria-hidden="true">
      <div className="h-9 border-4 border-[#064e3b] bg-emerald-400 shadow-[inset_0_-6px_0_#059669,5px_5px_0_#050816]" />
      <div className="mx-auto h-24 w-14 border-x-4 border-[#064e3b] bg-emerald-500 shadow-[inset_8px_0_0_#86efac,inset_-8px_0_0_#047857,5px_0_0_#050816]" />
    </div>
  )
}

function PixelPowerUp({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute h-14 w-16 ${className}`} aria-hidden="true">
      <div className="absolute left-1 top-0 h-9 w-14 rounded-t-full border-4 border-[#7f1d1d] bg-red-500 shadow-[inset_0_-6px_0_#dc2626,4px_4px_0_#050816]">
        <span className="absolute left-2 top-2 h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-white" />
      </div>
      <div className="absolute bottom-0 left-4 h-7 w-8 border-4 border-[#7c2d12] bg-amber-100 shadow-[inset_0_-4px_0_#fbbf24]" />
    </div>
  )
}

function PixelHeroCharacter() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-[30%] top-0 h-[28%] w-[40%] bg-cyan-200 shadow-[0_3px_0_#0e7490]" />
      <div className="absolute left-[20%] top-[24%] h-[36%] w-[60%] bg-sky-500 shadow-[inset_0_-5px_0_#0369a1,3px_3px_0_#050816]" />
      <div className="absolute left-[10%] top-[34%] h-[18%] w-[18%] bg-amber-100" />
      <div className="absolute right-[10%] top-[34%] h-[18%] w-[18%] bg-amber-100" />
      <div className="absolute left-[30%] top-[38%] h-[12%] w-[10%] bg-[#050816]" />
      <div className="absolute right-[30%] top-[38%] h-[12%] w-[10%] bg-[#050816]" />
      <div className="absolute left-[20%] bottom-[14%] h-[26%] w-[26%] bg-red-500 shadow-[0_4px_0_#7f1d1d]" />
      <div className="absolute right-[20%] bottom-[14%] h-[26%] w-[26%] bg-red-500 shadow-[0_4px_0_#7f1d1d]" />
      <div className="absolute left-[14%] bottom-0 h-[16%] w-[28%] bg-amber-300" />
      <div className="absolute right-[14%] bottom-0 h-[16%] w-[28%] bg-amber-300" />
    </div>
  )
}

function PixelEnemy({ defeated }: { defeated: boolean }) {
  return (
    <motion.div
      animate={
        defeated
          ? { rotate: 180, scaleY: 0.45, y: 16, opacity: 0.7 }
          : { rotate: 0, scaleY: 1, y: 0, opacity: 1 }
      }
      className="absolute bottom-[14%] left-[36%] h-[clamp(1.6rem,8vw,3rem)] w-[clamp(2rem,10vw,3.8rem)] origin-center"
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="relative h-full w-full rounded-t-full border-4 border-[#7f1d1d] bg-fuchsia-500 shadow-[inset_0_-7px_0_#be185d,4px_4px_0_#050816]">
        <span className="absolute left-[22%] top-[32%] h-[18%] w-[16%] bg-white" />
        <span className="absolute right-[22%] top-[32%] h-[18%] w-[16%] bg-white" />
        <span className="absolute left-[26%] top-[38%] h-[9%] w-[8%] bg-[#050816]" />
        <span className="absolute right-[26%] top-[38%] h-[9%] w-[8%] bg-[#050816]" />
      </div>
    </motion.div>
  )
}

function AnimatedQuestionBlock({ hit }: { hit: boolean }) {
  return (
    <motion.div
      animate={hit ? { y: [0, -14, 0] } : { y: 0 }}
      className="absolute left-[70%] top-[6%] h-[clamp(2.2rem,9vw,3.7rem)] w-[clamp(2.2rem,9vw,3.7rem)] -translate-x-1/2 border-4 border-[#7c2d12] bg-amber-400 shadow-[inset_0_-8px_0_#f97316,5px_5px_0_#050816]"
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.3rem,5vw,2.3rem)] font-black text-yellow-900">
        ?
      </span>
    </motion.div>
  )
}

function ArcadeIntroAnimation({
  onBlockHit,
}: {
  onBlockHit: () => void
}) {
  const characterControls = useAnimationControls()
  const [monsterDefeated, setMonsterDefeated] = useState(false)
  const [blockHit, setBlockHit] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function runIntro() {
      const ground = '0%'
      const oneUp = '-42%'
      const twoUp = '-84%'
      const shortHop = '-64%'

      const step = {
        duration: 0.22,
        ease: 'linear' as const,
      }

      await characterControls.start({
        left: '30%',
        y: ground,
        transition: { duration: 0.9, ease: 'linear' },
      })

      // Stomp sequence: up, right, down onto enemy, up, right, down, right.
      await characterControls.start({ y: twoUp, transition: step })
      await characterControls.start({ left: '38%', transition: step })
      await characterControls.start({ y: oneUp, transition: step })
      await characterControls.start({ y: twoUp, transition: step })
      await characterControls.start({ left: '46%', transition: step })
      await characterControls.start({ y: ground, transition: step })
      await characterControls.start({ left: '54%', transition: step })

      if (!isMounted) {
        return
      }

      setMonsterDefeated(true)

      await characterControls.start({
        left: '68%',
        y: ground,
        transition: { duration: 0.55, ease: 'linear' },
      })
      await characterControls.start({ y: shortHop, transition: step })

      if (!isMounted) {
        return
      }

      setBlockHit(true)
      onBlockHit()

      await characterControls.start({ y: ground, transition: step })
      await characterControls.start({
        left: '80%',
        y: ground,
        transition: { duration: 0.35, ease: 'linear' },
      })
    }

    void runIntro()

    return () => {
      isMounted = false
      characterControls.stop()
    }
  }, [characterControls, onBlockHit])

  return (
    <div className="relative mx-auto mt-5 h-[clamp(6rem,27vw,11rem)] w-full max-w-3xl overflow-hidden">
      {/* The block sits around the same horizontal position as the hidden 5. */}
      <AnimatedQuestionBlock hit={blockHit} />
      <PixelEnemy defeated={monsterDefeated} />
      <PixelPowerUp className="bottom-[11%] left-[3%] scale-[.78] sm:scale-90" />
      <PixelPipe className="bottom-[16%] right-[3%] scale-[.48] origin-bottom-right sm:scale-[.62]" />

      <motion.div
        animate={characterControls}
        className="absolute bottom-[16%] left-[16%] z-10 h-[clamp(2.5rem,10vw,4.5rem)] w-[clamp(2rem,8vw,3.6rem)]"
      >
        <PixelHeroCharacter />
      </motion.div>

      <div className="absolute inset-x-4 bottom-2 h-4 border-2 border-[#14532d] bg-lime-400 shadow-[inset_0_-5px_0_#15803d]" />
      <div className="absolute inset-x-4 bottom-0 h-3 bg-[linear-gradient(45deg,#f97316_25%,#ef4444_25%,#ef4444_50%,#f97316_50%,#f97316_75%,#ef4444_75%)] bg-[size:22px_22px]" />
    </div>
  )
}

function HeroSection() {
  const [blockHit, setBlockHit] = useState(false)
  const [showFive, setShowFive] = useState(false)
  const handleBlockHit = useCallback(() => setBlockHit(true), [])

  useEffect(() => {
    if (!blockHit) {
      return
    }

    const revealTimer = window.setTimeout(() => setShowFive(true), 120)
    return () => window.clearTimeout(revealTimer)
  }, [blockHit])

  return (
    <section className="relative isolate px-4 pt-6 sm:px-8 sm:pt-10">
      <div className="absolute inset-0 -z-20 bg-[#0b1020]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,#fde047_1.5px,transparent_2px),radial-gradient(circle,#38bdf8_1.5px,transparent_2px),radial-gradient(circle,#fb7185_1.5px,transparent_2px)] bg-[size:46px_46px,68px_68px,92px_92px] bg-[position:0_0,18px_20px,40px_10px] opacity-60" />

      <div className="relative mx-auto max-w-5xl overflow-hidden border-4 border-white bg-[#0b1020] px-4 pb-24 pt-10 text-center shadow-[0_0_0_8px_#ef4444,0_20px_0_#050816] sm:px-8 sm:pb-28 sm:pt-14">
        {skyBits.map((bit) => (
          <span
            className={`absolute h-2 w-2 shadow-[12px_12px_0_currentColor,-10px_18px_0_currentColor] ${bit}`}
            key={bit}
            aria-hidden="true"
          />
        ))}
        <PixelCloud className="pixel-float-slow left-5 top-28 scale-75 sm:left-12 sm:top-36 sm:scale-100" />
        <PixelCloud className="pixel-float right-4 top-20 scale-75 sm:right-16 sm:top-28 sm:scale-100" />
        <PixelBlock className="left-[12%] top-[42%] hidden sm:block" />
        <PixelBlock className="right-[14%] top-[46%] hidden sm:block" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="font-display text-4xl font-black leading-none text-amber-300 drop-shadow-[5px_5px_0_#dc2626] sm:text-6xl lg:text-7xl">
            You're Invited!
          </p>
          <h1 className="mt-4 font-display text-7xl font-black leading-none text-red-500 drop-shadow-[7px_7px_0_#111827] sm:text-8xl lg:text-[9.5rem]">
            Lucas!
          </h1>
          <p className="mt-4 font-display text-4xl font-black leading-none text-lime-400 drop-shadow-[5px_5px_0_#166534] sm:text-6xl">
            is turning{' '}
            <motion.span
              animate={
                showFive
                  ? { opacity: 1, scale: [0.2, 1.35, 0.95, 1], y: [28, -10, 3, 0] }
                  : { opacity: 0.18, scale: 0.85, y: 12 }
              }
              className="inline-block text-amber-300 drop-shadow-[5px_5px_0_#dc2626]"
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              5!
            </motion.span>
          </p>
          <ArcadeIntroAnimation onBlockHit={handleBlockHit} />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 border-t-4 border-[#0b1020] bg-[linear-gradient(45deg,#f97316_25%,#ef4444_25%,#ef4444_50%,#f97316_50%,#f97316_75%,#ef4444_75%)] bg-[size:34px_34px]">
          <div className="absolute inset-x-0 -top-6 h-6 bg-lime-400 shadow-[inset_0_-6px_0_#15803d]" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
