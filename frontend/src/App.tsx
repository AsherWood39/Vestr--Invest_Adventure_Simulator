import { motion } from 'framer-motion'
import { Landmark, Compass, TrendingUp, ShieldCheck } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen text-honeydew selection:bg-gold/30">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Landmark className="text-gold w-8 h-8" />
          <span className="text-2xl font-display font-bold tracking-tight">Vestr</span>
        </div>
        <div className="flex gap-8 items-center font-medium">
          <a href="#" className="hover:text-gold transition-colors">Map</a>
          <a href="#" className="hover:text-gold transition-colors">Academy</a>
          <div className="px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            0 XP
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
            Financial Empowerment, <br />
            <span className="text-gold">Gamified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-honeydew/70 mb-12 max-w-2xl mx-auto">
            Embark on a quest through the markets. Master wealth building through immersive, branching adventures.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-20">
            <button className="px-8 py-4 bg-gold text-forest font-bold rounded-xl text-lg hover:scale-105 transition-transform flex items-center gap-2 justify-center shadow-lg shadow-gold/20">
              <Compass className="w-5 h-5" />
              Start Your Expedition
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-lg hover:bg-white/10 transition-colors">
              View Map
            </button>
          </div>
        </motion.div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8">
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
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-left hover:border-gold/30 transition-colors group">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-honeydew/60">{desc}</p>
    </div>
  )
}

export default App
