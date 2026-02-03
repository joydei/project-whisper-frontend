import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import MunicipalityLayout from '../layouts/MunicipalityLayout';
import AdminLayout from '../layouts/AdminLayout';

// User Views
import Home from '../views/user/Home';
import VoiceOut from '../views/user/VoiceOut';

// Municipality Views
import Dashboard from '../views/municipality/Dashboard';
import Reports from '../views/municipality/Reports';

const AppRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="voice-out" element={<VoiceOut />} />
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
    </Routes>
  );
};

export default AppRoutes;
