import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, User, GraduationCap, Target, Sparkles, Lock } from 'lucide-react'
import { useState } from 'react'

interface OnboardingModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete: (data: OnboardingData) => void
}

export interface OnboardingData {
    username: string
    avatar: string
    experience: 'Newbie' | 'Intermediate'
    goal: string
}

const steps = [
    {
        id: 'credentials',
        title: 'Join the Expedition',
        description: 'Secure your terminal before we begin.',
        icon: <Lock className="w-6 h-6 text-gold" />,
    },
    {
        id: 'avatar',
        title: 'Choose Your Persona',
        description: 'Who will you be on this financial quest?',
        icon: <User className="w-6 h-6 text-gold" />,
    },
    {
        id: 'experience',
        title: 'Experience Level',
        description: 'How familiar are you with the markets?',
        icon: <GraduationCap className="w-6 h-6 text-gold" />,
    },
    {
        id: 'goal',
        title: 'Set Your Goal',
        description: 'What is the ultimate prize for your journey?',
        icon: <Target className="w-6 h-6 text-gold" />,
    },
]

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [password, setPassword] = useState('')
    const [data, setData] = useState<OnboardingData>({
        username: '',
        avatar: '',
        experience: 'Newbie',
        goal: '',
    })

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            onComplete(data)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text/70 ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="QuantumTrader_22"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text/70 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                            />
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'clara', name: 'Professional Clara', desc: 'Strategy focused' },
                            { id: 'maya', name: 'Student Maya', desc: 'Growth seeker' },
                        ].map(avatar => (
                            <button
                                key={avatar.id}
                                onClick={() => setData({ ...data, avatar: avatar.name })}
                                className={`p-6 rounded-2xl border transition-all text-left ${data.avatar === avatar.name
                                    ? 'border-gold bg-gold/10'
                                    : 'border-white/10 bg-white/5 hover:border-gold/30'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-gold/20 rounded-full mb-4 flex items-center justify-center">
                                    <User className="text-gold" />
                                </div>
                                <h4 className="font-bold mb-1">{avatar.name}</h4>
                                <p className="text-sm text-text/50">{avatar.desc}</p>
                            </button>
                        ))}
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        {['Newbie', 'Intermediate'].map(level => (
                            <button
                                key={level}
                                onClick={() => setData({ ...data, experience: level as any })}
                                className={`w-full p-6 rounded-2xl border transition-all text-left flex items-center justify-between ${data.experience === level
                                    ? 'border-gold bg-gold/10'
                                    : 'border-white/10 bg-white/5 hover:border-gold/30'
                                    }`}
                            >
                                <div>
                                    <h4 className="font-bold">{level}</h4>
                                    <p className="text-sm text-text/50">
                                        {level === 'Newbie' ? 'Just starting out' : 'I know the basics'}
                                    </p>
                                </div>
                                {data.experience === level && <Sparkles className="text-gold w-5 h-5" />}
                            </button>
                        ))}
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        {['Family Fund', 'Career Break', 'Wealth Building'].map(goal => (
                            <button
                                key={goal}
                                onClick={() => setData({ ...data, goal })}
                                className={`w-full p-6 rounded-2xl border transition-all text-left ${data.goal === goal
                                    ? 'border-gold bg-gold/10'
                                    : 'border-white/10 bg-white/5 hover:border-gold/30'
                                    }`}
                            >
                                <h4 className="font-bold">{goal}</h4>
                            </button>
                        ))}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-paper border border-gold/20 rounded-3xl p-8 z-101 shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-text/30 hover:text-text transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 flex gap-4 items-center">
                            <div className="p-3 bg-gold/10 rounded-xl">
                                {steps[currentStep].icon}
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold">{steps[currentStep].title}</h2>
                                <p className="text-text/50 text-sm">{steps[currentStep].description}</p>
                            </div>
                        </div>

                        <div className="min-h-[300px]">
                            {renderStep()}
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-2">
                                    {steps.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all ${idx === currentStep ? 'w-8 bg-gold' : 'w-2 bg-white/10'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="px-6 py-3 bg-white/5 border border-white/10 text-text/70 font-bold rounded-xl flex items-center gap-2 hover:bg-white/10 hover:text-text transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        currentStep === 0 ? (!data.username || !password) :
                                            currentStep === 1 ? !data.avatar :
                                                currentStep === 3 ? !data.goal : false
                                    }
                                    className="px-6 py-3 bg-gold text-background font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                                >
                                    {currentStep === steps.length - 1 ? 'Begin Quest' : 'Continue'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
