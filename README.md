# 🏢 Maintenance Management System

A comprehensive maintenance management application with beautiful animations and modern UI. Built with React, Tailwind CSS, Framer Motion, and GSAP.

## ✨ Features

### 🔐 Multiple User Interfaces

#### 👨‍💼 Admin Dashboard
- **QR Code Management**: Generate unique QR codes for rooms and areas
- **Department Management**: Create and manage departments (Electrician, Plumbing, IT, etc.)
- **Staff Management**: Add staff members with details (Name, ID, Aadhaar, etc.)
- **Role Assignment**: Assign Supervisor or Staff roles
- **Complaint Management**: View and assign complaints manually or automatically
- **Analytics Dashboard**: Real-time charts and reports on complaint trends, resolution times, and performance
- **Notification System**: Get notified for all complaints and department activities

#### 🏠 User Interface (Room Complaints)
- Scan QR code to auto-detect room number
- Fill ITS number and complaint details
- Select category (Housekeeping, Plumbing, Electrical, Carpentry, Others)
- Upload photo (optional)
- Receive OTP for verification upon completion
- Track complaint status
- Emergency contact if not resolved in time

#### 🏛️ User Interface (Area Complaints)
- Auto-detect area name via QR
- Submit complaints for common areas
- No OTP required
- Track complaint status

#### 👷 Staff Dashboard
- View assigned complaints with urgency levels
- See countdown timers for each task
- Upload work completion photo
- Enter user OTP to close complaint
- Request materials for tasks
- Apply for leave with date range
- View personal profile and performance stats

#### 👨‍🏫 Supervisor Dashboard
- Assign complaints to staff members
- Set urgency levels (High, Medium, Low)
- View staff workload and performance
- Approve/reject leave requests
- Mark daily attendance
- Manage material requests
- Generate permission IDs for materials
- View analytics and reports
- Request leave from admin

#### 📦 Store Supervisor Dashboard
- View material requests from all departments
- Mark items as available/unavailable
- Generate permission IDs for collection
- Verify permission IDs when staff collects items
- Request materials from admin if out of stock
- Track inventory and stock levels
- View collection history and reports

## 🎨 Technologies Used

- **React 18** - UI Framework
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **QRCode.react** - QR code generation

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📱 Routes

- `/` - Landing page with role selection
- `/login` - Login page (demo login, any credentials work)
- `/admin` - Admin dashboard
- `/complaint/room/:roomId` - Room complaint form
- `/complaint/area/:areaId` - Area complaint form
- `/staff` - Staff dashboard
- `/supervisor` - Supervisor dashboard
- `/store-supervisor` - Store supervisor dashboard

## 🎭 Demo Features

### Mock Data
The app uses mock data for demonstration:
- Pre-populated departments, staff, and complaints
- Simulated QR code scanning
- Mock authentication (any credentials work)
- Fake OTP generation

### Animated Elements
- Smooth page transitions with Framer Motion
- GSAP-powered card animations
- Hover effects and micro-interactions
- Loading states and success animations
- Modal animations

## 🎨 UI Components

### Reusable Classes
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card` - Card container with hover effects
- `.input-field` - Styled input fields

### Color Scheme
- Primary: Blue shades (#0ea5e9 - #0c4a6e)
- Success: Green
- Warning: Orange/Yellow
- Error: Red
- Neutral: Gray shades

## 📊 Key Features by Role

### Admin Can:
- ✅ Generate QR codes for rooms/areas
- ✅ Create departments and add staff
- ✅ View all complaints and analytics
- ✅ Assign complaints manually or auto-assign
- ✅ Track staff performance
- ✅ View real-time dashboards

### Staff Can:
- ✅ View assigned complaints with urgency
- ✅ See countdown timers
- ✅ Upload completion photos
- ✅ Verify work with user OTP
- ✅ Request materials
- ✅ Apply for leave

### Supervisor Can:
- ✅ Assign work to staff
- ✅ Set priority levels
- ✅ Approve/reject leaves
- ✅ Mark attendance
- ✅ Handle material requests
- ✅ View team analytics

### Store Supervisor Can:
- ✅ Process material requests
- ✅ Generate permission IDs
- ✅ Verify collections
- ✅ Request from admin if out of stock
- ✅ Track inventory

## 🎯 Animation Features

1. **Page Transitions**: Smooth fade and slide animations
2. **Card Hover Effects**: Scale and elevation changes
3. **Loading States**: Skeleton screens and spinners
4. **Success Animations**: Celebration effects on completion
5. **Modal Animations**: Scale and fade transitions
6. **Staggered Lists**: Sequential animation of list items

## 📝 Notes

- This is a **FRONTEND ONLY** application
- No backend integration
- Uses mock data for demonstration
- All interactions are simulated
- Perfect for UI/UX presentations and demos

## 🔧 Customization

### Adding New Features
1. Create new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update mock data in `src/lib/utils.js`

### Styling
- Modify `tailwind.config.js` for theme changes
- Edit `src/index.css` for global styles
- Use Tailwind utility classes for components

## 🐛 Known Limitations

- No actual backend connectivity
- Mock authentication system
- Static mock data
- No real-time updates
- No actual QR scanning (simulation only)

## 📄 License

This project is for demonstration purposes.

## 👨‍💻 Development

Built with ❤️ using React, Tailwind CSS, Framer Motion, and GSAP

---

**Note**: This is a frontend demonstration. For production use, integrate with a proper backend API.
