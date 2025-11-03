import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const mockData = {
  departments: [
    { id: 1, name: 'Electrician', staffCount: 5, activeComplaints: 12 },
    { id: 2, name: 'Plumbing', staffCount: 4, activeComplaints: 8 },
    { id: 3, name: 'Maintenance', staffCount: 6, activeComplaints: 15 },
    { id: 4, name: 'IT', staffCount: 3, activeComplaints: 6 },
    { id: 5, name: 'Housekeeping', staffCount: 8, activeComplaints: 20 },
    { id: 6, name: 'Carpentry', staffCount: 3, activeComplaints: 5 },
  ],
  staff: [
    { id: 1, name: 'Rahul Kumar', empId: 'EMP001', department: 'Electrician', role: 'Staff', joinDate: '2023-01-15', assignedComplaints: 3 },
    { id: 2, name: 'Priya Sharma', empId: 'EMP002', department: 'Housekeeping', role: 'Supervisor', joinDate: '2022-11-20', assignedComplaints: 0 },
    { id: 3, name: 'Amit Patel', empId: 'EMP003', department: 'Plumbing', role: 'Staff', joinDate: '2023-03-10', assignedComplaints: 2 },
    { id: 4, name: 'Sneha Reddy', empId: 'EMP004', department: 'IT', role: 'Staff', joinDate: '2023-05-05', assignedComplaints: 1 },
    { id: 5, name: 'Vikram Singh', empId: 'EMP005', department: 'Maintenance', role: 'Supervisor', joinDate: '2022-08-15', assignedComplaints: 0 },
  ],
  complaints: [
    { id: 1, roomNo: '101', itsNo: 'ITS12345', category: 'Electrical', description: 'Fan not working', status: 'pending', urgency: 'high', createdAt: '2024-11-03T10:30:00', assignedTo: 'Rahul Kumar' },
    { id: 2, roomNo: '205', itsNo: 'ITS12346', category: 'Plumbing', description: 'Tap leaking', status: 'in-progress', urgency: 'medium', createdAt: '2024-11-03T09:15:00', assignedTo: 'Amit Patel' },
    { id: 3, roomNo: '310', itsNo: 'ITS12347', category: 'Housekeeping', description: 'Room cleaning needed', status: 'completed', urgency: 'low', createdAt: '2024-11-02T14:20:00', assignedTo: null },
    { id: 4, roomNo: '112', itsNo: 'ITS12348', category: 'Electrical', description: 'Light not working', status: 'pending', urgency: 'high', createdAt: '2024-11-03T11:00:00', assignedTo: null },
    { id: 5, roomNo: 'Lobby', itsNo: 'ITS12349', category: 'Maintenance', description: 'AC not cooling', status: 'in-progress', urgency: 'high', createdAt: '2024-11-03T08:45:00', assignedTo: 'Vikram Singh' },
  ],
  rooms: [
    { id: 1, roomNo: '101', floor: 1, type: 'Single', qrGenerated: true },
    { id: 2, roomNo: '102', floor: 1, type: 'Double', qrGenerated: true },
    { id: 3, roomNo: '205', floor: 2, type: 'Suite', qrGenerated: true },
    { id: 4, roomNo: '310', floor: 3, type: 'Double', qrGenerated: false },
  ],
  areas: [
    { id: 1, name: 'Lobby', qrGenerated: true },
    { id: 2, name: 'Dining Hall', qrGenerated: true },
    { id: 3, name: 'Gym', qrGenerated: false },
    { id: 4, name: 'Swimming Pool', qrGenerated: true },
  ],
  leaveRequests: [
    { id: 1, staffName: 'Rahul Kumar', empId: 'EMP001', fromDate: '2024-11-10', toDate: '2024-11-12', reason: 'Medical', status: 'pending' },
    { id: 2, staffName: 'Amit Patel', empId: 'EMP003', fromDate: '2024-11-05', toDate: '2024-11-06', reason: 'Personal', status: 'approved' },
  ],
  materialRequests: [
    { id: 1, itemName: 'LED Bulb', quantity: 5, roomNo: '101', requestedBy: 'Rahul Kumar', status: 'pending', department: 'Electrician' },
    { id: 2, itemName: 'Pipe Fitting', quantity: 2, roomNo: '205', requestedBy: 'Amit Patel', status: 'available', department: 'Plumbing' },
    { id: 3, itemName: 'Paint', quantity: 10, roomNo: 'Lobby', requestedBy: 'Vikram Singh', status: 'requested', department: 'Maintenance' },
  ],
};
