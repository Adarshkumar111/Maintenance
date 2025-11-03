import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('');

  const roles = ['Admin', 'Staff', 'Supervisor', 'Store Supervisor'];

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - redirect based on selected role
    const roleMap = {
      'Admin': '/admin',
      'Staff': '/staff',
      'Supervisor': '/supervisor',
      'Store Supervisor': '/store-supervisor',
    };
    navigate(roleMap[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl bottom-0 left-0 animate-pulse delay-700"></div>
      </div>

      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(234, 179, 8, 0.2)" }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 text-primary-400 hover:text-primary-300 p-3 rounded-full backdrop-blur-sm border border-primary-500/30 transition-all duration-300 z-50"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="card-premium w-full max-w-md relative z-10"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold glow-text mb-3"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400"
            >
              Please login to continue
            </motion.p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Choose your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </motion.div>

            {/* User ID */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">User ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 w-5 h-5 transition-colors duration-300" />
                <input
                  type="text"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="input-field pl-12"
                  placeholder="Enter your ID"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 w-5 h-5 transition-colors duration-300" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-12"
                  placeholder="Enter password"
                  required
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(234, 179, 8, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary py-4 text-lg font-bold shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Login to Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <div className="inline-block px-4 py-2 rounded-lg bg-dark-100/50 backdrop-blur-sm border border-primary-500/20">
              <p className="text-sm text-gray-400">Demo: <span className="text-primary-400 font-semibold">Any ID & Password</span></p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
