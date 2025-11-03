import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Clock, CheckCircle, Calendar, Package,
  User, LogOut, Menu, X, Upload, AlertCircle, Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignments');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [workPhoto, setWorkPhoto] = useState(null);

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

  const staffInfo = {
    name: 'Rahul Kumar',
    empId: 'EMP001',
    department: 'Electrician',
    joinDate: '2023-01-15',
    photo: 'RK',
  };

  const assignments = [
    {
      id: 1,
      roomNo: '101',
      category: 'Electrical',
      description: 'Fan not working properly, making noise',
      urgency: 'high',
      assignedAt: '2024-11-03T10:30:00',
      deadline: '2024-11-03T16:30:00',
      status: 'pending',
      itsNo: 'ITS12345',
    },
    {
      id: 2,
      roomNo: '205',
      category: 'Electrical',
      description: 'Light flickering in bathroom',
      urgency: 'medium',
      assignedAt: '2024-11-03T09:00:00',
      deadline: '2024-11-03T18:00:00',
      status: 'in-progress',
      itsNo: 'ITS12346',
    },
    {
      id: 3,
      roomNo: 'Lobby',
      category: 'Electrical',
      description: 'Main chandelier bulbs need replacement',
      urgency: 'low',
      assignedAt: '2024-11-02T14:00:00',
      deadline: '2024-11-04T14:00:00',
      status: 'pending',
      itsNo: 'ITS12347',
    },
  ];

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleCompleteWork = () => {
    // Mock validation
    if (otpInput && workPhoto) {
      alert('Work completed successfully!');
      setShowCompleteModal(false);
      setOtpInput('');
      setWorkPhoto(null);
    }
  };

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">My Assignments</h2>
        <div className="flex gap-2">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-semibold backdrop-blur-sm"
          >
            {assignments.filter(a => a.urgency === 'high').length} High Priority
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-xl font-semibold backdrop-blur-sm"
          >
            {assignments.length} Total
          </motion.span>
        </div>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            whileHover={{ scale: 1.03, y: -8 }}
            className={`card-premium border-l-4 cursor-pointer group ${
              assignment.urgency === 'high' ? 'border-red-500' :
              assignment.urgency === 'medium' ? 'border-orange-500' :
              'border-green-500'
            }`}
            onClick={() => setSelectedComplaint(assignment)}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">Room {assignment.roomNo}</h3>
                <p className="text-sm text-gray-400">{assignment.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                assignment.urgency === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                assignment.urgency === 'medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                'bg-green-500/20 text-green-400 border border-green-500/50'
              }`}>
                {assignment.urgency}
              </span>
            </div>

            <p className="text-gray-300 mb-4 relative z-10">{assignment.description}</p>

            <div className="space-y-2 text-sm relative z-10">
              <div className="flex items-center gap-2 text-gray-400 p-2 bg-blue-950/30 rounded-lg">
                <Clock className="w-4 h-4 text-primary-400" />
                <span>Assigned: {new Date(assignment.assignedAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-red-400 font-semibold p-2 bg-red-950/30 rounded-lg animate-pulse">
                <Timer className="w-4 h-4" />
                <span>Time remaining: {getTimeRemaining(assignment.deadline)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 relative z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(assignment);
                  setShowCompleteModal(true);
                }}
                className="btn-primary flex-1 text-sm"
              >
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Complete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(assignment);
                  setShowMaterialModal(true);
                }}
                className="btn-secondary flex-1 text-sm"
              >
                <Package className="w-4 h-4 inline mr-1" />
                Request Material
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeaveRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Leave Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLeaveModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Request Leave
        </motion.button>
      </div>

      <div className="card-premium">
        <h3 className="text-xl font-bold text-white mb-4">Leave History</h3>
        <div className="space-y-3">
          {[
            { id: 1, from: '2024-10-15', to: '2024-10-17', reason: 'Medical', status: 'approved' },
            { id: 2, from: '2024-09-20', to: '2024-09-21', reason: 'Personal', status: 'approved' },
          ].map((leave) => (
            <motion.div 
              key={leave.id} 
              whileHover={{ x: 5, backgroundColor: 'rgba(30, 58, 138, 0.2)' }}
              className="flex justify-between items-center p-4 bg-blue-950/30 rounded-lg border border-blue-900/30 cursor-pointer"
            >
              <div>
                <p className="font-semibold text-white">{leave.from} to {leave.to}</p>
                <p className="text-sm text-gray-400">{leave.reason}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-sm font-semibold">
                {leave.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">My Profile</h2>

      <div className="card-premium">
        <div className="flex items-center gap-6 mb-6">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black text-3xl font-bold shadow-lg shadow-primary-500/50"
          >
            {staffInfo.photo}
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">{staffInfo.name}</h3>
            <p className="text-primary-400 font-semibold">{staffInfo.empId}</p>
            <p className="text-gray-400">{staffInfo.department} Department</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-400">Employee ID</p>
            <p className="font-semibold text-white">{staffInfo.empId}</p>
          </div>
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-400">Department</p>
            <p className="font-semibold text-white">{staffInfo.department}</p>
          </div>
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-400">Date of Joining</p>
            <p className="font-semibold text-white">{staffInfo.joinDate}</p>
          </div>
          <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-400">Total Assignments</p>
            <p className="font-semibold text-primary-400">{assignments.length}</p>
          </div>
        </div>
      </div>

      <div className="card-premium">
        <h3 className="text-xl font-bold text-white mb-4">Performance Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
          >
            <p className="text-3xl font-bold text-green-400">45</p>
            <p className="text-sm text-gray-400">Completed</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 bg-primary-500/20 border border-primary-500/30 rounded-lg"
          >
            <p className="text-3xl font-bold text-primary-400">3</p>
            <p className="text-sm text-gray-400">In Progress</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg"
          >
            <p className="text-3xl font-bold text-orange-400">4.8</p>
            <p className="text-sm text-gray-400">Avg Rating</p>
          </motion.div>
        </div>
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

      {/* Sidebar */}
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
                Staff Portal
              </motion.h1>
              <p className="text-gray-400 text-sm mt-1">{staffInfo.department}</p>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'assignments', icon: ClipboardList, label: 'My Assignments' },
                { id: 'leave', icon: Calendar, label: 'Leave Requests' },
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
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
              <p className="font-semibold text-white">{staffInfo.name}</p>
              <p className="text-sm text-gray-400">{staffInfo.empId}</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-primary-500/50"
            >
              {staffInfo.photo}
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'assignments' && renderAssignments()}
              {activeTab === 'leave' && renderLeaveRequests()}
              {activeTab === 'profile' && renderProfile()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Complete Work Modal */}
      <AnimatePresence>
        {showCompleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCompleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Complete Work</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter OTP from User</label>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="input-field"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Work Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setWorkPhoto(e.target.files[0])}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCompleteModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompleteWork}
                    className="btn-primary flex-1"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leave Request Modal */}
      <AnimatePresence>
        {showLeaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLeaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Request Leave</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reason</label>
                  <textarea className="input-field min-h-[100px]" placeholder="Enter reason"></textarea>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowLeaveModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Material Request Modal */}
      <AnimatePresence>
        {showMaterialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMaterialModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Request Material</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Item Name</label>
                  <input type="text" className="input-field" placeholder="Enter item name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input type="number" className="input-field" placeholder="Enter quantity" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea className="input-field min-h-[100px]" placeholder="Additional details"></textarea>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowMaterialModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Send Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffDashboard;
