type DetailCard =
  | {
      icon: string
      label: 'Date' | 'Time'
      note: string
      value: string
    }
  | {
      address: string[]
      area: string
      icon: string
      label: 'Place'
      mapUrl: string
      venue: string
    }

const details: DetailCard[] = [
  {
    icon: '📅',
    label: 'Date',
    note: 'Birthday quest day',
    value: 'Saturday, June 13',
  },
  {
    icon: '⏰',
    label: 'Time',
    note: 'Game starts on time',
    value: '10:30 AM',
  },
  {
    address: ['301 Van Buren St NW', 'Washington DC 20012'],
    area: 'Kids Playground',
    icon: '📍',
    label: 'Place',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Takoma%20Community%20Center%2C%20301%20Van%20Buren%20St%20NW%2C%20Washington%20DC%2020012',
    venue: 'Takoma Community Center',
  },
]

const missionNotes = [
  {
    description: 'Pizza, snacks, and drinks will fuel your mission.',
    title: '🍕 Power-ups provided',
  },
  {
    description: 'Help Lucas blow out the candles and complete the level!',
    title: '🎂 Final level: cake',
  },
  {
    description: 'No gifts needed — your presence is the ultimate reward.',
    title: '🎁 Bonus rule',
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

        <div className="border-4 border-sky-400 bg-white p-4 text-center shadow-[0_0_0_4px_#ef4444,0_0_0_8px_#ffffff,0_12px_0_#0b1020] sm:p-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {details.map((detail) => (
              <article
                className="border-4 border-[#0b1020] p-4"
                key={detail.label}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg" aria-hidden="true">
                    {detail.icon}
                  </span>
                  <h3 className="font-display text-lg font-black uppercase tracking-wide text-[#10172a]">
                    {detail.label}
                  </h3>
                </div>
                {'value' in detail && (
                  <>
                    <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
                      {detail.value}
                    </p>
                    <p className="mt-2 text-sm font-black uppercase tracking-wide text-slate-600">
                      {detail.note}
                    </p>
                  </>
                )}
                {'venue' in detail && (
                  <div className="mt-3">
                    <p className="font-display text-2xl font-black sm:text-3xl">
                      {detail.venue}
                    </p>
                    <p className="mt-2 text-sm font-black uppercase tracking-wide text-slate-600">
                      {detail.area}
                    </p>
                    <address className="mt-4 not-italic">
                      {detail.address.map((line) => (
                        <span
                          className="block text-base font-black leading-7 text-slate-700"
                          key={line}
                        >
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      className="mt-4 inline-flex border-4 border-[#0b1020] bg-sky-300 px-4 py-2 font-display text-sm font-black uppercase tracking-wider text-[#10172a] shadow-[0_5px_0_#0369a1] transition hover:-translate-y-1 hover:shadow-[0_8px_0_#0369a1] focus:outline-none focus:ring-4 focus:ring-amber-300"
                      href={detail.mapUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Open map
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {missionNotes.map((note) => (
              <article
                className="border-4 border-[#0b1020] bg-amber-50 p-4"
                key={note.title}
              >
                <h3 className="font-display text-lg font-black uppercase tracking-wide text-[#10172a]">
                  {note.title}
                </h3>
                <p className="mt-3 text-base font-bold leading-7 text-slate-700">
                  {note.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails
