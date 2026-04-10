import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Role } from '../types';
import { cn } from '../utils/cn';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('Student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const endpoint = role === 'Student' 
            ? 'http://localhost:8082/api/student/login' 
            : 'http://localhost:8081/api/faculty/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('role', role);
                localStorage.setItem('session', JSON.stringify(data));
                
                if (role === 'Student') {
                    localStorage.setItem('rollNumber', data.rollNumber);
                    navigate('/student-dashboard');
                } else {
                    localStorage.setItem('facultyId', data.id);
                    navigate('/faculty-dashboard');
                }
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-10 w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-2">
                        Nexus<span className="text-cyan-500">Portal</span>
                    </h2>
                    <p className="text-slate-400 text-sm">Sign in to your dashboard</p>
                </div>

                <div className="relative flex bg-slate-900/50 rounded-xl p-1 mb-8">
                    <motion.div 
                        className="absolute inset-y-1 bg-white/10 rounded-lg shadow-sm"
                        initial={false}
                        animate={{ x: role === 'Student' ? 0 : '100%' }}
                        style={{ width: '50%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button 
                        className={cn(
                            "relative z-10 flex-1 py-2 text-sm font-bold transition-colors duration-200",
                            role === 'Student' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        )}
                        onClick={() => setRole('Student')}
                    >
                        Student
                    </button>
                    <button 
                        className={cn(
                            "relative z-10 flex-1 py-2 text-sm font-bold transition-colors duration-200",
                            role === 'Faculty' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        )}
                        onClick={() => setRole('Faculty')}
                    >
                        Faculty
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Email</label>
                        <input 
                            type="email" 
                            className="neon-input text-white placeholder:text-slate-600"
                            placeholder="user@nexus.io"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Password</label>
                        <input 
                            type="password" 
                            className="neon-input text-white placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {error && (
                        <motion.p 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-400 text-sm font-medium text-center"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black rounded-xl transition-all duration-300 shadow-xl shadow-blue-900/20 tracking-tighter"
                    >
                        ACCESS {role.toUpperCase()} CORE
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        New here? 
                        <Link 
                            to={role === 'Student' ? '/register-student' : '/register-faculty'} 
                            className="ml-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                        >
                            Create {role} Identity
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
