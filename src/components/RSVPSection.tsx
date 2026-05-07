import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

type ClassOption = '' | 'Ms Noel' | 'Ms Johnson' | 'Not Applicable'
type AttendanceOption = '' | 'Yes' | 'No'
type GuestCountOption = '' | '1' | '2' | '3' | '4' | '5' | '6+'

type RSVPForm = {
  attending: AttendanceOption
  className: ClassOption
  guestCount: GuestCountOption
  kidName: string
  parentGuardianName: string
}

type CleanedRSVPPayload = {
  attending: Exclude<AttendanceOption, ''>
  className: Exclude<ClassOption, ''>
  guestCount?: Exclude<GuestCountOption, ''>
  isUpdate: boolean
  kidName: string
  parentName?: string
}

const classOptions: Exclude<ClassOption, ''>[] = [
  'Ms Noel',
  'Ms Johnson',
  'Not Applicable',
]

const guestCountOptions: Exclude<GuestCountOption, ''>[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6+',
]

// TODO: Later, when deployed to Azure Static Web Apps, change this to "/api/rsvp".
const rsvpApiUrl = 'http://localhost:7071/api/rsvp'

async function submitRsvp(_form: RSVPForm, isUpdate: boolean) {
  const cleanedPayload: CleanedRSVPPayload = {
    attending: _form.attending as Exclude<AttendanceOption, ''>,
    className: _form.className as Exclude<ClassOption, ''>,
    isUpdate,
    kidName: _form.kidName.trim(),
  }
  const parentName = _form.parentGuardianName.trim()

  if (_form.attending === 'Yes') {
    cleanedPayload.guestCount = _form.guestCount as Exclude<GuestCountOption, ''>
  }

  if (parentName) {
    cleanedPayload.parentName = parentName
  }

  const response = await fetch(rsvpApiUrl, {
    body: JSON.stringify(cleanedPayload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('We could not save your RSVP. Please check the form and try again.')
  }
}

function RSVPSection() {
  const [form, setForm] = useState<RSVPForm>({
    attending: '',
    className: '',
    guestCount: '',
    kidName: '',
    parentGuardianName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitResult, setSubmitResult] = useState<AttendanceOption>('')
  const firstRsvpButtonRef = useRef<HTMLButtonElement>(null)

  const kidNameIsValid = form.kidName.trim().length > 0
  const classIsValid = classOptions.includes(form.className as Exclude<ClassOption, ''>)
  const attendingIsValid = form.attending === 'Yes' || form.attending === 'No'
  const guestCountIsRequired = form.attending === 'Yes'
  const guestCountIsValid =
    !guestCountIsRequired ||
    guestCountOptions.includes(form.guestCount as Exclude<GuestCountOption, ''>)
  const isFormValid =
    kidNameIsValid && classIsValid && attendingIsValid && guestCountIsValid
  const submitButtonLabel =
    form.attending === 'Yes'
      ? 'Count on me'
      : form.attending === 'No'
        ? 'Player not available'
        : 'Select RSVP'
  const submitButtonColor =
    form.attending === 'No'
      ? 'bg-sky-300 text-[#10172a] shadow-[0_8px_0_#0369a1] enabled:hover:shadow-[0_12px_0_#0369a1]'
      : 'bg-amber-300 text-[#10172a] shadow-[0_8px_0_#b45309] enabled:hover:shadow-[0_12px_0_#b45309]'

  useEffect(() => {
    if (!confirmationIsOpen) {
      return
    }

    firstRsvpButtonRef.current?.focus()
  }, [confirmationIsOpen])

  function updateForm<Field extends keyof RSVPForm>(
    field: Field,
    value: RSVPForm[Field],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
      ...(field === 'attending' && value === 'No' ? { guestCount: '' } : {}),
    }))
    setSubmitError('')
    setSubmitResult('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowValidation(true)

    if (!isFormValid || isSubmitting) {
      return
    }

    setConfirmationIsOpen(true)
    setSubmitError('')
  }

  async function handleConfirmedSubmit(isUpdate: boolean) {
    if (!isFormValid || isSubmitting) {
      return
    }

    setConfirmationIsOpen(false)
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await submitRsvp(form, isUpdate)
      setSubmitResult(form.attending)
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? 'Unable to save RSVP. Please try again.'
          : error instanceof Error
            ? error.message
            : 'Unable to save RSVP. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative isolate bg-[#0b1020] px-4 py-12 sm:px-8 sm:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-16 bg-[linear-gradient(45deg,#38bdf8_25%,#0ea5e9_25%,#0ea5e9_50%,#38bdf8_50%,#38bdf8_75%,#0ea5e9_75%)] bg-[size:30px_30px]" />
      <div className="mx-auto max-w-5xl border-4 border-cyan-300 bg-[#16213d] p-6 shadow-[0_12px_0_#050816] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_0_#050816] md:p-8">
        <div className="mb-8 text-center">
          <p className="font-display text-sm font-black uppercase tracking-[.3em] text-amber-300">
            Bonus round
          </p>
          <h2 className="mt-3 font-display text-4xl font-black text-rose-400 drop-shadow-[4px_4px_0_#050816] sm:text-5xl">
            RSVP
          </h2>
        </div>

        <form className="grid gap-6" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
                Kid name
              </span>
              <input
                className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4"
                onBlur={() => setShowValidation(true)}
                onChange={(event) => updateForm('kidName', event.target.value)}
                placeholder="Kid name"
                type="text"
                value={form.kidName}
              />
              {showValidation && !kidNameIsValid && (
                <p className="text-sm font-bold text-amber-200">
                  Please enter the kid name.
                </p>
              )}
            </label>

            <label className="grid gap-2">
              <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
                Parent/guardian name
              </span>
              <input
                className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4"
                onChange={(event) =>
                  updateForm('parentGuardianName', event.target.value)
                }
                placeholder="Parent or guardian name"
                type="text"
                value={form.parentGuardianName}
              />
            </label>

            <label className="grid gap-2">
              <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
                Class
              </span>
              <select
                className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4"
                onBlur={() => setShowValidation(true)}
                onChange={(event) =>
                  updateForm('className', event.target.value as ClassOption)
                }
                value={form.className}
              >
                <option value="">Select class</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {showValidation && !classIsValid && (
                <p className="text-sm font-bold text-amber-200">
                  Please select a class.
                </p>
              )}
            </label>

            <label className="grid gap-2">
              <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
                Will you attend?
              </span>
              <select
                className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4"
                onBlur={() => setShowValidation(true)}
                onChange={(event) =>
                  updateForm('attending', event.target.value as AttendanceOption)
                }
                value={form.attending}
              >
                <option value="">Select answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {showValidation && !attendingIsValid && (
                <p className="text-sm font-bold text-amber-200">
                  Please tell us if you will attend.
                </p>
              )}
            </label>

            <label className="grid gap-2">
              <span className="font-display text-sm font-black uppercase tracking-widest text-cyan-200">
                Number of people attending
              </span>
              <select
                className="border-4 border-[#050816] bg-white px-4 py-3 text-lg font-bold text-[#10172a] outline-none ring-amber-300 transition duration-200 focus:-translate-y-1 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-55"
                disabled={form.attending !== 'Yes'}
                onBlur={() => setShowValidation(true)}
                onChange={(event) =>
                  updateForm('guestCount', event.target.value as GuestCountOption)
                }
                value={form.guestCount}
              >
                <option value="">Select number</option>
                {guestCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {showValidation && !guestCountIsValid && (
                <p className="text-sm font-bold text-amber-200">
                  Please select the number of people attending.
                </p>
              )}
            </label>

          </div>

          <div className="flex justify-center">
            <button
              className={`w-full max-w-sm border-4 border-[#050816] px-6 py-4 font-display text-xl font-black uppercase tracking-wider transition duration-300 enabled:hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto sm:min-w-80 ${submitButtonColor}`}
              disabled={!isFormValid || isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Submitting...' : submitButtonLabel}
            </button>
          </div>

          {submitError && (
            <div
              className="mx-auto w-full max-w-2xl border-4 border-[#050816] bg-rose-500 p-4 text-center font-display text-base font-black uppercase tracking-wide text-white shadow-[0_8px_0_#9f1239]"
              role="alert"
            >
              {submitError}
            </div>
          )}

          {submitResult && (
            <div
              className={`relative mx-auto mt-2 w-full max-w-2xl overflow-hidden border-4 border-[#050816] p-4 text-center font-display text-lg font-black uppercase tracking-wider text-white shadow-[0_8px_0_#050816] sm:text-xl ${
                submitResult === 'Yes' ? 'bg-lime-500' : 'bg-violet-500'
              }`}
              role="status"
            >
              <span
                className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  submitResult === 'Yes'
                    ? 'animate-ping bg-amber-200'
                    : 'animate-bounce bg-cyan-200'
                }`}
              />
              <span
                className={`absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  submitResult === 'Yes'
                    ? 'animate-ping bg-amber-200'
                    : 'animate-bounce bg-cyan-200'
                }`}
              />
              {submitResult === 'Yes'
                ? '🎮 Player joined the party!'
                : '👾 Player not available — RSVP saved'}
            </div>
          )}
        </form>
      </div>

      {confirmationIsOpen && (
        <div
          aria-labelledby="rsvp-confirmation-title"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[#050816]/80 px-4"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setConfirmationIsOpen(false)
            }
          }}
          role="dialog"
        >
          <div className="w-full max-w-lg border-4 border-cyan-300 bg-[#16213d] p-5 text-center shadow-[0_12px_0_#050816] sm:p-7">
            <h3
              className="font-display text-3xl font-black uppercase leading-tight text-white drop-shadow-[4px_4px_0_#050816] sm:text-4xl"
              id="rsvp-confirmation-title"
            >
              Save slot
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="border-4 border-[#050816] bg-lime-400 px-4 py-4 font-display text-base font-black uppercase tracking-wider text-[#10172a] shadow-[0_6px_0_#15803d] transition duration-150 hover:-translate-y-1 hover:shadow-[0_10px_0_#15803d] active:translate-y-1 active:shadow-[0_3px_0_#15803d] focus:outline-none focus:ring-4 focus:ring-amber-300"
                onClick={() => void handleConfirmedSubmit(false)}
                ref={firstRsvpButtonRef}
                type="button"
              >
                New RSVP
              </button>
              <button
                className="border-4 border-[#050816] bg-sky-300 px-4 py-4 font-display text-base font-black uppercase tracking-wider text-[#10172a] shadow-[0_6px_0_#0369a1] transition duration-150 hover:-translate-y-1 hover:shadow-[0_10px_0_#0369a1] active:translate-y-1 active:shadow-[0_3px_0_#0369a1] focus:outline-none focus:ring-4 focus:ring-amber-300"
                onClick={() => void handleConfirmedSubmit(true)}
                type="button"
              >
                Update RSVP
              </button>
              <button
                className="border-4 border-[#050816] bg-rose-500 px-4 py-4 font-display text-base font-black uppercase tracking-wider text-white shadow-[0_6px_0_#9f1239] transition duration-150 hover:-translate-y-1 hover:shadow-[0_10px_0_#9f1239] active:translate-y-1 active:shadow-[0_3px_0_#9f1239] focus:outline-none focus:ring-4 focus:ring-amber-300 sm:col-span-2"
                onClick={() => setConfirmationIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default RSVPSection
