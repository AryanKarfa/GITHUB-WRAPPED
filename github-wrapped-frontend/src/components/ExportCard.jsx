import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ExportCard = ({ data }) => {
  const cardRef = useRef();

  const handleDownload = () => {
    if (cardRef.current === null) return;
    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'github-wrapped.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Download failed:', err);
      });
  };

  if (!data) {
    return <div className="text-center text-gray-400 mt-12">Loading snapshot card...</div>;
  }

  return (
    <div className="mt-16 flex flex-col items-center px-4">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-purple-800 via-indigo-900 to-black p-8 rounded-xl shadow-2xl text-white w-full max-w-2xl border border-purple-600"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Your Coding Journey — Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <p><strong>Repos:</strong> {data.repoCount ?? '-'}</p>
          <p><strong>Stars:</strong> {data.stars ?? '-'}</p>
          <p><strong>Commits:</strong> {data.commits ?? '-'}</p>
          <p><strong>Top Language:</strong> {data.topLang ?? '-'}</p>
        </div>
        {data.topLanguages?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Top 5 Languages</h3>
            <ul className="list-disc list-inside text-gray-300">
              {data.topLanguages.slice(0, 5).map((lang, idx) => (
                <li key={idx}>
                  {lang.language} ({lang.value}%)
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
      <Button
        onClick={handleDownload}
        className="mt-6 bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        Download Snapshot
      </Button>
    </div>
  );
};

export default ExportCard;