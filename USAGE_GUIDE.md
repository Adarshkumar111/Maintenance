# 📖 Usage Guide - Maintenance Management System

## 🚀 Quick Start

### Running the Application
```bash
cd /home/adarsh/program/coding/projects/mern/mentnains/client
npm run dev
```
Open browser at: `http://localhost:5173`

---

## 🎯 Navigation Flow

### 1️⃣ Landing Page (`/`)
**What you'll see:**
- Beautiful gradient background with animated hero section
- 4 Role cards (Admin, Staff, Supervisor, Store Supervisor)
- Feature highlights
- "Get Started" button

**Actions:**
- Click any role card to navigate to that dashboard
- Click "Get Started" to go to login page

---

### 2️⃣ Login Page (`/login`)
**What you'll see:**
- Clean login form with role selection
- User ID and Password fields

**Demo Credentials:**
- **Any credentials work!** This is a frontend demo
- Select role: Admin, Staff, Supervisor, or Store Supervisor
- Enter any ID and password
- Click Login

---

### 3️⃣ Admin Dashboard (`/admin`)

#### Features to Try:

**📊 Overview Tab:**
- View 4 stat cards with animations
- See complaint trend charts
- View category distribution pie chart
- Check recent complaints table
- Hover over cards for elevation effect

**🔲 QR Management Tab:**
- View room QR codes (101, 102, 205, 310)
- View area QR codes (Lobby, Dining Hall, etc.)
- Click download to save QR codes
- Hover effects on QR cards

**🏢 Departments Tab:**
- See 6 departments with staff counts
- View active complaints per department
- Click "Add Department" button (modal simulation)
- Hover for card animation

**👥 Staff Tab:**
- View staff table with all details
- See assigned complaint counts
- Click "Add Staff" button
- Sort and filter staff members

**🔔 Notifications:**
- Hover over bell icon in header
- View notification dropdown
- See complaint, leave, and material notifications

---

### 4️⃣ User Complaint - Room (`/complaint/room/101`)

**Step-by-step flow:**

1. **Form Step:**
   - Auto-detected Room Number (101)
   - Enter ITS Number
   - Select Category (Housekeeping, Plumbing, etc.)
   - Write Description
   - Upload Photo (optional)
   - Click "Submit Complaint"

2. **Success Step:**
   - See success animation with green checkmark
   - Get 6-digit OTP
   - View complaint summary
   - Track status button
   - Emergency contact info

**Animations:**
- Form fade-in
- Success checkmark scale animation
- Smooth transitions

---

### 5️⃣ User Complaint - Area (`/complaint/area/Lobby`)

**Similar to Room but:**
- Auto-detected Area Name
- No OTP generated
- Simpler flow for common areas
- Can submit multiple complaints

---

### 6️⃣ Staff Dashboard (`/staff`)

#### Tabs to Explore:

**📋 My Assignments:**
- 3 assigned complaint cards
- Color-coded urgency (Red=High, Orange=Medium, Green=Low)
- Countdown timers showing time remaining
- "Complete" button → Opens modal
- "Request Material" button → Opens material request modal

**Complete Work Modal:**
- Enter 6-digit OTP from user
- Upload work completion photo
- Submit to close complaint

**📅 Leave Requests:**
- View leave history
- Click "Request Leave"
- Fill date range and reason
- Submit request

**👤 My Profile:**
- View personal details
- See performance stats (Completed, In Progress, Rating)
- Employee information

**Animations:**
- Staggered card entry
- Hover scale effects
- Modal animations

---

### 7️⃣ Supervisor Dashboard (`/supervisor`)

#### Features:

**📝 Complaints Tab:**
- View all complaints with status
- Click any complaint to open assign modal
- Select staff member from dropdown
- Set urgency level
- Assign button

**👥 Staff Management:**
- 4 staff performance cards
- View completed/pending tasks
- Average time metrics
- Weekly attendance chart
- "Mark Attendance" button → Opens attendance modal

**📅 Leave Management:**
- See pending leave requests
- Approve/Reject buttons with animations
- Request leave to admin

**📦 Materials Tab:**
- View material requests
- Forward to store button
- Generate permission IDs
- Track availability status

**📊 Analytics Tab:**
- 4 stat cards
- Staff performance comparison chart
- Top performers list with rankings
- Quick stats overview

---

### 8️⃣ Store Supervisor Dashboard (`/store-supervisor`)

#### Main Features:

**📦 Material Requests:**
- View all requests with search
- 4 status cards (Pending, Available, Out of Stock, Collected)
- Color-coded request cards
- "Mark Available" button → Generates Permission ID
- Permission ID modal with animation

**Permission ID Flow:**
1. Click "Mark Available" on pending request
2. Modal shows generated Permission ID (PRM12345)
3. Share with staff member
4. Staff uses ID to collect material
5. Verify permission ID to mark as collected

**Search Feature:**
- Search by item name, staff name, or room number
- Real-time filtering

**Animations:**
- Staggered stats cards
- Request card hover effects
- Success modal with scale animation

