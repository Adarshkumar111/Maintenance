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
        <h2 className="text-2xl font-bold">Material Requests</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
          <motion.div key={stat.title} whileHover={{ scale: 1.05, y: -5 }} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-4 rounded-xl`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {materialRequests.map((request) => (
          <motion.div
            key={request.id}
            whileHover={{ scale: 1.01, x: 5 }}
            className={`card border-l-4 ${request.status === 'available' ? 'border-green-500' : request.status === 'requested' ? 'border-red-500' : 'border-yellow-500'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{request.itemName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'available' ? 'bg-green-100 text-green-800' :
                    request.status === 'requested' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                  <div><span className="text-gray-500">Quantity:</span> <span className="ml-2 font-semibold">{request.quantity}</span></div>
                  <div><span className="text-gray-500">Room:</span> <span className="ml-2 font-semibold">{request.roomNo}</span></div>
                  <div><span className="text-gray-500">Requested By:</span> <span className="ml-2 font-semibold">{request.requestedBy}</span></div>
                  <div><span className="text-gray-500">Department:</span> <span className="ml-2 font-semibold">{request.department}</span></div>
                </div>
                {request.permissionId && (
                  <div className="mt-2 inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-mono">
                    Permission ID: {request.permissionId}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                {request.status === 'pending' && request.inStock && (
                  <button onClick={() => handleMarkAvailable(request)} className="btn-primary text-sm whitespace-nowrap">
                    Mark Available
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="w-64 bg-gradient-to-b from-orange-900 to-orange-800 text-white p-6 flex flex-col">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Store Portal</h1>
              <p className="text-orange-200 text-sm">Material Management</p>
            </div>
            <nav className="flex-1 space-y-2">
              {[
                { id: 'requests', icon: Package, label: 'Material Requests' },
                { id: 'profile', icon: User, label: 'My Profile' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id ? 'bg-orange-600 text-white' : 'text-orange-100 hover:bg-orange-700'
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
              className="flex items-center gap-3 px-4 py-3 text-orange-100 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold">{storeInfo.name}</p>
              <p className="text-sm text-gray-500">Store Supervisor - {storeInfo.empId}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
              {storeInfo.photo}
            </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPermissionModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Material Available!</h3>
                <p className="text-gray-600 mb-6">Share this Permission ID with the staff member</p>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Permission ID</p>
                  <div className="text-3xl font-bold text-purple-600 tracking-wider font-mono">{permissionId}</div>
                </div>
                <button
                  onClick={() => {
                    setMaterialRequests(materialRequests.map(r =>
                      r.id === selectedRequest.id ? { ...r, status: 'available', permissionId } : r
                    ));
                    setShowPermissionModal(false);
                  }}
                  className="btn-primary w-full py-3"
                >
                  Confirm & Notify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreSupervisorDashboard;
