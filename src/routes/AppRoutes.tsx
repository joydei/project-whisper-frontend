import { Routes, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import UserLayout from '../layouts/UserLayout';
import MunicipalityLayout from '../layouts/MunicipalityLayout';
import AdminLayout from '../layouts/AdminLayout';
import CivilLayout from '../layouts/CivilLayout';

// Public Views
import Login from '../views/public/Login';
import Signup from '../views/public/Signup';

// User Views
import Home from '../views/user/Home';
import VoiceOut from '../views/user/VoiceOut';
import Inbox from '../views/user/Inbox';
import Notifications from '../views/user/Notifications';
import Profile from '../views/user/Profile';
import UserProfile from '../views/user/UserProfile';
import Messages from '../views/user/Messages';
import MunicipalityProfile from '../views/user/MunicipalityProfile';
import CivilServiceProfile from '../views/user/CivilServiceProfile';
import MinistryProfile from '../views/user/MinistryProfile';
import Search from '../views/user/Search';

// Municipality Views
import Dashboard from '../views/municipality/Dashboard';
import Reports from '../views/municipality/Reports';
import Announcements from '../views/municipality/Announcements';
import MunicipalityMessages from '../views/municipality/Messages';
import Analytics from '../views/municipality/Analytics';
import Community from '../views/municipality/Community';
import MunicipalityProfileEdit from '../views/municipality/Profile';
import MunicipalitySettings from '../views/municipality/Settings';
import MunicipalityCivilServices from '../views/municipality/CivilServices';

// Civil Views
import CivilDashboard from '../views/civil/Dashboard';
import CivilIncidents from '../views/civil/Incidents';
import CivilDispatch from '../views/civil/Dispatch';
import CivilMunicipalities from '../views/civil/Municipalities';
import CivilMessages from '../views/civil/Messages';
import CivilAnalytics from '../views/civil/Analytics';
import CivilProfile from '../views/civil/Profile';
import CivilSettings from '../views/civil/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BaseLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="voice-out" element={<VoiceOut />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="user/:username" element={<UserProfile />} />
        <Route path="municipality/:slug" element={<MunicipalityProfile />} />
        <Route path="civil/:slug" element={<CivilServiceProfile />} />
        <Route path="ministry/:slug" element={<MinistryProfile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:username" element={<Messages />} />
      </Route>

      {/* Municipality Routes */}
      <Route path="/municipality" element={<MunicipalityLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="messages" element={<MunicipalityMessages />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<MunicipalityProfileEdit />} />
        <Route path="settings" element={<MunicipalitySettings />} />
        <Route path="civil-services" element={<MunicipalityCivilServices />} />
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
        <Route path="incidents" element={<CivilIncidents />} />
        <Route path="dispatch" element={<CivilDispatch />} />
        <Route path="municipalities" element={<CivilMunicipalities />} />
        <Route path="messages" element={<CivilMessages />} />
        <Route path="analytics" element={<CivilAnalytics />} />
        <Route path="profile" element={<CivilProfile />} />
        <Route path="settings" element={<CivilSettings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
