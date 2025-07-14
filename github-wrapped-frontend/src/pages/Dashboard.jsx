import { useEffect, useState } from 'react';
import TopRepos from '../components/TopRepos';
import TechStack from '../components/TechStack';
import ExportCard from '../components/ExportCard';
import StatCard from '../components/StatCard';
import { Toaster, toast } from 'sonner';
import { FaBook, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchWrapped = async () => {
      try {
        const res = await fetch(`${backend}/api/github/wrapped`, {
          credentials: 'include',
        });
        if (res.status === 401) {
          toast.error('Please log in with GitHub');
          navigate('/');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch wrapped data');
        const result = await res.json();
        console.log('Wrapped data:', result); // Debug log
        setData(result);
      } catch (err) {
        console.error('Fetch failed:', err);
        setError('Failed to load wrapped data.');
      }
    };
    fetchWrapped();
  }, [navigate, backend]);

  if (error) {
    return <div className="text-red-400 text-center mt-10">{error}</div>;
  }

  if (!data) {
    return <div className="text-gray-300 text-center mt-10">Loading your GitHub Wrapped...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 space-y-14">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-bold text-center text-yellow-400">🔥 Your Coding Journey</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Repositories" value={data.repoCount} icon={<FaBook />} />
        <StatCard title="Total Stars" value={data.stars} icon={<FaStar />} />
        <StatCard title="Total Commits" value={data.commits} icon={<FaCodeBranch />} />
        <StatCard title="Top Language" value={data.topLang} icon={<FaCode />} />
      </div>
      <section>
        <TechStack languages={data.topLanguages} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">📂 Top 5 Repositories</h2>
        <TopRepos repos={data.topRepos} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">📤 Share Your Wrapped</h2>
        <ExportCard data={data} />
      </section>
    </div>
  );
};

export default Dashboard;