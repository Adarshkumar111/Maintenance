import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, Users, Building2, FileText, Bell, TrendingUp, 
  LogOut, Menu, X, Plus, Download, UserPlus, Settings 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData } from '../lib/utils';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New complaint from Room 101', time: '5 min ago', type: 'complaint' },
    { id: 2, message: 'Staff leave request pending', time: '10 min ago', type: 'leave' },
    { id: 3, message: 'Material request from Electrician dept', time: '15 min ago', type: 'material' },
  ]);

  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [activeTab]);

  const stats = [
    { title: 'Total Complaints', value: '156', change: '+12%', icon: FileText, color: 'bg-blue-500' },
    { title: 'Active Staff', value: '24', change: '+2', icon: Users, color: 'bg-green-500' },
    { title: 'Departments', value: '6', change: '0', icon: Building2, color: 'bg-purple-500' },
    { title: 'Resolution Rate', value: '87%', change: '+5%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const complaintTrends = [
    { month: 'Jan', complaints: 45, resolved: 38 },
    { month: 'Feb', complaints: 52, resolved: 45 },
    { month: 'Mar', complaints: 49, resolved: 42 },
    { month: 'Apr', complaints: 63, resolved: 55 },
    { month: 'May', complaints: 58, resolved: 51 },
    { month: 'Jun', complaints: 67, resolved: 58 },
  ];

  const categoryData = [
    { name: 'Electrical', value: 35, color: '#3b82f6' },
    { name: 'Plumbing', value: 25, color: '#10b981' },
    { name: 'Housekeeping', value: 20, color: '#f59e0b' },
    { name: 'Maintenance', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 5, color: '#ef4444' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.05, y: -5 }}
            className="card-premium group"
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-primary-400 text-sm mt-1 font-semibold">{stat.change}</p>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-premium"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Complaint Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={complaintTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-premium"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary-400" />
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Complaints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-400" />
          Recent Complaints
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-950/50 border-b border-blue-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Room</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Urgency</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {mockData.complaints.map((complaint) => (
                <motion.tr
                  key={complaint.id}
                  whileHover={{ backgroundColor: 'rgba(30, 58, 138, 0.2)' }}
                  className="border-b border-blue-900/30 cursor-pointer"
                >
                  <td className="px-4 py-3 text-gray-300">#{complaint.id}</td>
                  <td className="px-4 py-3 text-white font-semibold">{complaint.roomNo}</td>
                  <td className="px-4 py-3 text-gray-300">{complaint.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                      complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complaint.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      complaint.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {complaint.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{complaint.assignedTo || <span className="text-orange-400">Unassigned</span>}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderQRManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">QR Code Management</h2>
        <button onClick={() => setShowQRModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Generate QR
        </button>
      </div>

      {/* Rooms */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Room QR Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockData.rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.05 }}
              className="border-2 border-gray-200 rounded-lg p-4 text-center"
            >
              <div className="bg-white p-4 rounded-lg mb-3 inline-block">
                <QRCodeSVG value={`room-${room.roomNo}`} size={120} />
              </div>
              <h4 className="font-bold">Room {room.roomNo}</h4>
              <p className="text-sm text-gray-600">Floor {room.floor} - {room.type}</p>
              <button className="mt-2 text-primary-600 text-sm flex items-center gap-1 mx-auto hover:text-primary-700">
                <Download className="w-4 h-4" /> Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Areas */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Area QR Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockData.areas.map((area) => (
            <motion.div
              key={area.id}
              whileHover={{ scale: 1.05 }}
              className="border-2 border-gray-200 rounded-lg p-4 text-center"
            >
              <div className="bg-white p-4 rounded-lg mb-3 inline-block">
                <QRCodeSVG value={`area-${area.name}`} size={120} />
              </div>
              <h4 className="font-bold">{area.name}</h4>
              <button className="mt-2 text-primary-600 text-sm flex items-center gap-1 mx-auto hover:text-primary-700">
                <Download className="w-4 h-4" /> Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Departments</h2>
        <button onClick={() => setShowAddDeptModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.departments.map((dept) => (
          <motion.div
            key={dept.id}
            whileHover={{ scale: 1.03, y: -5 }}
            className="card border-l-4 border-primary-500"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{dept.name}</h3>
              <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Staff Members:</span>
                <span className="font-semibold">{dept.staffCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Complaints:</span>
                <span className="font-semibold text-orange-600">{dept.activeComplaints}</span>
              </div>
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
        <button onClick={() => setShowAddStaffModal(true)} className="btn-primary flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Emp ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Join Date</th>
                <th className="px-4 py-3 text-left">Assigned</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.staff.map((staff) => (
                <motion.tr
                  key={staff.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="border-b"
                >
                  <td className="px-4 py-3">{staff.empId}</td>
                  <td className="px-4 py-3 font-medium">{staff.name}</td>
                  <td className="px-4 py-3">{staff.department}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      staff.role === 'Supervisor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{staff.joinDate}</td>
                  <td className="px-4 py-3">{staff.assignedComplaints} complaints</td>
                  <td className="px-4 py-3">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
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
                Admin Panel
              </motion.h1>
              <p className="text-gray-400 text-sm mt-1">Maintenance System</p>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'overview', icon: TrendingUp, label: 'Overview' },
                { id: 'qr', icon: QrCode, label: 'QR Management' },
                { id: 'departments', icon: Building2, label: 'Departments' },
                { id: 'staff', icon: Users, label: 'Staff' },
                { id: 'complaints', icon: FileText, label: 'Complaints' },
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
              onClick={() => navigate('/')}
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

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative group">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-primary-500/10 rounded-lg relative text-gray-300 hover:text-primary-400 transition-all duration-300 border border-transparent hover:border-primary-500/30"
              >
                <Bell className="w-6 h-6" />
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"
                ></motion.span>
              </motion.button>
              <div className="absolute right-0 mt-2 w-80 card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-4">
                  <h3 className="font-bold mb-3 text-primary-400">Notifications</h3>
                  {notifications.map((notif) => (
                    <motion.div 
                      key={notif.id} 
                      whileHover={{ x: 5, backgroundColor: "rgba(234, 179, 8, 0.05)" }}
                      className="py-2 border-b border-dark-200 last:border-0 cursor-pointer rounded px-2"
                    >
                      <p className="text-sm text-gray-300">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-white">Admin User</p>
                <p className="text-sm text-gray-400">Administrator</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-primary-500/50"
              >
                A
              </motion.div>
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
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'qr' && renderQRManagement()}
              {activeTab === 'departments' && renderDepartments()}
              {activeTab === 'staff' && renderStaff()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modals would go here - keeping it simple for now */}
    </div>
  );
};

export default AdminDashboard;
