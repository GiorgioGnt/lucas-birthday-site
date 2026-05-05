const skyBits = [
  'left-[8%] top-[14%] bg-amber-300',
  'left-[20%] top-[28%] bg-sky-300',
  'left-[38%] top-[10%] bg-rose-400',
  'left-[58%] top-[20%] bg-lime-300',
  'left-[76%] top-[12%] bg-orange-300',
  'left-[88%] top-[34%] bg-cyan-300',
  'left-[14%] top-[62%] bg-violet-300',
  'left-[68%] top-[66%] bg-amber-300',
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

function PixelCoin({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute h-9 w-9 rounded-full border-4 border-amber-500 bg-yellow-300 shadow-[inset_0_-5px_0_#f59e0b,0_4px_0_#7c2d12] ${className}`}
      aria-hidden="true"
    />
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

function PixelStar({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute h-8 w-8 bg-amber-300 shadow-[8px_0_0_#fbbf24,-8px_0_0_#fbbf24,0_8px_0_#fbbf24,0_-8px_0_#fbbf24] ${className}`}
      aria-hidden="true"
    />
  )
}

function HeroSection() {
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
        <PixelCoin className="pixel-bob left-9 top-1/2 hidden sm:block" />
        <PixelCoin className="pixel-bob right-10 top-[58%] hidden sm:block" />
        <PixelPowerUp className="bottom-16 left-[12%] hidden sm:block" />
        <PixelPipe className="bottom-0 right-[8%] hidden sm:block" />
        <PixelStar className="left-[18%] bottom-36 scale-75" />
        <PixelStar className="right-[18%] bottom-44 scale-75" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="font-display text-4xl font-black leading-none text-amber-300 drop-shadow-[5px_5px_0_#dc2626] sm:text-6xl lg:text-7xl">
            You're Invited!
          </p>
          <h1 className="mt-4 font-display text-7xl font-black leading-none text-red-500 drop-shadow-[7px_7px_0_#111827] sm:text-8xl lg:text-[9.5rem]">
            Lucas!
          </h1>
          <p className="mt-4 font-display text-4xl font-black leading-none text-lime-400 drop-shadow-[5px_5px_0_#166534] sm:text-6xl">
            is turning 5!
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base font-black uppercase tracking-[.2em] text-cyan-100 sm:text-lg">
            Level up with Lucas for a pixel-powered playground party
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 border-t-4 border-[#0b1020] bg-[linear-gradient(45deg,#f97316_25%,#ef4444_25%,#ef4444_50%,#f97316_50%,#f97316_75%,#ef4444_75%)] bg-[size:34px_34px]">
          <div className="absolute inset-x-0 -top-6 h-6 bg-lime-400 shadow-[inset_0_-6px_0_#15803d]" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
