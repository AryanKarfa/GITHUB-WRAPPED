import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';

function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  return <div className="text-white text-center mt-10">Authenticating...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;