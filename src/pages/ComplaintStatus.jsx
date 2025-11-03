import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, CheckCircle, Clock, AlertCircle, User, Home, Calendar, FileText } from 'lucide-react';

const ComplaintStatus = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [complaintData, setComplaintData] = useState(null);

  // Mock complaint data
  const mockComplaints = {
    '123456': {
      id: '123456',
      type: 'Room',
      roomNo: '101',
      category: 'Electrical',
      description: 'Ceiling fan not working',
      status: 'in-progress',
      assignedTo: 'Rajesh Kumar',
      createdAt: '2024-11-03 10:30 AM',
      otp: '849302',
      timeline: [
        { status: 'Submitted', time: '2024-11-03 10:30 AM', completed: true },
        { status: 'Assigned to Staff', time: '2024-11-03 10:45 AM', completed: true },
        { status: 'Work in Progress', time: '2024-11-03 11:00 AM', completed: true },
        { status: 'Completed', time: 'Pending', completed: false },
      ]
    },
    '789012': {
      id: '789012',
      type: 'Area',
      areaName: 'Lobby',
      category: 'Housekeeping',
      description: 'Floor needs cleaning',
      status: 'completed',
      assignedTo: 'Amit Sharma',
      createdAt: '2024-11-02 02:15 PM',
      completedAt: '2024-11-02 03:30 PM',
      timeline: [
        { status: 'Submitted', time: '2024-11-02 02:15 PM', completed: true },
        { status: 'Assigned to Staff', time: '2024-11-02 02:20 PM', completed: true },
        { status: 'Work in Progress', time: '2024-11-02 02:45 PM', completed: true },
        { status: 'Completed', time: '2024-11-02 03:30 PM', completed: true },
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId in mockComplaints) {
      setComplaintData(mockComplaints[searchId]);
    } else {
      setComplaintData(null);
      alert('Complaint ID not found!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'in-progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black relative overflow-hidden py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-blue-600/30 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-500/30 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-all bg-dark-100/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-900/30"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card-premium p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4 p-4 bg-primary-500/20 rounded-full border border-primary-500/30"
            >
              <Search className="w-16 h-16 text-primary-400" />
            </motion.div>
            <h1 className="text-4xl font-bold glow-text mb-2">Track Your Complaint</h1>
            <p className="text-gray-400">Enter your Complaint ID to check status</p>
          </div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="mb-8"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Complaint ID (e.g., 123456)"
                className="input-field flex-1 text-lg"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary px-8"
              >
                <Search className="w-5 h-5 inline mr-2" />
                Search
              </motion.button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Try IDs: <span className="text-primary-400 font-mono">123456</span> or <span className="text-primary-400 font-mono">789012</span>
            </p>
          </motion.form>

          {/* Complaint Details */}
          {complaintData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6 p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                <div>
                  <p className="text-gray-400 text-sm">Complaint Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border mt-2 ${getStatusColor(complaintData.status)}`}>
                    {complaintData.status === 'in-progress' ? '🔄 In Progress' : 
                     complaintData.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Complaint ID</p>
                  <p className="text-2xl font-bold text-primary-400 font-mono">#{complaintData.id}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                  <div className="flex items-center gap-3 mb-2">
                    {complaintData.type === 'Room' ? <Home className="w-5 h-5 text-primary-400" /> : <FileText className="w-5 h-5 text-green-400" />}
                    <span className="text-gray-400 text-sm">Type</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {complaintData.type} {complaintData.roomNo ? `- Room ${complaintData.roomNo}` : `- ${complaintData.areaName}`}
                  </p>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-400 text-sm">Category</span>
                  </div>
                  <p className="text-white font-semibold text-lg">{complaintData.category}</p>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-400 text-sm">Assigned To</span>
                  </div>
                  <p className="text-white font-semibold text-lg">{complaintData.assignedTo}</p>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-400 text-sm">Created At</span>
                  </div>
                  <p className="text-white font-semibold">{complaintData.createdAt}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/30 mb-8">
                <p className="text-gray-400 text-sm mb-2">Description</p>
                <p className="text-white">{complaintData.description}</p>
              </div>

              {/* OTP Section (for Room complaints) */}
              {complaintData.otp && (
                <div className="p-6 bg-primary-500/10 border-2 border-primary-500/30 rounded-xl mb-8">
                  <p className="text-gray-400 text-sm mb-2">Your OTP</p>
                  <motion.p 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl font-bold text-primary-400 font-mono tracking-wider"
                  >
                    {complaintData.otp}
                  </motion.p>
                  <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Share this OTP with staff upon work completion
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary-400" />
                  Progress Timeline
                </h3>
                <div className="space-y-4">
                  {complaintData.timeline.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500/20 border-2 border-green-500' : 'bg-gray-500/20 border-2 border-gray-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 p-4 bg-blue-950/30 rounded-xl border border-blue-900/30">
                        <p className={`font-semibold ${step.completed ? 'text-white' : 'text-gray-400'}`}>
                          {step.status}
                        </p>
                        <p className="text-gray-500 text-sm">{step.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintStatus;
