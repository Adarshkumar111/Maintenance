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
        <h2 className="text-2xl font-bold">My Assignments</h2>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
            {assignments.filter(a => a.urgency === 'high').length} High Priority
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
            {assignments.length} Total
          </span>
        </div>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`card border-l-4 cursor-pointer ${
              assignment.urgency === 'high' ? 'border-red-500' :
              assignment.urgency === 'medium' ? 'border-orange-500' :
              'border-green-500'
            }`}
            onClick={() => setSelectedComplaint(assignment)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Room {assignment.roomNo}</h3>
                <p className="text-sm text-gray-600">{assignment.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                assignment.urgency === 'high' ? 'bg-red-100 text-red-800' :
                assignment.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                {assignment.urgency}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{assignment.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Assigned: {new Date(assignment.assignedAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <Timer className="w-4 h-4" />
                <span>Time remaining: {getTimeRemaining(assignment.deadline)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(assignment);
                  setShowCompleteModal(true);
                }}
                className="btn-primary flex-1 text-sm"
              >
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Complete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComplaint(assignment);
                  setShowMaterialModal(true);
                }}
                className="btn-secondary flex-1 text-sm"
              >
                <Package className="w-4 h-4 inline mr-1" />
                Request Material
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeaveRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Request Leave
        </button>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Leave History</h3>
        <div className="space-y-3">
          {[
            { id: 1, from: '2024-10-15', to: '2024-10-17', reason: 'Medical', status: 'approved' },
            { id: 2, from: '2024-09-20', to: '2024-09-21', reason: 'Personal', status: 'approved' },
          ].map((leave) => (
            <div key={leave.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{leave.from} to {leave.to}</p>
                <p className="text-sm text-gray-600">{leave.reason}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>

      <div className="card">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {staffInfo.photo}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{staffInfo.name}</h3>
            <p className="text-gray-600">{staffInfo.empId}</p>
            <p className="text-gray-600">{staffInfo.department} Department</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="font-semibold">{staffInfo.empId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-semibold">{staffInfo.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date of Joining</p>
            <p className="font-semibold">{staffInfo.joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Assignments</p>
            <p className="font-semibold">{assignments.length}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Performance Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">45</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">4.8</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
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
            className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Staff Portal</h1>
              <p className="text-blue-200 text-sm">{staffInfo.department}</p>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'assignments', icon: ClipboardList, label: 'My Assignments' },
                { id: 'leave', icon: Calendar, label: 'Leave Requests' },
                { id: 'profile', icon: User, label: 'My Profile' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
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
              <p className="font-semibold">{staffInfo.name}</p>
              <p className="text-sm text-gray-500">{staffInfo.empId}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {staffInfo.photo}
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
