import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Event } from '../types';
import { 
    Plus, Trash2, Edit2, LogOut, Filter, X, Check, 
    LayoutDashboard, Users, Calendar, Settings, 
    ArrowRight, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const FacultyDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        studentName: '',
        rollNumber: '',
        eventName: '',
        location: '',
        date: '',
        description: ''
    });

    const navigate = useNavigate();
    const facultyId = localStorage.getItem('facultyId');

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/events/faculty/${facultyId}`);
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

    const handleAction = async (method: string, endpoint: string, body?: any, successMsg?: string) => {
        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Faculty-Id': facultyId || ''
                },
                body: body ? JSON.stringify(body) : undefined
            });

            if (response.ok) {
                alert(`SUCCESS: ${successMsg}`);
                fetchMyEvents();
                return true;
            } else {
                alert('ERROR: ACTION REJECTED BY SERVER');
                return false;
            }
        } catch (err) {
            alert('CRITICAL: CONNECTION TIMEOUT');
            return false;
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleAction('POST', 'http://localhost:8083/api/events', { ...formData, facultyId }, 'RECORD INITIALIZED');
        if (success) {
            setIsAdding(false);
            setFormData({ studentName: '', rollNumber: '', eventName: '', location: '', date: '', description: '' });
        }
    };

    const months = [
        { val: '1', name: 'JAN' }, { val: '2', name: 'FEB' }, { val: '3', name: 'MAR' },
        { val: '4', name: 'APR' }, { val: '5', name: 'MAY' }, { val: '6', name: 'JUN' },
        { val: '7', name: 'JUL' }, { val: '8', name: 'AUG' }, { val: '9', name: 'SEP' },
        { val: '10', name: 'OCT' }, { val: '11', name: 'NOV' }, { val: '12', name: 'DEC' }
    ];

    const filteredEvents = selectedMonth === 'All' 
        ? events 
        : events.filter(e => new Date(e.date).getMonth() + 1 === parseInt(selectedMonth));

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-200">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase">Command</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { icon: LayoutDashboard, name: 'Mainframe', active: true },
                        { icon: Users, name: 'Student Nodes', active: false },
                        { icon: Calendar, name: 'Timeline', active: false },
                        { icon: Settings, name: 'Config', active: false },
                    ].map((item, i) => (
                        <button key={i} className={cn(
                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest",
                            item.active ? "bg-white/10 text-blue-400 border border-white/5" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                        )}>
                            <item.icon size={18} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="px-4 py-4 rounded-2xl bg-slate-900/80 mb-6 border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">FACULTY NODE</p>
                        <p className="text-xs font-mono text-blue-400 truncate">{facultyId}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        <LogOut size={18} />
                        Disconnect
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 relative">
                <div className="max-w-7xl mx-auto">
                    <header className="flex justify-between items-center mb-12">
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">
                                Central <span className="text-blue-500">Log</span>
                            </h2>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Operational Data Stream</p>
                        </motion.div>

                        <div className="flex gap-4">
                            <div className="glass px-4 rounded-xl flex items-center gap-3">
                                <Filter size={16} className="text-blue-500" />
                                <select 
                                    className="bg-transparent text-xs font-bold uppercase tracking-widest py-3 outline-none"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="All" className="bg-slate-900">Universal</option>
                                    {months.map(m => <option key={m.val} value={m.val} className="bg-slate-900">{m.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </header>

                    {/* Table Area */}
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5 bg-white/[0.02]">
                                <tr className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">
                                    <th className="px-8 py-5">Node Identity</th>
                                    <th className="px-8 py-5">Event Sector</th>
                                    <th className="px-8 py-5">Timestamp</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {filteredEvents.map((event) => (
                                        <motion.tr 
                                            key={event.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="group hover:bg-white/[0.03] transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-white text-sm">{event.studentName}</div>
                                                <div className="font-mono text-[10px] text-blue-500 uppercase">{event.rollNumber}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {editingId === event.id ? (
                                                    <input 
                                                        type="text" 
                                                        className="bg-slate-900 border border-blue-500/50 rounded px-2 py-1 text-sm outline-none" 
                                                        value={formData.eventName} 
                                                        onChange={e => setFormData({...formData, eventName: e.target.value})} 
                                                    />
                                                ) : (
                                                    <div className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors uppercase tracking-wide">
                                                        {event.eventName}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-mono text-slate-500">
                                                    {new Date(event.date).toISOString().split('T')[0]}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {editingId === event.id ? (
                                                        <>
                                                            <button onClick={() => setEditingId(null)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg"><Check size={18} /></button>
                                                            <button onClick={() => setEditingId(null)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><X size={18} /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => navigate('/student-dashboard')} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded-lg"><ArrowRight size={18} /></button>
                                                            <button onClick={() => setEditingId(event.id!)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"><Edit2 size={18} /></button>
                                                            <button onClick={() => handleAction('DELETE', `http://localhost:8083/api/events/${event.id}`)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg"><Trash2 size={18} /></button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredEvents.length === 0 && !loading && (
                            <div className="py-20 text-center font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">
                                Search result: zero matches in sector
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Action Button */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAdding(true)}
                    className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center border-4 border-[#020617] group overflow-hidden"
                >
                    <Plus size={32} />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                {/* Add Event Modal Overlay */}
                <AnimatePresence>
                    {isAdding && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20 overflow-auto pt-20">
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAdding(false)}
                                className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="glass-card w-full max-w-2xl p-10 relative z-10"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-white">NEW <span className="text-blue-500">DATA ENTRY</span></h3>
                                    <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                                </div>

                                <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Target Student Name</label>
                                        <input 
                                            type="text" className="neon-input focus:border-blue-500 text-white font-bold"
                                            value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value.toUpperCase()})} required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Subject Node ID (Roll)</label>
                                        <input 
                                            type="text" className="neon-input focus:border-blue-500 text-white font-mono"
                                            value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value.toUpperCase()})} required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Event Sector Name</label>
                                        <input 
                                            type="text" className="neon-input focus:border-blue-500 text-white font-bold"
                                            value={formData.eventName} onChange={e => setFormData({...formData, eventName: e.target.value})} required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Data Coordinate (Location)</label>
                                        <input 
                                            type="text" className="neon-input focus:border-blue-500 text-white"
                                            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Timeline Sync (Date)</label>
                                        <input 
                                            type="date" className="neon-input focus:border-blue-500 text-white appearance-none"
                                            value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Detailed Log (Description)</label>
                                        <textarea 
                                            className="neon-input focus:border-blue-500 text-white h-24 resize-none"
                                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20"
                                        >
                                            COMMIT RECORD TO BLOCKCHAIN
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default FacultyDashboard;
