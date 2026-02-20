import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import type { Scenario } from '../types'
import NiyaImg from '../assets/Niya.svg'
import RachelImg from '../assets/Rachel.svg'
import TinaImg from '../assets/Tina.svg'

// Helper to enrich backend scenarios with UI-specific metadata
const enrichScenario = (scenario: Scenario) => {
    const metadata: Record<string, Partial<Scenario>> = {
        'NIYA': {
            subtitle: "The Pillar of Stability",
            difficulty: "Stable",
            image: NiyaImg,
            color: "from-blue-500/20 to-gold/5",
            tags: ["Risk Control", "Security", "Legacy"]
        },
        'RACHEL': {
            subtitle: "The Master of Growth",
            difficulty: "Strategic",
            image: RachelImg,
            color: "from-gold/20 to-gold/5",
            tags: ["Strategy", "Portfolio", "Growth"]
        },
        'TINA': {
            subtitle: "The Agile Trend-Seeker",
            difficulty: "Dynamic",
            image: TinaImg,
            color: "from-orange-500/20 to-gold/5",
            tags: ["Momentum", "Equities", "Agile"]
        }
    };

    return {
        ...scenario,
        ...(metadata[scenario.name] || metadata['RACHEL']) // fallback to Rachel if name mismatch
    } as Scenario;
};

export default function Explore({ onEmbark }: { onEmbark: (scenario: Scenario) => void }) {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const data = await apiClient.get<Scenario[]>('/scenarios/list/');
                setScenarios(data.map(enrichScenario));
            } catch (err) {
                console.error('Failed to fetch scenarios:', err);
                setError('Unable to load adventures. Please ensure the backend is running.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchScenarios();
    }, []);

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

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-12 h-12 text-gold animate-spin" />
                    <p className="text-text/50 animate-pulse">Scanning the market for adventures...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-paper/30 rounded-3xl border border-white/5">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-gold/10 border border-gold/20 text-gold rounded-xl hover:bg-gold/20 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            ) : scenarios.length === 0 ? (
                <div className="text-center py-20 bg-paper/30 rounded-3xl border border-white/5">
                    <p className="text-text/50">No adventures found in the database. Add some scenarios to the backend to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scenarios.map((adventure, idx) => (
                        <motion.div
                            key={adventure.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => onEmbark(adventure)}
                            className={`group p-6 rounded-3xl bg-paper/50 border border-gold/10 hover:border-gold/30 transition-all cursor-pointer relative overflow-hidden flex flex-col`}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-linear-to-br ${adventure.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="aspect-video w-full bg-gold/5 rounded-2xl mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 border border-gold/10">
                                    <img
                                        src={adventure.image}
                                        alt={adventure.name_display}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>


                                <div className="flex gap-2 mb-4">
                                    {adventure.tags?.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider text-text/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-1 italic">
                                    {adventure.subtitle}
                                </h2>
                                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-gold transition-colors">
                                    {adventure.name_display}
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
            )}
        </div>
    )
}
