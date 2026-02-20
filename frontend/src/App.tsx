import { motion } from 'framer-motion'
import { Landmark, Compass, TrendingUp, ShieldCheck, Sparkles, LogOut, User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { OnboardingModal } from './components/OnboardingModal'
import { LoginModal } from './components/LoginModal'
import type { OnboardingData } from './components/OnboardingModal'
import Explore from './pages/Explore'
import Profile from './pages/Profile'

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [userData, setUserData] = useState<OnboardingData | null>(null)
  const [view, setView] = useState<'home' | 'explore' | 'profile'>('home')

  const handleStartExpedition = () => {
    setIsOnboardingOpen(true)
  }

  const handleLogout = () => {
    setUserData(null)
    setView('home')
  }

  const handleLoginSuccess = (data: OnboardingData) => {
    console.log('Login success:', data)
    setUserData(data)
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
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-colors">
            <Landmark className="text-gold w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Vestr</span>
        </div>
        <div className="flex gap-8 items-center font-medium">
          <button
            onClick={() => setView('explore')}
            className={`hover:text-gold transition-colors cursor-pointer relative ${view === 'explore' ? 'text-gold' : ''}`}
          >
            Explore
            {view === 'explore' && <motion.div layoutId="nav-active" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold" />}
          </button>

          {userData ? (
            <>
              <button
                onClick={() => setView('profile')}
                className={`hover:text-gold transition-colors cursor-pointer relative ${view === 'profile' ? 'text-gold' : ''}`}
              >
                Profile
                {view === 'profile' && <motion.div layoutId="nav-active" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-text/60 hover:text-red-400 transition-colors cursor-pointer hover:bg-white/5 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-2 border border-white/10 rounded-xl hover:bg-white/5 hover:border-gold/30 transition-all cursor-pointer"
            >
              Login
            </button>
          )}

          <button
            onClick={() => {
              if (userData && (userData.xp || 0) > 0) setView('profile')
              else if (!userData) setIsOnboardingOpen(true)
            }}
            disabled={!!userData && (userData.xp || 0) === 0}
            className={`px-5 py-2 bg-gold/10 border border-gold/20 rounded-xl text-gold text-sm flex items-center gap-2 transition-all
              ${userData && (userData.xp || 0) === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:bg-gold/20 active:scale-95'
              }`}
          >
            {userData ? (
              <>
                <UserIcon className="w-4 h-4 text-gold" />
                <span className="font-bold">{userData.xp || 0} XP</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Join Vestr</span>
              </>
            )}
          </button>
        </div>
      </nav>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSignUpClick={() => {
          setIsLoginOpen(false)
          setIsOnboardingOpen(true)
        }}
      />

      {view === 'home' ? (
        <main className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10 mb-32"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-10"
            >
              <Sparkles className="w-3 h-3 animate-pulse" />
              Empowering Your Financial Future
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-display font-bold leading-[0.9] mb-10 tracking-tighter">
              {userData ? (
                <>
                  WELCOME BACK, <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-white to-gold animate-gradient-x italic">
                    {userData.username.toUpperCase()}
                  </span>
                </>
              ) : (
                <>
                  THE FUTURE OF <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-white to-gold animate-gradient-x italic">
                    WEALTH
                  </span>
                </>
              )}
            </h1>

            <p className="text-text/50 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              Master the art of investment through high-fidelity simulation and archetypal guidance. Your wealth-building quest starts here.
            </p>

            <div className="flex flex-row gap-6 justify-center items-center">
              <button
                onClick={userData ? () => setView('explore') : handleStartExpedition}
                className="px-10 py-5 bg-gold text-background font-black rounded-2xl text-xl hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-gold/20 group cursor-pointer active:scale-95"
              >
                <Compass className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                {userData ? 'CONTINUE YOUR EXPEDITION' : 'START YOUR EXPEDITION'}
              </button>

              {!userData && (
                <button
                  onClick={() => setView('explore')}
                  className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-gold/40 transition-all cursor-pointer active:scale-95"
                >
                  Explore
                </button>
              )}
            </div>
          </motion.div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full -z-10" />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-gold" />}
              title="The Safety Oasis"
              desc="Fortify your foundations. Learn to build emergency reserves that withstand any market storm."
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-gold" />}
              title="Market Jungle"
              desc="Survival of the smartest. Navigate volatility through the precision of strategic diversification."
            />
            <FeatureCard
              icon={<Landmark className="w-10 h-10 text-gold" />}
              title="Legacy Peak"
              desc="Eternal growth. Harness the geometric power of compound interest for generational wealth."
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
    <motion.div
      whileHover={{ y: -10 }}
      className="p-10 bg-paper/30 backdrop-blur-sm border border-white/5 rounded-[40px] text-left hover:border-gold/30 transition-all group hover:bg-paper/50"
    >
      <div className="mb-8 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-110 transition-all border border-white/10 group-hover:border-gold/20">
        {icon}
      </div>
      <h3 className="text-3xl font-display font-bold mb-4 tracking-tight group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-text/40 leading-relaxed text-lg">{desc}</p>
    </motion.div>
  )
}

export default App
