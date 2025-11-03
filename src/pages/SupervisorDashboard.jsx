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
        <h2 className="text-2xl font-bold">Complaint Management</h2>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
            {mockData.complaints.filter(c => !c.assignedTo).length} Unassigned
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
            {mockData.complaints.length} Total
          </span>
        </div>
      </div>

      <div ref={cardsRef} className="space-y-4">
        {mockData.complaints.map((complaint) => (
          <motion.div
            key={complaint.id}
            whileHover={{ scale: 1.01, x: 5 }}
            className="card border-l-4 border-primary-500 cursor-pointer"
            onClick={() => {
              setSelectedComplaint(complaint);
              setShowAssignModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">#{complaint.id} - Room {complaint.roomNo}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    complaint.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.urgency}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{complaint.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(complaint.createdAt).toLocaleString()}
                  </span>
                  <span>Category: {complaint.category}</span>
                  {complaint.assignedTo && (
                    <span className="text-blue-600 font-semibold">
                      Assigned to: {complaint.assignedTo}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(complaint);
                  setShowAssignModal(true);
                }}
                className="btn-primary text-sm"
              >
                {complaint.assignedTo ? 'Reassign' : 'Assign'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <button
          onClick={() => setShowAttendanceModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Mark Attendance
        </button>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staffPerformance.map((staff, index) => (
          <motion.div
            key={staff.name}
            whileHover={{ scale: 1.03, y: -5 }}
            className="card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {staff.name.substring(0, 2)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{staff.name}</h3>
                <p className="text-gray-600">EMP00{index + 1}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{staff.completed}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{staff.pending}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{staff.avgTime}</p>
                <p className="text-xs text-gray-600">Avg Time</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-sm">View Details</button>
              <button className="btn-primary flex-1 text-sm">Assign Work</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attendance Chart */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Weekly Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
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
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Request Leave (Admin)
        </button>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Pending Leave Requests</h3>
        <div className="space-y-4">
          {mockData.leaveRequests.map((request) => (
            <motion.div
              key={request.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-bold">{request.staffName}</h4>
                <p className="text-sm text-gray-600">{request.empId}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {request.fromDate} to {request.toDate}
                </p>
                <p className="text-sm text-gray-600">Reason: {request.reason}</p>
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
                  <span className={`px-4 py-2 rounded-lg font-semibold ${
                    request.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
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
      <h2 className="text-2xl font-bold">Material Requests</h2>

      <div className="space-y-4">
        {mockData.materialRequests.map((request) => (
          <motion.div
            key={request.id}
            whileHover={{ scale: 1.01 }}
            className="card border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{request.itemName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'available' ? 'bg-green-100 text-green-800' :
                    request.status === 'requested' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Quantity: <span className="font-semibold">{request.quantity}</span></p>
                  <p>Room: <span className="font-semibold">{request.roomNo}</span></p>
                  <p>Requested by: <span className="font-semibold">{request.requestedBy}</span></p>
                  <p>Department: <span className="font-semibold">{request.department}</span></p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {request.status === 'pending' && (
                  <button className="btn-primary text-sm">
                    Forward to Store
                  </button>
                )}
                {request.status === 'available' && (
                  <button className="btn-primary text-sm">
                    Generate Permission ID
                  </button>
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
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>

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
            className="card"
          >
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

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Staff Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={staffPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Top Performers</h3>
          <div className="space-y-3">
            {staffPerformance
              .sort((a, b) => b.completed - a.completed)
              .slice(0, 3)
              .map((staff, index) => (
                <div key={staff.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    'bg-orange-400 text-orange-900'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.completed} completed tasks</p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
              ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Tasks This Month</span>
              <span className="font-bold">176</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-bold text-green-600">94%</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Avg Response Time</span>
              <span className="font-bold text-blue-600">15 min</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Staff Utilization</span>
              <span className="font-bold text-purple-600">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Supervisor Panel</h1>
              <p className="text-purple-200 text-sm">{supervisorInfo.department}</p>
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
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-100 hover:bg-purple-700'
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
              className="flex items-center gap-3 px-4 py-3 text-purple-100 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold">{supervisorInfo.name}</p>
              <p className="text-sm text-gray-500">Supervisor - {supervisorInfo.empId}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              {supervisorInfo.photo}
            </div>
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
