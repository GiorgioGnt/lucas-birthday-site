import EventDetails from './components/EventDetails'
import HeroSection from './components/HeroSection'
import RSVPSection from './components/RSVPSection'

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b1020] text-white">
      <HeroSection />
      <EventDetails />
      <RSVPSection />
    </main>
  )
}

export default App
