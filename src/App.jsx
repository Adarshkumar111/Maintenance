import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import UserComplaintRoom from './pages/UserComplaintRoom';
import UserComplaintArea from './pages/UserComplaintArea';
import ComplaintStatus from './pages/ComplaintStatus';
import StaffDashboard from './pages/StaffDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import StoreSupervisorDashboard from './pages/StoreSupervisorDashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/complaint/room/:roomId" element={<UserComplaintRoom />} />
        <Route path="/complaint/area/:areaId" element={<UserComplaintArea />} />
        <Route path="/complaint/status" element={<ComplaintStatus />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/supervisor" element={<SupervisorDashboard />} />
        <Route path="/store-supervisor" element={<StoreSupervisorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
