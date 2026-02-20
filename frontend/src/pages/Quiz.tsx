import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Loader2, AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import type { QuizQuestion, Scenario } from '../types'

interface QuizProps {
    scenario: Scenario
    isLoggedIn: boolean
    username?: string
    onBack: () => void
    onComplete: (xpEarned: number) => void
}

export default function Quiz({ scenario, isLoggedIn, username, onBack, onComplete }: QuizProps) {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isFinished, setIsFinished] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await apiClient.get<QuizQuestion[]>(`/quizzes/questions/?scenario=${scenario.id}`)
                setQuestions(data)
            } catch (err) {
                console.error('Failed to fetch questions:', err)
                setError('Failed to load quiz questions.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchQuestions()
    }, [scenario.id])

    const handleOptionSelect = (optionId: number) => {
        if (isAnswered) return
        setSelectedOptionId(optionId)
    }

    const handleConfirm = () => {
        if (selectedOptionId === null || isAnswered) return

        const currentQuestion = questions[currentQuestionIdx]
        const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId)

        if (selectedOption?.is_correct) {
            setScore(prev => prev + currentQuestion.xp_reward)
        }

        setIsAnswered(true)
    }

    const handleNext = () => {
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1)
            setSelectedOptionId(null)
            setIsAnswered(false)
        } else {
            setIsFinished(true)
        }
    }

    const handleCollectRewards = async () => {
        if (!isLoggedIn || !username) {
            onBack() // No XP for guests, go back to Explore
            return
        }

        setIsSaving(true)
        try {
            await apiClient.post('/users/profiles/add_xp/', {
                username: username,
                amount: score
            })
            onComplete(score)
        } catch (err) {
            console.error('Failed to save XP:', err)
            // Still complete but maybe show error? 
            // For simplicity, we'll proceed but the user might notice XP didn't update if it failed.
            onComplete(score)
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
                <p className="text-text/50">Loading simulation challenges...</p>
            </div>
        )
    }

    if (error || questions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-400 mb-6">{error || 'No questions available for this scenario.'}</p>
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                    Return to Explore
                </button>
            </div>
        )
    }

    if (isFinished) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20 mb-8 mx-auto">
                        <Trophy className="w-12 h-12 text-gold" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Quest Complete!</h1>
                    <p className="text-text/50 text-xl mb-12">
                        You've completed the <span className="text-gold font-bold">{scenario.name_display}</span> challenge.
                    </p>

                    <div className="p-8 bg-paper/50 border border-gold/10 rounded-3xl mb-12">
                        <span className="text-text/40 uppercase tracking-widest text-xs font-bold mb-2 block">XP Gained</span>
                        <div className="text-6xl font-display font-bold text-gold">{isLoggedIn ? score : 0}</div>
                        {!isLoggedIn && (
                            <p className="text-red-400 text-xs mt-4 uppercase tracking-tighter font-bold">
                                Login to collect and save XP!
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleCollectRewards}
                        disabled={isSaving}
                        className="px-10 py-4 bg-gold text-background font-bold rounded-2xl text-lg hover:scale-105 transition-all shadow-xl shadow-gold/20 flex items-center gap-2"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                        {isLoggedIn ? 'COLLECT & SAVE REWARDS' : 'CONTINUE AS GUEST'}
                    </button>
                </motion.div>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIdx]

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
            {!isLoggedIn && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center gap-4 text-orange-200/80 text-sm"
                >
                    <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
                    <p>
                        <span className="font-bold text-orange-400">GUEST MODE:</span> You are not logged in. Your quiz progress and XP rewards will not be saved to your profile.
                    </p>
                </motion.div>
            )}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-text/40 hover:text-text mb-12 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Abort Mission
            </button>

            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-gold font-bold uppercase tracking-widest text-xs mb-1 block">
                            Challenge {currentQuestionIdx + 1} of {questions.length}
                        </span>
                        <h2 className="text-2xl font-display font-bold">{scenario.name_display}</h2>
                    </div>
                    <div className="text-right">
                        <span className="text-text/40 text-xs uppercase tracking-widest block mb-1">XP Potential</span>
                        <span className="text-gold font-bold">{currentQuestion.xp_reward} XP</span>
                    </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                        className="h-full bg-gold"
                    />
                </div>
            </div>

            <motion.div
                key={currentQuestionIdx}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mb-12"
            >
                <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10">
                    {currentQuestion.question_text}
                </h3>

                <div className="grid gap-4">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedOptionId === option.id
                        const showCorrect = isAnswered && option.is_correct
                        const showIncorrect = isAnswered && isSelected && !option.is_correct

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                disabled={isAnswered}
                                className={`p-6 rounded-2xl border text-left transition-all relative flex items-center justify-between group
                                    ${isSelected ? 'bg-gold/10 border-gold/50' : 'bg-white/5 border-white/10 hover:border-white/30'}
                                    ${showCorrect ? 'bg-green-500/10 border-green-500/50' : ''}
                                    ${showIncorrect ? 'bg-red-500/10 border-red-500/50' : ''}
                                    ${isAnswered && !isSelected && !showCorrect ? 'opacity-50' : ''}
                                `}
                            >
                                <span className={`text-lg transition-colors ${isSelected ? 'text-gold' : ''} ${showCorrect ? 'text-green-400' : ''} ${showIncorrect ? 'text-red-400' : ''}`}>
                                    {option.option_text}
                                </span>

                                {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                                {showIncorrect && <XCircle className="w-6 h-6 text-red-400" />}
                                {!isAnswered && isSelected && <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                            </button>
                        )
                    })}
                </div>
            </motion.div>

            <div className="flex justify-end">
                {!isAnswered ? (
                    <button
                        onClick={handleConfirm}
                        disabled={selectedOptionId === null}
                        className={`px-10 py-4 rounded-xl font-bold transition-all
                            ${selectedOptionId === null
                                ? 'bg-white/5 text-text/20 cursor-not-allowed'
                                : 'bg-gold text-background hover:scale-105 active:scale-95 shadow-lg shadow-gold/20'
                            }
                        `}
                    >
                        CONFIRM CHOICE
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-10 py-4 bg-white/10 border border-white/10 rounded-xl font-bold hover:bg-white/20 active:scale-95 transition-all flex items-center gap-2"
                    >
                        {currentQuestionIdx === questions.length - 1 ? 'FINISH QUEST' : 'NEXT CHALLENGE'}
                    </button>
                )}
            </div>
        </div>
    )
}
