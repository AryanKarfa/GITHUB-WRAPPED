import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Landing = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL || ''}/auth/github`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        GitHub Wrapped
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your Time in Code, Visualized....
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button className="text-lg px-6 py-3" onClick={handleLogin}>
          Login with GitHub
        </Button>
      </motion.div>
    </div>
  );
};

export default Landing;
