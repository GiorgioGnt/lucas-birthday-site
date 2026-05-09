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
  const dinoShape =
    'M8 36H24V28H36V20H56V28H64V12H88V20H96V40H88V48H72V56H64V64H56V56H40V64H32V56H20V48H8Z'
  const dinoHighlight =
    'M8 36H24V28H36V20H56V28H64V36H56V32H36V40H20V48H8Z'

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      shapeRendering="crispEdges"
      viewBox="0 0 96 72"
    >
      <path d={dinoShape} fill="#050816" transform="translate(4 4)" />
      <path d={dinoShape} fill="#84cc16" />
      <path d={dinoHighlight} fill="#a3e635" />
      <path
        d="M72 12H88V20H96V32H72Z"
        fill="#bef264"
      />
      <path d="M88 32H96V40H88Z" fill="#d9f99d" />
      <path d="M32 20H40V12H48V20H56V12H64V28H32Z" fill="#4d7c0f" />
      <path d="M72 24H80V32H72Z" fill="#050816" />
      <path d="M32 48H64V56H32Z" fill="#d9f99d" />
      <path d="M32 64H48V72H32ZM56 64H72V72H56Z" fill="#fbbf24" />
      <path
        d="M8 48H20V56H32V64H40V72H32V64H20V56H8ZM88 40H96V48H88Z"
        fill="#65a30d"
      />
    </svg>
  )
}

function getDaysUntilJune13() {
  const today = new Date()
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  let eventDate = new Date(today.getFullYear(), 5, 13)

  if (eventDate < startOfToday) {
    eventDate = new Date(today.getFullYear() + 1, 5, 13)
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((eventDate.getTime() - startOfToday.getTime()) / millisecondsPerDay)
}

function CountdownBanner() {
  const daysUntilParty = getDaysUntilJune13()

  return (
    <motion.p
      animate={{ opacity: [1, 0.22, 1] }}
      className="pointer-events-none absolute inset-x-[18%] bottom-[36%] z-50 text-center font-display text-[clamp(.64rem,3vw,1.2rem)] font-black uppercase tracking-[.14em] text-white drop-shadow-[3px_3px_0_#050816]"
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    >
      Press start in {daysUntilParty} days
    </motion.p>
  )
}

function PixelEnemy({ defeated }: { defeated: boolean }) {
  return (
    <motion.div
      animate={
        defeated
          ? { rotate: 180, scaleY: 1, y: 8, opacity: 1 }
          : { rotate: 0, scaleY: 1, y: 0, opacity: 1 }
      }
      className="absolute bottom-[clamp(1.25rem,4vw,1.65rem)] left-[40%] z-30 h-[clamp(1.15rem,6.2vw,2.25rem)] w-[clamp(2rem,10vw,3.8rem)] origin-center transform-gpu [backface-visibility:hidden] [will-change:transform]"
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
      className="absolute left-[70%] top-[6%] z-40 h-[clamp(2.2rem,9vw,3.7rem)] w-[clamp(2.2rem,9vw,3.7rem)] -translate-x-1/2 transform-gpu border-4 border-[#7c2d12] bg-amber-400 shadow-[inset_0_-8px_0_#f97316,5px_5px_0_#050816] [backface-visibility:hidden] [will-change:transform]"
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
      // Whole-pixel transforms avoid mobile Safari compositing gaps around pixel art.
      const ground = 0
      const oneUp = -30
      const twoUp = -68
      const shortHop = -56

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
        left: '62%',
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
    <div className="relative isolate mx-auto mt-5 h-[clamp(7rem,30vw,12rem)] w-full max-w-3xl overflow-visible">
      {blockHit && <CountdownBanner />}
      {/* The block sits around the same horizontal position as the hidden 5. */}
      <AnimatedQuestionBlock hit={blockHit} />
      <PixelEnemy defeated={monsterDefeated} />
      <PixelPowerUp className="bottom-[clamp(1.15rem,3.8vw,1.55rem)] left-[3%] z-20 scale-[.78] sm:scale-90" />
      <PixelPipe className="bottom-[clamp(1.25rem,4vw,1.65rem)] right-[3%] z-20 scale-[.48] origin-bottom-right sm:scale-[.62]" />

      <motion.div
        animate={characterControls}
        className="absolute bottom-[clamp(1.25rem,4vw,1.65rem)] left-[16%] z-30 h-[clamp(2.4rem,10vw,4.3rem)] w-[clamp(3.2rem,13vw,5.8rem)] transform-gpu [backface-visibility:hidden] [will-change:transform]"
      >
        <PixelHeroCharacter />
      </motion.div>

      <div className="absolute inset-x-4 bottom-2 z-10 h-4 border-2 border-[#14532d] bg-lime-400 shadow-[inset_0_-5px_0_#15803d]" />
      <div className="absolute inset-x-4 bottom-0 z-10 h-3 bg-[linear-gradient(45deg,#f97316_25%,#ef4444_25%,#ef4444_50%,#f97316_50%,#f97316_75%,#ef4444_75%)] bg-[size:22px_22px]" />
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
            Lucas
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
