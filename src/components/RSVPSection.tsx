function RSVPSection() {
  return (
    <section className="relative isolate bg-[#0b1020] px-4 py-12 sm:px-8 sm:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-16 bg-[linear-gradient(45deg,#38bdf8_25%,#0ea5e9_25%,#0ea5e9_50%,#38bdf8_50%,#38bdf8_75%,#0ea5e9_75%)] bg-[size:30px_30px]" />
      <div className="mx-auto grid max-w-5xl gap-8 border-4 border-cyan-300 bg-[#16213d] p-6 shadow-[0_12px_0_#050816] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_0_#050816] md:grid-cols-[.9fr_1.1fr] md:p-8">
        <div>
          <p className="font-display text-sm font-black uppercase tracking-[.3em] text-amber-300">
            Bonus round
          </p>
          <h2 className="mt-3 font-display text-4xl font-black text-rose-400 drop-shadow-[4px_4px_0_#050816] sm:text-5xl">
            RSVP
          </h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-sky-100">
            No gifts needed. Just press start and come celebrate. This form is
            UI only for now.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <label className="grid gap-2">
            <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
              Guest name
            </span>
            <input
              className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4"
              placeholder="Your name"
              type="text"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
              Number of players
            </span>
            <select className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4">
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4 guests</option>
            </select>
          </label>

          <button
            className="mt-2 border-4 border-[#050816] bg-amber-300 px-6 py-4 font-display text-xl font-black uppercase tracking-wider text-[#10172a] shadow-[0_8px_0_#b45309] transition hover:-translate-y-1 hover:shadow-[0_12px_0_#b45309] focus:outline-none focus:ring-4 focus:ring-cyan-300"
            type="submit"
          >
            Count me in
          </button>
        </form>
      </div>
    </section>
  )
}

export default RSVPSection
