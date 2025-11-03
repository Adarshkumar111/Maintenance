import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, Users, Shield, Package, QrCode, TrendingUp, Home, MapPin, AlertCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const userOptions = [
    { 
      title: 'Room Complaint', 
      icon: Home, 
      color: 'from-blue-500 to-cyan-600', 
      path: '/complaint/room/101',
      description: 'Report issues in your room',
      badge: 'Scan QR or Enter Room No.'
    },
    { 
      title: 'Area Complaint', 
      icon: MapPin, 
      color: 'from-green-500 to-emerald-600', 
      path: '/complaint/area/Lobby',
      description: 'Report common area issues',
      badge: 'No OTP Required'
    },
  ];

  const roles = [
    { title: 'Admin', icon: Shield, color: 'from-purple-500 to-indigo-600', path: '/admin' },
    { title: 'Staff', icon: Users, color: 'from-blue-500 to-cyan-600', path: '/staff' },
    { title: 'Supervisor', icon: Wrench, color: 'from-green-500 to-emerald-600', path: '/supervisor' },
    { title: 'Store Supervisor', icon: Package, color: 'from-orange-500 to-red-600', path: '/store-supervisor' },
  ];

  const features = [
    { 
      icon: QrCode, 
      title: 'QR-Based Complaints', 
      description: 'Easy complaint registration via QR codes',
      action: () => {
        // Scroll to user complaint section
        document.getElementById('file-complaint')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: TrendingUp, 
      title: 'Real-time Analytics', 
      description: 'Track performance and trends instantly',
      action: () => navigate('/login')
    },
    { 
      icon: Users, 
      title: 'Staff Management', 
      description: 'Efficient assignment and tracking',
      action: () => navigate('/login')
    },
    { 
      icon: Shield, 
      title: 'Role-Based Access', 
      description: 'Secure access for different roles',
      action: () => navigate('/login')
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
        <div className="absolute w-72 h-72 bg-primary-400/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              textShadow: [
                "0 0 20px rgba(234, 179, 8, 0.5)",
                "0 0 40px rgba(234, 179, 8, 0.8)",
                "0 0 20px rgba(234, 179, 8, 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <h1 className="text-7xl font-bold glow-text mb-4 animate-float">
              Maintenance Management
            </h1>
            <h2 className="text-5xl font-bold text-white">System</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Premium solution for streamlined maintenance operations with AI-powered insights
          </motion.p>
        </motion.div>

        {/* User Complaint Section */}
        <motion.div
          id="file-complaint"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <h2 className="text-4xl font-bold text-primary-400 mb-3 flex items-center justify-center gap-3">
                <AlertCircle className="w-10 h-10" />
                File a Complaint
              </h2>
            </motion.div>
            <p className="text-gray-400 text-lg">Quick and easy complaint registration for users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.6 + index * 0.2, 
                  duration: 0.8,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="cursor-pointer group"
                onClick={() => navigate(option.path)}
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-dark-100/80 via-dark-100/60 to-dark-100/80 backdrop-blur-xl border-2 border-primary-500/30 group-hover:border-primary-400/60 overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/30 transition-all duration-300">
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary-500/20 border border-primary-400/50 rounded-full text-xs text-primary-300 font-semibold">
                    {option.badge}
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mb-6 inline-block p-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/30 group-hover:border-primary-400/60 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300"
                  >
                    <option.icon className="w-16 h-16 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                      {option.title}
                    </h3>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "80%" }}
                      className="h-1 bg-gradient-to-r from-primary-400 via-primary-300 to-transparent mb-4 rounded-full"
                    ></motion.div>
                    
                    <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors duration-300">
                      {option.description}
                    </p>
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-md mx-auto mb-16"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
          <p className="text-center text-gray-500 text-sm mt-4">Staff Portal Access Below</p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -15,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="cursor-pointer group perspective-1000"
              onClick={() => navigate(role.path)}
            >
              <div className="relative card-premium h-full flex flex-col items-center justify-center text-center overflow-hidden group-hover:shadow-primary-500/50">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/0 via-primary-500/0 to-primary-600/0 group-hover:from-primary-400/10 group-hover:via-primary-500/20 group-hover:to-primary-600/10 transition-all duration-500"></div>
                
                {/* Icon with glow */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 mb-6 p-6 rounded-2xl bg-dark-100/50 backdrop-blur-sm border border-primary-500/30 group-hover:border-primary-400/60 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300"
                >
                  <role.icon className="w-16 h-16 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300 relative z-10">
                  {role.title}
                </h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent mb-2"
                ></motion.div>
                
                <p className="text-gray-400 text-sm relative z-10">Access {role.title} Portal</p>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Key Features</h2>
            <p className="text-gray-400">Powerful tools for efficient maintenance management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={feature.action}
                className="group cursor-pointer"
              >
                <div className="card relative overflow-hidden h-full">
                  {/* Animated border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-400/50 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block mb-4 p-4 rounded-xl bg-dark-100/50 border border-primary-500/20 group-hover:border-primary-400/50 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300"
                    >
                      <feature.icon className="w-12 h-12 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    <p className="text-xs text-primary-400/60 group-hover:text-primary-300 mt-3 font-semibold transition-all duration-300">
                      Click to explore →
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-12 py-5 rounded-2xl text-xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-black overflow-hidden shadow-2xl shadow-primary-500/50 hover:shadow-primary-400/70 transition-all duration-300"
          >
            <span className="relative z-10">Get Started Now</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-gray-500 text-sm"
          >
            No credit card required • Free demo access
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
