import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import MunicipalityLayout from '../layouts/MunicipalityLayout';
import AdminLayout from '../layouts/AdminLayout';
import CivilLayout from '../layouts/CivilLayout';

// Public Views
import Login from '../views/public/Login';

// User Views
import Home from '../views/user/Home';
import VoiceOut from '../views/user/VoiceOut';
import Inbox from '../views/user/Inbox';
import Notifications from '../views/user/Notifications';
import Profile from '../views/user/Profile';

// Municipality Views
import Dashboard from '../views/municipality/Dashboard';
import Reports from '../views/municipality/Reports';

// Civil Views
import CivilDashboard from '../views/civil/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="voice-out" element={<VoiceOut />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Municipality Routes */}
      <Route path="/municipality" element={<MunicipalityLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Dashboard Coming Soon</div>} />
        <Route path="dashboard" element={<div>Admin Dashboard Coming Soon</div>} />
      </Route>

      {/* Civil Services Routes */}
      <Route path="/civil" element={<CivilLayout />}>
        <Route index element={<CivilDashboard />} />
        <Route path="dashboard" element={<CivilDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
