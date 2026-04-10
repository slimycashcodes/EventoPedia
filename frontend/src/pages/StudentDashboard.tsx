import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types';
import { Search, LogOut, MapPin, Calendar, User, LayoutDashboard, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const rollNumber = localStorage.getItem('rollNumber');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/events/student/${rollNumber}`);
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (err) {
            console.error('Failed to fetch events', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const filteredEvents = events.filter(event => 
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            {/* Sidebar / Topbar for Student */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
                            Aura<span className="text-cyan-500">Events</span>
                        </h1>
                        <div className="flex items-center gap-2 text-slate-400">
                            <User size={16} className="text-cyan-500" />
                            <span className="font-mono text-sm uppercase tracking-widest">{rollNumber}</span>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="DECRYPT EVENT NAME..." 
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-xs uppercase tracking-widest"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl transition-all"
                            title="Disconnect Session"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Synchronizing Data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id || index}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative"
                                >
                                    <div className="glass-card h-full p-8 transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-white/20 overflow-hidden">
                                        {/* Border Beam Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="border-beam" />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                                                    <Zap size={20} />
                                                </div>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                                                    ID: {event.id?.slice(-6)}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors tracking-tight">
                                                {event.eventName}
                                            </h3>
                                            
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {event.description}
                                            </p>

                                            <div className="space-y-4 border-t border-white/5 pt-6">
                                                <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    <MapPin size={14} className="mr-3 text-cyan-500" />
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    <Calendar size={14} className="mr-3 text-blue-500" />
                                                    {new Date(event.date).toLocaleDateString(undefined, { 
                                                        month: 'short', day: 'numeric', year: 'numeric' 
                                                    })}
                                                </div>
                                                <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    <User size={14} className="mr-3 text-indigo-500" />
                                                    {event.studentName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredEvents.length === 0 && !loading && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-40 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600"
                            >
                                <LayoutDashboard size={48} className="mb-4 opacity-20" />
                                <p className="font-mono text-xs uppercase tracking-widest">No matching records found in local node</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
