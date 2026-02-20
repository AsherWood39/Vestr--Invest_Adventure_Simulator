import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, User, ChevronRight, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLoginSuccess: (userData: any) => void
    onSignUpClick: () => void
}

export function LoginModal({ isOpen, onClose, onLoginSuccess, onSignUpClick }: LoginModalProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'}/users/profiles/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.error || 'Login failed')
            }

            const profileData = await response.json()
            onLoginSuccess({
                username: profileData.user.username,
                avatar: profileData.avatar,
                goal: profileData.goal,
                xp: profileData.xp
            })
            onClose()
        } catch (err: any) {
            console.error('Login error:', err)
            setError(err.message || 'Invalid credentials')
        } finally {
            setIsLoading(false)
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
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-paper border border-white/10 rounded-[40px] p-10 z-60 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-text/40" />
                        </button>

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
                                <Lock className="w-8 h-8 text-gold" />
                            </div>
                            <h2 className="text-3xl font-display font-bold mb-2">Welcome Back</h2>
                            <p className="text-text/40">Enter your credentials to continue your quest.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-gold/50 outline-none transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-gold/50 outline-none transition-colors"
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={handleLogin}
                                disabled={!username || !password || isLoading}
                                className="w-full py-4 bg-gold text-background font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-text/40">
                            Don't have an account?{' '}
                            <button onClick={onSignUpClick} className="text-gold font-bold hover:underline">
                                Start Expedition
                            </button>
                        </p>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
