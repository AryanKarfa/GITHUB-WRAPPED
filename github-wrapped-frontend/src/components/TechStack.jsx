import { PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137.508) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

const TechStack = ({ languages }) => {
  console.log('TechStack languages:', languages); // Debug log
  const languageArray = Array.isArray(languages) && languages.length ? languages : [{ language: 'N/A', value: 0 }];
  const dynamicColors = generateColors(languageArray.length);

  return (
    <div className="mt-20 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Top Languages Overview</h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-12 items-center justify-center"
      >
        <div className="w-full lg:w-1/2 h-96 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold text-white text-center mb-4">Pie Chart</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languageArray}
                dataKey="value"
                nameKey="language"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name} (${value}%)`}
                labelLine={true}
              >
                {languageArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={dynamicColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 h-96 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold text-white text-center mb-4">Bar Chart</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={languageArray} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <XAxis dataKey="language" tick={{ fill: '#ffffff' }} />
              <YAxis tick={{ fill: '#ffffff' }} unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#00bcd4" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default TechStack;