---

## 🎨 Animation Features to Notice

### 1. **Page Transitions**
- Smooth fade and slide when switching tabs
- Exit animations on page leave

### 2. **Card Animations**
- Staggered entry (cards appear one by one)
- Hover scale and elevation
- Shadow transitions

### 3. **Button Effects**
- Scale on click (whileTap)
- Hover color transitions
- Icon rotations

### 4. **Modal Animations**
- Backdrop fade-in
- Content scale animation
- Exit animations

### 5. **GSAP Animations**
- Hero section on landing page
- Stats cards entry
- List items stagger

### 6. **Framer Motion**
- All page transitions
- Interactive elements
- Drag and gesture animations

---

## 🎯 Things to Try

### Interactive Elements:
1. ✅ Hover over any card to see elevation
2. ✅ Click sidebar items to switch tabs
3. ✅ Toggle sidebar open/close
4. ✅ Open and close modals
5. ✅ Submit forms to see success animations
6. ✅ Hover notification bell
7. ✅ Click QR code download buttons

### Different Flows:
1. ✅ Submit a room complaint and get OTP
2. ✅ Assign a complaint as supervisor
3. ✅ Complete work as staff
4. ✅ Request material and track it
5. ✅ Generate permission ID in store
6. ✅ View analytics and charts

---

## 🎨 Color Coding

### Status Colors:
- **Green**: Completed, Available, Approved
- **Blue**: In Progress, Collected
- **Yellow/Orange**: Pending, Medium Priority
- **Red**: High Priority, Out of Stock, Rejected

### Urgency Levels:
- **Red Badge**: High Urgency
- **Orange Badge**: Medium Urgency
- **Green Badge**: Low Urgency

### Role Colors:
- **Purple**: Admin
- **Blue**: Staff
- **Purple**: Supervisor
- **Orange**: Store Supervisor

---

## 💡 Pro Tips

1. **Responsive Design**: Resize browser to see responsive layout
2. **Dark Sidebar**: Each role has unique gradient sidebar color
3. **Mock Data**: All data is from `src/lib/utils.js`
4. **No Backend**: Everything works without server
5. **Quick Navigation**: Use browser back button
6. **Multiple Tabs**: Open different roles in separate tabs
7. **Animations**: Some animations trigger on scroll

---

## 🔍 Keyboard Shortcuts

- `Tab` - Navigate through form fields
- `Enter` - Submit forms
- `Esc` - Close modals (where implemented)
- `Hover` - Trigger hover effects

---

## 📱 Test Different Screens

### Desktop (1920x1080):
- Full sidebar visible
- Multi-column layouts
- Large charts

### Tablet (768px):
- Responsive grid
- Collapsible sidebar
- 2-column layouts

### Mobile (375px):
- Single column
- Bottom navigation (if implemented)
- Stacked cards

---

## 🎬 Demo Walkthrough

### Complete User Journey:

1. **Start**: Landing page → Click Admin
2. **Login**: Select Admin → Enter any credentials
3. **Admin**: View dashboard → Go to QR tab
4. **QR Codes**: See room QRs → Back to home
5. **Complaint**: Navigate to `/complaint/room/101`
6. **Submit**: Fill form → Get OTP
7. **Staff View**: Go to `/staff`
8. **Complete Work**: Click Complete → Enter OTP
9. **Supervisor**: Go to `/supervisor`
10. **Assign**: Assign complaint to staff
11. **Materials**: Go to `/store-supervisor`
12. **Permission**: Generate permission ID

---

## 🐛 Troubleshooting

### Issue: Animations not smooth?
- Check browser performance
- Reduce browser extensions
- Try Chrome/Firefox

### Issue: Modals not working?
- Click outside to close
- Check console for errors

### Issue: Charts not visible?
- Charts are in Admin and Supervisor dashboards
- Scroll down to see them

---

## 📚 File Structure

```
src/
├── pages/
│   ├── LandingPage.jsx          # Home with role cards
│   ├── Login.jsx                # Login form
│   ├── AdminDashboard.jsx       # Admin features
│   ├── UserComplaintRoom.jsx   # Room complaints
│   ├── UserComplaintArea.jsx   # Area complaints
│   ├── StaffDashboard.jsx       # Staff interface
│   ├── SupervisorDashboard.jsx # Supervisor features
│   └── StoreSupervisorDashboard.jsx # Store management
├── lib/
│   └── utils.js                 # Mock data & utilities
├── App.jsx                      # Router setup
└── index.css                    # Global styles
```

---

## 🎉 Enjoy the Demo!

This is a complete frontend demonstration of a maintenance management system with:
- ✅ Beautiful UI
- ✅ Smooth animations
- ✅ Multiple user roles
- ✅ Complete workflows
- ✅ Mock data
- ✅ No backend needed

Perfect for presentations, portfolio, or as a starting point for full-stack development!

---

**Made with ❤️ using React, Tailwind CSS, Framer Motion & GSAP**
