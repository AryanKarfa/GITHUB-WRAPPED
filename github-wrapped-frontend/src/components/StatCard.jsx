// src/components/StatCard.jsx
export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-md p-6 h-full flex flex-col items-center justify-center text-center border border-gray-700 hover:scale-[1.02] transition-all duration-300">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
