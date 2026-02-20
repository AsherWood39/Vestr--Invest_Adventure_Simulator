import { motion } from 'framer-motion'
import { Landmark, Compass, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { OnboardingModal } from './components/OnboardingModal'
import type { OnboardingData } from './components/OnboardingModal'
import Explore from './pages/Explore'
import Profile from './pages/Profile'

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [userData, setUserData] = useState<OnboardingData | null>(null)
  const [view, setView] = useState<'home' | 'explore' | 'profile'>('home')

  const handleStartExpedition = () => {
    setIsOnboardingOpen(true)
  }

  const handleLogout = () => {
    setUserData(null)
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding complete:', data)
    setUserData(data)
    setIsOnboardingOpen(false)
  }

  return (
    <div className="min-h-screen text-text selection:bg-gold/30 selection:text-background font-body">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <Landmark className="text-gold w-8 h-8" />
          <span className="text-2xl font-display font-bold tracking-tight">Vestr</span>
        </div>
        <div className="flex gap-8 items-center font-medium">
          <button
            onClick={() => setView('explore')}
            className={`hover:text-gold transition-colors cursor-pointer ${view === 'explore' ? 'text-gold' : ''}`}
          >
            Explore
          </button>
          {userData ? (
            <>
              <button
                onClick={() => setView('profile')}
                className={`hover:text-gold transition-colors cursor-pointer ${view === 'profile' ? 'text-gold' : ''}`}
              >
                Profile
              </button>
              <button onClick={handleLogout} className="hover:text-gold transition-colors cursor-pointer">Logout</button>
            </>
          ) : (
            <button onClick={() => setIsOnboardingOpen(true)} className="hover:text-gold transition-colors cursor-pointer">Login</button>
          )}
          <button
            onClick={() => setView('profile')}
            className="px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm flex items-center gap-2 cursor-pointer hover:bg-gold/20 transition-colors"
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            {userData ? '0 XP' : 'Sign In'}
          </button>
        </div>
      </nav>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      {view === 'home' ? (
        <main className="relative pt-15 pb-10 px-2">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center relative z-10 mb-32"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3 h-3" />
              Empowering Your Financial Future
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-8">
              {userData ? `Welcome back, ${userData.username}` : 'The Future of'} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-gold-dark to-gold animate-gradient-x">
                {userData ? userData.goal : 'Career Break'}
              </span>
            </h1>
            <p className="text-text/60 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Gamify your financial empowerment through state-of-the-art
              investment adventure simulators.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={userData ? () => setView('explore') : handleStartExpedition}
                className="px-8 py-4 bg-gold text-background font-bold rounded-xl text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-gold/20 group cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                {userData ? 'Continue Journey' : 'Start Your Expedition'}
              </button>
              {!userData && (
                <button
                  onClick={() => setView('explore')}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-lg hover:bg-white/10 hover:border-gold/30 transition-all cursor-pointer"
                >
                  Explore
                </button>
              )}
            </div>
          </motion.div>

          {/* Features Preview */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-gold" />}
              title="The Safety Oasis"
              desc="Build your emergency fund before the storms arrive."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-gold" />}
              title="Market Jungle"
              desc="Navigate volatility and discover the power of diversification."
            />
            <FeatureCard
              icon={<Landmark className="w-8 h-8 text-gold" />}
              title="Legacy Peak"
              desc="Harness compound interest for long-term multi-generational wealth."
            />
          </div>
        </main>
      ) : view === 'explore' ? (
        <Explore />
      ) : (
        <Profile userData={userData} />
      )}
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-paper/50 border border-white/5 rounded-3xl text-left hover:border-gold/30 transition-all group hover:bg-paper">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-text/60">{desc}</p>
    </div>
  )
}

export default App
