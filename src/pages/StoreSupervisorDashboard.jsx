import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, CheckCircle, XCircle, AlertTriangle, User,
  LogOut, Menu, X, Search, Filter, TrendingUp, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';

const StoreSupervisorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [permissionId, setPermissionId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cardsRef = useRef(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
      });
    }
  }, [activeTab]);

  const storeInfo = {
    name: 'Suresh Patil',
    empId: 'STORE001',
    department: 'Store',
    photo: 'SP',
  };

  const [materialRequests, setMaterialRequests] = useState([
    { id: 1, itemName: 'LED Bulb 15W', quantity: 5, roomNo: '101', requestedBy: 'Rahul Kumar', department: 'Electrician', status: 'pending', requestDate: '2024-11-03T10:30:00', inStock: true },
    { id: 2, itemName: 'Pipe Fitting 2"', quantity: 2, roomNo: '205', requestedBy: 'Amit Patel', department: 'Plumbing', status: 'available', requestDate: '2024-11-03T09:00:00', inStock: true, permissionId: 'PRM12345' },
    { id: 3, itemName: 'Paint White 5L', quantity: 10, roomNo: 'Lobby', requestedBy: 'Vikram Singh', department: 'Maintenance', status: 'requested', requestDate: '2024-11-02T14:00:00', inStock: false },
  ]);

  const handleMarkAvailable = (request) => {
    const newPermissionId = 'PRM' + Math.floor(10000 + Math.random() * 90000);
    setSelectedRequest(request);
    setPermissionId(newPermissionId);
    setShowPermissionModal(true);
  };

  const handleVerifyPermission = (inputPermissionId) => {
    const request = materialRequests.find(r => r.permissionId === inputPermissionId);
    if (request) {
      setMaterialRequests(materialRequests.map(r =>
        r.id === request.id ? { ...r, status: 'collected', collectedAt: new Date().toISOString() } : r
      ));
      alert('Material collected successfully!');
    } else {
      alert('Invalid Permission ID');
    }
  };

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Material Requests</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search requests..."
              className="input-field pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Pending', value: materialRequests.filter(r => r.status === 'pending').length, color: 'bg-yellow-500', icon: Clock },
          { title: 'Available', value: materialRequests.filter(r => r.status === 'available').length, color: 'bg-green-500', icon: CheckCircle },
          { title: 'Out of Stock', value: materialRequests.filter(r => r.status === 'requested').length, color: 'bg-red-500', icon: XCircle },
          { title: 'Collected', value: materialRequests.filter(r => r.status === 'collected').length, color: 'bg-blue-500', icon: Package },
        ].map((stat) => (
          <motion.div key={stat.title} whileHover={{ scale: 1.05, y: -5 }} className="card-premium group">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
              </div>
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`${stat.color} p-4 rounded-xl shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300`}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {materialRequests.map((request) => (
          <motion.div
            key={request.id}
            whileHover={{ scale: 1.02, x: 8 }}
            className={`card-premium border-l-4 group ${request.status === 'available' ? 'border-green-500' : request.status === 'requested' ? 'border-red-500' : 'border-yellow-500'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">{request.itemName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    request.status === 'available' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    request.status === 'requested' ? 'bg-red-500/20 text-red-400 border-red-500/50' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-3">
                  <div><span className="text-gray-500">Quantity:</span> <span className="ml-2 font-semibold text-white">{request.quantity}</span></div>
                  <div><span className="text-gray-500">Room:</span> <span className="ml-2 font-semibold text-white">{request.roomNo}</span></div>
                  <div><span className="text-gray-500">Requested By:</span> <span className="ml-2 font-semibold text-white">{request.requestedBy}</span></div>
                  <div><span className="text-gray-500">Department:</span> <span className="ml-2 font-semibold text-white">{request.department}</span></div>
                </div>
                {request.permissionId && (
                  <div className="mt-2 inline-block px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-lg text-sm font-mono">
                    Permission ID: {request.permissionId}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                {request.status === 'pending' && request.inStock && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMarkAvailable(request)} 
                    className="btn-primary text-sm whitespace-nowrap"
                  >
                    Mark Available
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-blue-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-0 right-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl bottom-0 left-1/4 animate-pulse delay-1000"></div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: -300 }} 
            animate={{ x: 0 }} 
            exit={{ x: -300 }} 
            className="w-64 bg-gradient-to-b from-gray-900/95 via-blue-950/95 to-gray-900/95 backdrop-blur-xl border-r border-blue-900/50 text-white p-6 flex flex-col relative z-10"
          >
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold glow-text"
              >
                Store Portal
              </motion.h1>
              <p className="text-gray-400 text-sm mt-1">Material Management</p>
            </div>
            <nav className="flex-1 space-y-2">
              {[
                { id: 'requests', icon: Package, label: 'Material Requests' },
                { id: 'profile', icon: User, label: 'My Profile' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-black font-semibold shadow-lg shadow-primary-500/50' 
                      : 'text-gray-300 hover:bg-blue-900/30 hover:text-primary-400 border border-transparent hover:border-primary-500/30'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/', { replace: true })} 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="bg-gradient-to-r from-dark-50/90 to-blue-950/90 backdrop-blur-xl border-b border-blue-900/50 shadow-lg px-6 py-4 flex items-center justify-between">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(234, 179, 8, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 hover:bg-primary-500/10 rounded-lg text-gray-300 hover:text-primary-400 transition-all duration-300 border border-transparent hover:border-primary-500/30"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-white">{storeInfo.name}</p>
              <p className="text-sm text-gray-400">Store Supervisor - {storeInfo.empId}</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-primary-500/50"
            >
              {storeInfo.photo}
            </motion.div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {activeTab === 'requests' && renderRequests()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showPermissionModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
            onClick={() => setShowPermissionModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 50 }} 
              className="card-premium max-w-md w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.2, type: 'spring' }} 
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Material Available!</h3>
                <p className="text-gray-400 mb-6">Share this Permission ID with the staff member</p>
                <div className="bg-primary-500/20 border-2 border-primary-500/50 rounded-xl p-6 mb-6 backdrop-blur-sm">
                  <p className="text-sm text-gray-400 mb-2">Permission ID</p>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl font-bold text-primary-400 tracking-wider font-mono"
                  >
                    {permissionId}
                  </motion.div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMaterialRequests(materialRequests.map(r =>
                      r.id === selectedRequest.id ? { ...r, status: 'available', permissionId } : r
                    ));
                    setShowPermissionModal(false);
                  }}
                  className="btn-primary w-full py-3"
                >
                  Confirm & Notify
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreSupervisorDashboard;
