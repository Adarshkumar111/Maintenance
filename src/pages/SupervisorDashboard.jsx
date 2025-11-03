import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Users, Calendar, TrendingUp, Package,
  User, LogOut, Menu, X, CheckCircle, XCircle, Clock,
  AlertTriangle, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData } from '../lib/utils';
import gsap from 'gsap';

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('complaints');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

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

  const supervisorInfo = {
    name: 'Vikram Singh',
    empId: 'SUP001',
    department: 'Maintenance',
    photo: 'VS',
  };

  const staffPerformance = [
    { name: 'Rahul', completed: 45, pending: 3, avgTime: '2.5h' },
    { name: 'Amit', completed: 38, pending: 2, avgTime: '3.1h' },
    { name: 'Priya', completed: 52, pending: 4, avgTime: '2.2h' },
    { name: 'Sneha', completed: 41, pending: 1, avgTime: '2.8h' },
  ];

  const attendanceData = [
    { name: 'Mon', present: 8, absent: 0 },
    { name: 'Tue', present: 7, absent: 1 },
    { name: 'Wed', present: 8, absent: 0 },
    { name: 'Thu', present: 6, absent: 2 },
    { name: 'Fri', present: 8, absent: 0 },
  ];

  const renderComplaints = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Complaint Management</h2>
        <div className="flex gap-2">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl font-semibold backdrop-blur-sm"
          >
            {mockData.complaints.filter(c => !c.assignedTo).length} Unassigned
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-xl font-semibold backdrop-blur-sm"
          >
            {mockData.complaints.length} Total
          </motion.span>
        </div>
      </div>

      <div ref={cardsRef} className="space-y-4">
        {mockData.complaints.map((complaint) => (
          <motion.div
            key={complaint.id}
            whileHover={{ scale: 1.02, x: 8 }}
            className="card-premium border-l-4 border-primary-500 cursor-pointer group"
            onClick={() => {
              setSelectedComplaint(complaint);
              setShowAssignModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">#{complaint.id} - Room {complaint.roomNo}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.urgency === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                    complaint.urgency === 'medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                    'bg-green-500/20 text-green-400 border border-green-500/50'
                  }`}>
                    {complaint.urgency}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                    complaint.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{complaint.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary-400" />
                    {new Date(complaint.createdAt).toLocaleString()}
                  </span>
                  <span>Category: {complaint.category}</span>
                  {complaint.assignedTo && (
                    <span className="text-primary-400 font-semibold">
                      Assigned to: {complaint.assignedTo}
                    </span>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(complaint);
                  setShowAssignModal(true);
                }}
                className="btn-primary text-sm"
              >
                {complaint.assignedTo ? 'Reassign' : 'Assign'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Staff Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAttendanceModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Mark Attendance
        </motion.button>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staffPerformance.map((staff, index) => (
          <motion.div
            key={staff.name}
            whileHover={{ scale: 1.05, y: -8 }}
            className="card-premium group"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black text-xl font-bold shadow-lg shadow-primary-500/50"
              >
                {staff.name.substring(0, 2)}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">{staff.name}</h3>
                <p className="text-gray-400">EMP00{index + 1}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-2xl font-bold text-green-400">{staff.completed}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <p className="text-2xl font-bold text-orange-400">{staff.pending}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center p-3 bg-primary-500/20 border border-primary-500/30 rounded-lg">
                <p className="text-2xl font-bold text-primary-400">{staff.avgTime}</p>
                <p className="text-xs text-gray-400">Avg Time</p>
              </motion.div>
            </div>

            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary flex-1 text-sm">View Details</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex-1 text-sm">Assign Work</motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attendance Chart */}
      <div className="card-premium">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="present" fill="#10b981" name="Present" />
            <Bar dataKey="absent" fill="#ef4444" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderLeaveManagement = () => (
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
          Request Leave (Admin)
        </motion.button>
      </div>

      <div className="card-premium">
        <h3 className="text-xl font-bold text-white mb-4">Pending Leave Requests</h3>
        <div className="space-y-4">
          {mockData.leaveRequests.map((request) => (
            <motion.div
              key={request.id}
              whileHover={{ backgroundColor: 'rgba(30, 58, 138, 0.2)' }}
              className="flex justify-between items-center p-4 border border-blue-900/30 rounded-lg bg-blue-950/30"
            >
              <div className="flex-1">
                <h4 className="font-bold text-white">{request.staffName}</h4>
                <p className="text-sm text-gray-400">{request.empId}</p>
                <p className="text-sm text-gray-300 mt-1">
                  {request.fromDate} to {request.toDate}
                </p>
                <p className="text-sm text-gray-400">Reason: {request.reason}</p>
              </div>
              <div className="flex gap-2">
                {request.status === 'pending' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </motion.button>
                  </>
                ) : (
                  <span className={`px-4 py-2 rounded-lg font-semibold border ${
                    request.status === 'approved' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                      : 'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}>
                    {request.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMaterialRequests = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Material Requests</h2>

      <div className="space-y-4">
        {mockData.materialRequests.map((request) => (
          <motion.div
            key={request.id}
            whileHover={{ scale: 1.02, x: 5 }}
            className="card-premium border-l-4 border-primary-500 group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">{request.itemName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    request.status === 'available' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    request.status === 'requested' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Quantity: <span className="font-semibold">{request.quantity}</span></p>
                  <p>Room: <span className="font-semibold">{request.roomNo}</span></p>
                  <p>Requested by: <span className="font-semibold">{request.requestedBy}</span></p>
                  <p>Department: <span className="font-semibold">{request.department}</span></p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {request.status === 'pending' && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-sm"
                  >
                    Forward to Store
                  </motion.button>
                )}
                {request.status === 'available' && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-sm"
                  >
                    Generate Permission ID
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Analytics & Reports</h2>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Complaints', value: '45', icon: ClipboardList, color: 'bg-blue-500' },
          { title: 'Resolved Today', value: '12', icon: CheckCircle, color: 'bg-green-500' },
          { title: 'Active Staff', value: '8', icon: Users, color: 'bg-purple-500' },
          { title: 'Avg Resolution', value: '2.5h', icon: TrendingUp, color: 'bg-orange-500' },
        ].map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.05, y: -5 }}
            className="card-premium group"
          >
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

      <div className="card-premium">
        <h3 className="text-xl font-bold text-white mb-4">Staff Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={staffPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium">
          <h3 className="text-xl font-bold text-white mb-4">Top Performers</h3>
          <div className="space-y-3">
            {staffPerformance
              .sort((a, b) => b.completed - a.completed)
              .slice(0, 3)
              .map((staff, index) => (
                <motion.div 
                  key={staff.name} 
                  whileHover={{ x: 5, backgroundColor: 'rgba(30, 58, 138, 0.2)' }}
                  className="flex items-center gap-3 p-3 bg-blue-950/30 rounded-lg border border-blue-900/30"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    'bg-orange-400 text-orange-900'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{staff.name}</p>
                    <p className="text-sm text-gray-400">{staff.completed} completed tasks</p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-500" />
                </motion.div>
              ))}
          </div>
        </div>

        <div className="card-premium">
          <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between p-3 bg-blue-950/30 rounded-lg border border-blue-900/30"
            >
              <span className="text-gray-400">Total Tasks This Month</span>
              <span className="font-bold text-white">176</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between p-3 bg-blue-950/30 rounded-lg border border-blue-900/30"
            >
              <span className="text-gray-400">Success Rate</span>
              <span className="font-bold text-green-400">94%</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between p-3 bg-blue-950/30 rounded-lg border border-blue-900/30"
            >
              <span className="text-gray-400">Avg Response Time</span>
              <span className="font-bold text-primary-400">15 min</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between p-3 bg-blue-950/30 rounded-lg border border-blue-900/30"
            >
              <span className="text-gray-400">Staff Utilization</span>
              <span className="font-bold text-purple-400">87%</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-blue-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse delay-1000"></div>
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
                Supervisor Panel
              </motion.h1>
              <p className="text-gray-400 text-sm mt-1">{supervisorInfo.department}</p>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'complaints', icon: ClipboardList, label: 'Complaints' },
                { id: 'staff', icon: Users, label: 'Staff Management' },
                { id: 'leave', icon: Calendar, label: 'Leave Requests' },
                { id: 'materials', icon: Package, label: 'Materials' },
                { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
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
              <p className="font-semibold text-white">{supervisorInfo.name}</p>
              <p className="text-sm text-gray-400">Supervisor - {supervisorInfo.empId}</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-primary-500/50"
            >
              {supervisorInfo.photo}
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
              {activeTab === 'complaints' && renderComplaints()}
              {activeTab === 'staff' && renderStaff()}
              {activeTab === 'leave' && renderLeaveManagement()}
              {activeTab === 'materials' && renderMaterialRequests()}
              {activeTab === 'analytics' && renderAnalytics()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Assign Complaint Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAssignModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Assign Complaint</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Staff Member</label>
                  <select className="input-field">
                    <option value="">Choose staff...</option>
                    {mockData.staff.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name} ({staff.assignedComplaints} assigned)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Urgency Level</label>
                  <select className="input-field">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAssignModal(false)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                  <button className="btn-primary flex-1">
                    Assign
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attendance Modal */}
      <AnimatePresence>
        {showAttendanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAttendanceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Mark Attendance - {new Date().toLocaleDateString()}</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockData.staff.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.empId}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Present
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="btn-primary w-full mt-4"
              >
                Save Attendance
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupervisorDashboard;
