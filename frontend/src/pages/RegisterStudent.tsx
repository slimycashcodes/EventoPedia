import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft } from 'lucide-react';

const RegisterStudent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8082/api/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Success: Student Identity Generated');
                navigate('/');
            } else {
                setError('Registration failed. Data rejected.');
            }
        } catch (err) {
            setError('System offline. Connectivity issue.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-10 w-full max-w-xl"
            >
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center text-slate-500 hover:text-cyan-400 transition-colors mb-6 group">
                        <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Portal
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                            <UserPlus size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Generate <span className="text-cyan-500">Identity</span></h2>
                            <p className="text-slate-400">Section: Student Enrollment</p>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Full Operator Name</label>
                        <input 
                            type="text" 
                            className="neon-input text-white"
                            placeholder="ALEX MERCER"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Assigned ID (Roll No)</label>
                        <input 
                            type="text" 
                            className="neon-input text-white"
                            placeholder="NX-001"
                            value={formData.rollNumber}
                            onChange={(e) => setFormData({...formData, rollNumber: e.target.value.toUpperCase()})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Neural Net Address (Email)</label>
                        <input 
                            type="email" 
                            className="neon-input text-white"
                            placeholder="alex@nexus.io"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Access Key (Password)</label>
                        <input 
                            type="password" 
                            className="neon-input text-white"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    {error && <p className="md:col-span-2 text-red-400 text-sm font-medium text-center">{error}</p>}

                    <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit" 
                        className="md:col-span-2 mt-4 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-xl transition-all duration-300 tracking-widest"
                    >
                        INITIALIZE ENROLLMENT
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterStudent;
