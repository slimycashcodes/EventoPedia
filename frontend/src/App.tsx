import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterFaculty from './pages/RegisterFaculty';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Flashlight from './components/Flashlight';
import { AnimatePresence, motion } from 'framer-motion';

function ProtectedRoute({ children, role }: { children: React.ReactElement; role: 'Faculty' | 'Student' }) {
  const storedRole = localStorage.getItem('role');
  const session = localStorage.getItem('session');
  
  if (!session || storedRole !== role) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#020617] selection:bg-cyan-500/30">
        <Flashlight />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register-student" element={<PageWrapper><RegisterStudent /></PageWrapper>} />
            <Route path="/register-faculty" element={<PageWrapper><RegisterFaculty /></PageWrapper>} />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute role="Student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/faculty-dashboard" 
              element={
                <ProtectedRoute role="Faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
