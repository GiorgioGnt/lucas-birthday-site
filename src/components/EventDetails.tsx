const details = [
  {
    label: 'Date',
    value: 'Saturday, June 13',
    note: 'Birthday quest day',
  },
  {
    label: 'Time',
    value: '10:30 AM',
    note: 'Game starts on time',
  },
  {
    label: 'Place',
    value: 'Takoma Community Center',
    note: 'Kids Playground',
  },
]

function EventDetails() {
  return (
    <section className="relative isolate bg-[#ef1747] px-4 py-12 text-[#10172a] sm:px-8 sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,#facc15_2px,transparent_3px),radial-gradient(circle,#38bdf8_2px,transparent_3px)] bg-[size:54px_54px,78px_78px] bg-[position:0_0,24px_18px] opacity-70" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="font-display text-sm font-black uppercase tracking-[.3em] text-amber-200">
            Player details
          </p>
          <h2 className="mt-2 font-display text-4xl font-black text-white drop-shadow-[4px_4px_0_#0b1020] sm:text-5xl">
            Party mission
          </h2>
        </div>

        <div className="border-4 border-sky-400 bg-white p-4 text-center shadow-[0_0_0_4px_#ef4444,0_0_0_8px_#ffffff,0_12px_0_#0b1020] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_4px_#ef4444,0_0_0_8px_#ffffff,0_18px_0_#0b1020] sm:p-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {details.map((detail) => (
              <article
                className="border-4 border-[#0b1020] p-4 transition duration-300 hover:-translate-y-1 hover:bg-amber-100"
                key={detail.label}
              >
                <p className="font-display text-xs font-black uppercase tracking-widest text-sky-600">
                  {detail.label}
                </p>
                <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
                  {detail.value}
                </p>
                <p className="mt-2 text-sm font-black uppercase tracking-wide text-slate-600">
                  {detail.note}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto h-8 w-8 bg-amber-300 shadow-[8px_0_0_#fbbf24,-8px_0_0_#fbbf24,0_8px_0_#fbbf24,0_-8px_0_#fbbf24]" />
          <p className="mt-6 font-display text-2xl font-black">
            Takoma Community Center, Kids Playground
          </p>
          <p className="mt-2 font-display text-xl font-black sm:text-2xl">
            301 Van Buren St NW, Washington DC 20012
          </p>
        </div>
      </div>
    </section>
  )
}

export default EventDetails
