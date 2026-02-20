import { motion } from 'framer-motion'
import type { OnboardingData } from '../components/OnboardingModal'
import ProfileImg from '../assets/Profile.svg'
import ActiveImg from '../assets/Active.svg'
import RachelImg from '../assets/Rachel.svg'
import TinaImg from '../assets/Tina.svg'

interface ProfileProps {
    userData: OnboardingData | null
}

export default function Profile({ userData }: ProfileProps) {
    if (!userData) return null

    return (
        <div className="pt-5 pb-10 px-2 max-w-7xl mx-auto flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {/* User Identity Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[40px] bg-[#0A0A0A] border border-white/5 flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 w-full">
                        <h1 className="text-3xl font-display font-bold mb-1 tracking-tight">
                            {userData.username || 'John Doe'}
                        </h1>
                        <p className="text-text/40 text-base mb-4 italic">
                            {userData.avatar || 'Maya'}
                        </p>

                        <div className="relative w-56 h-56 mx-auto">
                            {/* Blue Glow Ring */}
                            <div className="absolute inset-0 rounded-full border-[3px] border-[#00A3FF] blur-[2px]" />
                            <div className="absolute inset-[-10px] rounded-full border border-[#00A3FF]/20" />

                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0A0A0A] relative z-10">
                                <img
                                    src={ProfileImg}
                                    alt="Profile Illustration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent pointer-none" />
                </motion.div>

                {/* Activity & Goals Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 pl-15 rounded-[40px] bg-[#0A0A0A] border border-white/5 flex flex-col shadow-2xl"
                >
                    <div className="mb-6">
                        <div className="inline-block relative">
                            <img src={ActiveImg} alt="Active Status" className="h-8" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-display font-medium mb-2">Goal :</h2>
                        <p className="text-text/40 text-lg tracking-wide pl-5">
                            {userData.goal || 'Career Break'}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-display font-medium mb-6">Scenarios Completed :</h2>
                        <div className="flex gap-4">
                            {[RachelImg, TinaImg].map((img, i) => (
                                <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1">
                                    <img src={img} alt="Adventure Lead" className="w-full h-full object-cover rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Badges Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-[40px] bg-[#0A0A0A] border border-white/5 shadow-2xl w-full"
            >
                <h2 className="text-2xl font-display font-medium mb-4">Badges :</h2>
                <div className="flex gap-6 pl-15">
                    {/* XP Badge */}
                    <div className="w-20 h-20 rounded-full bg-gold/5 border-[3px] border-gold/20 flex items-center justify-center relative group">
                        <div className="absolute inset-0 rounded-full border border-gold/40 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <span className="text-lg font-black text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">100XP</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
