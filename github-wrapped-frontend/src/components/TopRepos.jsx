import { motion } from 'framer-motion';
import { FaCodeBranch, FaStar, FaCode, FaCodepen } from 'react-icons/fa';

const TopRepos = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return <div className="text-center text-gray-400 mt-8">No repositories to display</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Top Repositories</h2>
      <div className="flex flex-col gap-6 px-2 md:px-20">
        {repos.slice(0, 5).map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 hover:scale-[1.01] transition"
          >
            <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{repo.description || 'No description'}</p>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <FaCodeBranch /> {repo.commits || 0} commits
              </span>
              <span className="flex items-center gap-1">
                <FaStar /> {repo.stars || 0} stars
              </span>
              <span className="flex items-center gap-1">
                <FaCodepen /> {repo.forks || 0} forks
              </span>
              <span className="flex items-center gap-1">
                <FaCode /> {repo.language || 'N/A'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopRepos;