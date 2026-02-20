import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import type { UserProfile, UserScenarioProgress } from '../types'
import type { OnboardingData } from '../components/OnboardingModal'
import ProfileImg from '../assets/Profile.svg'
import ActiveImg from '../assets/active.svg'
import RachelImg from '../assets/Rachel.svg'
import { Loader2 } from 'lucide-react'

interface ProfileProps {
    userData: OnboardingData | null
}

export default function Profile({ userData }: ProfileProps) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [progress, setProgress] = useState<UserScenarioProgress[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch first profile for now (since we don't have full auth yet)
                const profiles = await apiClient.get<UserProfile[]>('/users/profiles/');
                if (profiles.length > 0) {
                    setProfile(profiles[0]);
                }

                const progressData = await apiClient.get<UserScenarioProgress[]>('/scenarios/progress/');
                setProgress(progressData);
            } catch (err) {
                console.error('Failed to fetch profile data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (!userData && !profile) return null;

    // Use backend data if available, fallback to userData from props (onboarding)
    const displayUsername = profile?.user?.username || userData?.username || 'Explorer';
    const displayAvatar = profile?.avatar || userData?.avatar || 'Maya';
    const displayGoal = profile?.goal || userData?.goal || 'Career Break';
    const displayXP = profile?.xp || 0;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-12 h-12 text-gold animate-spin" />
                <p className="text-text/50 font-display uppercase tracking-widest">Synchronizing Dossier...</p>
            </div>
        );
    }

    return (
        <div className="pt-5 pb-10 px-2 max-w-7xl mx-auto flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {/* User Identity Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[40px] bg-[#0A0A0A] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
                >
                    <div className="relative z-10 w-full">
                        <h1 className="text-3xl font-display font-bold mb-1 tracking-tight">
                            {displayUsername}
                        </h1>
                        <p className="text-text/40 text-base mb-4 italic">
                            {displayAvatar}
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
                        <p className="text-text/40 text-lg tracking-wide pl-5 uppercase">
                            {displayGoal}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-display font-medium mb-6">Scenarios Completed :</h2>
                        <div className="flex gap-4">
                            {progress.filter(p => p.status === 'SOLVED').length > 0 ? (
                                progress.filter(p => p.status === 'SOLVED').map((_, i) => (
                                    <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1 group">
                                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {/* Fallback image logic could go here */}
                                        <img src={RachelImg} alt="Scenario" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-text/20 italic pl-5">No scenarios conquered yet.</p>
                            )}
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
                <div className="flex gap-6 pl-5 flex-wrap">
                    {displayXP < 100 ? (
                        <p className="text-text/20 italic">No badges received yet.</p>
                    ) : (
                        Array.from({ length: Math.floor(displayXP / 100) }).map((_, i) => {
                            const milestone = (i + 1) * 100;
                            return (
                                <div
                                    key={milestone}
                                    className="w-24 h-24 rounded-full bg-gold/5 border-[3px] border-gold/20 flex flex-col items-center justify-center relative group"
                                >
                                    <div className="absolute inset-0 rounded-full border border-gold/40 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <span className="text-xs text-gold/50 font-bold uppercase tracking-tighter mb-[-4px]">Milestone</span>
                                    <span className="text-lg font-black text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">{milestone} XP</span>
                                </div>
                            );
                        })
                    )}
                </div>
            </motion.div>
        </div>
    )
}
