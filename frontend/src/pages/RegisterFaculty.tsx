import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const RegisterFaculty: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8081/api/faculty/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Success: Faculty Credentials Validated');
                navigate('/');
            } else {
                setError('Authorization failed. Access denied.');
            }
        } catch (err) {
            setError('Mainframe unreachable. System offline.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 w-full max-w-xl"
            >
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-400 transition-colors mb-6 group">
                        <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Return to Hub
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 text-blue-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Faculty <span className="text-blue-500">Node</span></h2>
                            <p className="text-slate-400">Section: Administrative Access</p>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Administrative Name</label>
                        <input 
                            type="text" 
                            className="neon-input text-white focus:border-blue-500"
                            placeholder="PROF. SAMANTHA VANCE"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Faculty Node Address (Email)</label>
                        <input 
                            type="email" 
                            className="neon-input text-white focus:border-blue-500"
                            placeholder="vance@nexus.io"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Authorization Code (Password)</label>
                        <input 
                            type="password" 
                            className="neon-input text-white focus:border-blue-500"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

                    <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit" 
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/10"
                    >
                        REQUEST ACCESS CLEARANCE
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterFaculty;
