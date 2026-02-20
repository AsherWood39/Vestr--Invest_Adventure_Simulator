import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NiyaImg from '../assets/Niya.svg'
import RachelImg from '../assets/Rachel.svg'
import TinaImg from '../assets/Tina.svg'

const adventures = [
    {
        title: "Bank Manager Niya",
        subtitle: "The Pillar of Stability",
        description: "Niya specializes in risk management and long-term security, ensuring every move you make is backed by a solid foundation and bulletproof strategy.",
        difficulty: "Stable",
        image: NiyaImg,
        color: "from-blue-500/20 to-gold/5",
        tags: ["Risk Control", "Security", "Legacy"]
    },
    {
        title: "Financial Advisor Rachel",
        subtitle: "The Master of Growth",
        description: "Rachel blends strategic diversification with deep market insights to craft wealth-building journeys that maximize potential while maintaining balance.",
        difficulty: "Strategic",
        image: RachelImg,
        color: "from-gold/20 to-gold/5",
        tags: ["Strategy", "Portfolio", "Growth"]
    },
    {
        title: "Stock Enthusiast Tina",
        subtitle: "The Agile Trend-Seeker",
        description: "Tina thrives on market momentum and high-growth opportunities, navigating the fast-paced world of stocks to find the next breakout winners.",
        difficulty: "Dynamic",
        image: TinaImg,
        color: "from-orange-500/20 to-gold/5",
        tags: ["Momentum", "Equities", "Agile"]
    }
]

export default function Explore() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center md:text-left"
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    Choose Your <span className="text-gold">Adventure</span>
                </h1>
                <p className="text-text/50 text-lg max-w-2xl">
                    Embark on a unique financial quest led by industry experts. Each path offers a distinct perspective on wealth building.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adventures.map((adventure, idx) => (
                    <motion.div
                        key={adventure.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group p-6 rounded-3xl bg-paper/50 border border-gold/10 hover:border-gold/30 transition-all cursor-pointer relative overflow-hidden flex flex-col`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-linear-to-br ${adventure.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="aspect-video w-full bg-gold/5 rounded-2xl mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 border border-gold/10">
                                <img
                                    src={adventure.image}
                                    alt={adventure.title}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>


                            <div className="flex gap-2 mb-4">
                                {adventure.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider text-text/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-1 italic">
                                {adventure.subtitle}
                            </h2>
                            <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-gold transition-colors">
                                {adventure.title}
                            </h3>

                            <p className="text-text/50 text-sm mb-6 leading-relaxed grow">
                                {adventure.description}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                <span className="text-xs font-medium text-text/40">
                                    Archetype: <span className="text-gold/70">{adventure.difficulty}</span>
                                </span>
                                <div className="flex items-center gap-2 text-gold group-hover:translate-x-2 transition-transform">
                                    <span className="text-sm font-bold uppercase tracking-tight">Embark</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
