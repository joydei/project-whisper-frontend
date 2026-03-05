import { Routes, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import UserLayout from '../layouts/UserLayout';
import MunicipalityLayout from '../layouts/MunicipalityLayout';
import AdminLayout from '../layouts/AdminLayout';
import CivilLayout from '../layouts/CivilLayout';

// Public Views
import Login from '../views/public/Login';
import Signup from '../views/public/Signup';
import CivilLogin from '../views/public/CivilLogin';
import MunicipalityLogin from '../views/public/MunicipalityLogin';
import AdminLogin from '../views/public/AdminLogin';

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

// ── Police — Headquarters ──
import PoliceHQDashboard from '../views/civil/police/headquarters/Dashboard';
import PoliceHQIncidents from '../views/civil/police/headquarters/Incidents';
import PoliceHQDispatch from '../views/civil/police/headquarters/Dispatch';
import PoliceHQMunicipalities from '../views/civil/police/headquarters/Municipalities';
import PoliceHQMessages from '../views/civil/police/headquarters/Messages';
import PoliceHQAnalytics from '../views/civil/police/headquarters/Analytics';
import PoliceHQProfile from '../views/civil/police/headquarters/Profile';
import PoliceHQSettings from '../views/civil/police/headquarters/Settings';

// ── Police — Municipality ──
import PoliceMunDashboard from '../views/civil/police/municipality/Dashboard';
import PoliceMunIncidents from '../views/civil/police/municipality/Incidents';
import PoliceMunDispatch from '../views/civil/police/municipality/Dispatch';
import PoliceMunMunicipalities from '../views/civil/police/municipality/Municipalities';
import PoliceMunMessages from '../views/civil/police/municipality/Messages';
import PoliceMunAnalytics from '../views/civil/police/municipality/Analytics';
import PoliceMunProfile from '../views/civil/police/municipality/Profile';
import PoliceMunSettings from '../views/civil/police/municipality/Settings';

// ── Fire Service — Headquarters ──
import FireHQDashboard from '../views/civil/fireService/headquarters/Dashboard';
import FireHQIncidents from '../views/civil/fireService/headquarters/Incidents';
import FireHQDispatch from '../views/civil/fireService/headquarters/Dispatch';
import FireHQMunicipalities from '../views/civil/fireService/headquarters/Municipalities';
import FireHQMessages from '../views/civil/fireService/headquarters/Messages';
import FireHQAnalytics from '../views/civil/fireService/headquarters/Analytics';
import FireHQProfile from '../views/civil/fireService/headquarters/Profile';
import FireHQSettings from '../views/civil/fireService/headquarters/Settings';

// ── Fire Service — Municipality ──
import FireMunDashboard from '../views/civil/fireService/municipality/Dashboard';
import FireMunIncidents from '../views/civil/fireService/municipality/Incidents';
import FireMunDispatch from '../views/civil/fireService/municipality/Dispatch';
import FireMunMunicipalities from '../views/civil/fireService/municipality/Municipalities';
import FireMunMessages from '../views/civil/fireService/municipality/Messages';
import FireMunAnalytics from '../views/civil/fireService/municipality/Analytics';
import FireMunProfile from '../views/civil/fireService/municipality/Profile';
import FireMunSettings from '../views/civil/fireService/municipality/Settings';

// ── Medical Emergency — Headquarters ──
import MedicalHQDashboard from '../views/civil/medicalEmergency/headquarters/Dashboard';
import MedicalHQIncidents from '../views/civil/medicalEmergency/headquarters/Incidents';
import MedicalHQDispatch from '../views/civil/medicalEmergency/headquarters/Dispatch';
import MedicalHQMunicipalities from '../views/civil/medicalEmergency/headquarters/Municipalities';
import MedicalHQMessages from '../views/civil/medicalEmergency/headquarters/Messages';
import MedicalHQAnalytics from '../views/civil/medicalEmergency/headquarters/Analytics';
import MedicalHQProfile from '../views/civil/medicalEmergency/headquarters/Profile';
import MedicalHQSettings from '../views/civil/medicalEmergency/headquarters/Settings';

// ── Medical Emergency — Municipality ──
import MedicalMunDashboard from '../views/civil/medicalEmergency/municipality/Dashboard';
import MedicalMunIncidents from '../views/civil/medicalEmergency/municipality/Incidents';
import MedicalMunDispatch from '../views/civil/medicalEmergency/municipality/Dispatch';
import MedicalMunMunicipalities from '../views/civil/medicalEmergency/municipality/Municipalities';
import MedicalMunMessages from '../views/civil/medicalEmergency/municipality/Messages';
import MedicalMunAnalytics from '../views/civil/medicalEmergency/municipality/Analytics';
import MedicalMunProfile from '../views/civil/medicalEmergency/municipality/Profile';
import MedicalMunSettings from '../views/civil/medicalEmergency/municipality/Settings';

// ── Disaster Management — Headquarters ──
import DisasterHQDashboard from '../views/civil/disasterManagement/headquarters/Dashboard';
import DisasterHQIncidents from '../views/civil/disasterManagement/headquarters/Incidents';
import DisasterHQDispatch from '../views/civil/disasterManagement/headquarters/Dispatch';
import DisasterHQMunicipalities from '../views/civil/disasterManagement/headquarters/Municipalities';
import DisasterHQMessages from '../views/civil/disasterManagement/headquarters/Messages';
import DisasterHQAnalytics from '../views/civil/disasterManagement/headquarters/Analytics';
import DisasterHQProfile from '../views/civil/disasterManagement/headquarters/Profile';
import DisasterHQSettings from '../views/civil/disasterManagement/headquarters/Settings';

// ── Disaster Management — Municipality ──
import DisasterMunDashboard from '../views/civil/disasterManagement/municipality/Dashboard';
import DisasterMunIncidents from '../views/civil/disasterManagement/municipality/Incidents';
import DisasterMunDispatch from '../views/civil/disasterManagement/municipality/Dispatch';
import DisasterMunMunicipalities from '../views/civil/disasterManagement/municipality/Municipalities';
import DisasterMunMessages from '../views/civil/disasterManagement/municipality/Messages';
import DisasterMunAnalytics from '../views/civil/disasterManagement/municipality/Analytics';
import DisasterMunProfile from '../views/civil/disasterManagement/municipality/Profile';
import DisasterMunSettings from '../views/civil/disasterManagement/municipality/Settings';

// ── Rescue Operations — Headquarters ──
import RescueHQDashboard from '../views/civil/rescueOperations/headquarters/Dashboard';
import RescueHQIncidents from '../views/civil/rescueOperations/headquarters/Incidents';
import RescueHQDispatch from '../views/civil/rescueOperations/headquarters/Dispatch';
import RescueHQMunicipalities from '../views/civil/rescueOperations/headquarters/Municipalities';
import RescueHQMessages from '../views/civil/rescueOperations/headquarters/Messages';
import RescueHQAnalytics from '../views/civil/rescueOperations/headquarters/Analytics';
import RescueHQProfile from '../views/civil/rescueOperations/headquarters/Profile';
import RescueHQSettings from '../views/civil/rescueOperations/headquarters/Settings';

// ── Rescue Operations — Municipality ──
import RescueMunDashboard from '../views/civil/rescueOperations/municipality/Dashboard';
import RescueMunIncidents from '../views/civil/rescueOperations/municipality/Incidents';
import RescueMunDispatch from '../views/civil/rescueOperations/municipality/Dispatch';
import RescueMunMunicipalities from '../views/civil/rescueOperations/municipality/Municipalities';
import RescueMunMessages from '../views/civil/rescueOperations/municipality/Messages';
import RescueMunAnalytics from '../views/civil/rescueOperations/municipality/Analytics';
import RescueMunProfile from '../views/civil/rescueOperations/municipality/Profile';
import RescueMunSettings from '../views/civil/rescueOperations/municipality/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BaseLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="civil-login" element={<CivilLogin />} />
        <Route path="municipality-login" element={<MunicipalityLogin />} />
        <Route path="admin-login" element={<AdminLogin />} />
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

      {/* ══════════ Civil Services Routes ══════════ */}

      {/* Police — HQ */}
      <Route path="/civil/police/hq" element={<CivilLayout />}>
        <Route index element={<PoliceHQDashboard />} />
        <Route path="dashboard" element={<PoliceHQDashboard />} />
        <Route path="incidents" element={<PoliceHQIncidents />} />
        <Route path="dispatch" element={<PoliceHQDispatch />} />
        <Route path="municipalities" element={<PoliceHQMunicipalities />} />
        <Route path="messages" element={<PoliceHQMessages />} />
        <Route path="analytics" element={<PoliceHQAnalytics />} />
        <Route path="profile" element={<PoliceHQProfile />} />
        <Route path="settings" element={<PoliceHQSettings />} />
      </Route>

      {/* Police — Municipality */}
      <Route path="/civil/police/municipality" element={<CivilLayout />}>
        <Route index element={<PoliceMunDashboard />} />
        <Route path="dashboard" element={<PoliceMunDashboard />} />
        <Route path="incidents" element={<PoliceMunIncidents />} />
        <Route path="dispatch" element={<PoliceMunDispatch />} />
        <Route path="municipalities" element={<PoliceMunMunicipalities />} />
        <Route path="messages" element={<PoliceMunMessages />} />
        <Route path="analytics" element={<PoliceMunAnalytics />} />
        <Route path="profile" element={<PoliceMunProfile />} />
        <Route path="settings" element={<PoliceMunSettings />} />
      </Route>

      {/* Fire Service — HQ */}
      <Route path="/civil/fire-service/hq" element={<CivilLayout />}>
        <Route index element={<FireHQDashboard />} />
        <Route path="dashboard" element={<FireHQDashboard />} />
        <Route path="incidents" element={<FireHQIncidents />} />
        <Route path="dispatch" element={<FireHQDispatch />} />
        <Route path="municipalities" element={<FireHQMunicipalities />} />
        <Route path="messages" element={<FireHQMessages />} />
        <Route path="analytics" element={<FireHQAnalytics />} />
        <Route path="profile" element={<FireHQProfile />} />
        <Route path="settings" element={<FireHQSettings />} />
      </Route>

      {/* Fire Service — Municipality */}
      <Route path="/civil/fire-service/municipality" element={<CivilLayout />}>
        <Route index element={<FireMunDashboard />} />
        <Route path="dashboard" element={<FireMunDashboard />} />
        <Route path="incidents" element={<FireMunIncidents />} />
        <Route path="dispatch" element={<FireMunDispatch />} />
        <Route path="municipalities" element={<FireMunMunicipalities />} />
        <Route path="messages" element={<FireMunMessages />} />
        <Route path="analytics" element={<FireMunAnalytics />} />
        <Route path="profile" element={<FireMunProfile />} />
        <Route path="settings" element={<FireMunSettings />} />
      </Route>

      {/* Medical Emergency — HQ */}
      <Route path="/civil/medical-emergency/hq" element={<CivilLayout />}>
        <Route index element={<MedicalHQDashboard />} />
        <Route path="dashboard" element={<MedicalHQDashboard />} />
        <Route path="incidents" element={<MedicalHQIncidents />} />
        <Route path="dispatch" element={<MedicalHQDispatch />} />
        <Route path="municipalities" element={<MedicalHQMunicipalities />} />
        <Route path="messages" element={<MedicalHQMessages />} />
        <Route path="analytics" element={<MedicalHQAnalytics />} />
        <Route path="profile" element={<MedicalHQProfile />} />
        <Route path="settings" element={<MedicalHQSettings />} />
      </Route>

      {/* Medical Emergency — Municipality */}
      <Route path="/civil/medical-emergency/municipality" element={<CivilLayout />}>
        <Route index element={<MedicalMunDashboard />} />
        <Route path="dashboard" element={<MedicalMunDashboard />} />
        <Route path="incidents" element={<MedicalMunIncidents />} />
        <Route path="dispatch" element={<MedicalMunDispatch />} />
        <Route path="municipalities" element={<MedicalMunMunicipalities />} />
        <Route path="messages" element={<MedicalMunMessages />} />
        <Route path="analytics" element={<MedicalMunAnalytics />} />
        <Route path="profile" element={<MedicalMunProfile />} />
        <Route path="settings" element={<MedicalMunSettings />} />
      </Route>

      {/* Disaster Management — HQ */}
      <Route path="/civil/disaster-management/hq" element={<CivilLayout />}>
        <Route index element={<DisasterHQDashboard />} />
        <Route path="dashboard" element={<DisasterHQDashboard />} />
        <Route path="incidents" element={<DisasterHQIncidents />} />
        <Route path="dispatch" element={<DisasterHQDispatch />} />
        <Route path="municipalities" element={<DisasterHQMunicipalities />} />
        <Route path="messages" element={<DisasterHQMessages />} />
        <Route path="analytics" element={<DisasterHQAnalytics />} />
        <Route path="profile" element={<DisasterHQProfile />} />
        <Route path="settings" element={<DisasterHQSettings />} />
      </Route>

      {/* Disaster Management — Municipality */}
      <Route path="/civil/disaster-management/municipality" element={<CivilLayout />}>
        <Route index element={<DisasterMunDashboard />} />
        <Route path="dashboard" element={<DisasterMunDashboard />} />
        <Route path="incidents" element={<DisasterMunIncidents />} />
        <Route path="dispatch" element={<DisasterMunDispatch />} />
        <Route path="municipalities" element={<DisasterMunMunicipalities />} />
        <Route path="messages" element={<DisasterMunMessages />} />
        <Route path="analytics" element={<DisasterMunAnalytics />} />
        <Route path="profile" element={<DisasterMunProfile />} />
        <Route path="settings" element={<DisasterMunSettings />} />
      </Route>

      {/* Rescue Operations — HQ */}
      <Route path="/civil/rescue-operations/hq" element={<CivilLayout />}>
        <Route index element={<RescueHQDashboard />} />
        <Route path="dashboard" element={<RescueHQDashboard />} />
        <Route path="incidents" element={<RescueHQIncidents />} />
        <Route path="dispatch" element={<RescueHQDispatch />} />
        <Route path="municipalities" element={<RescueHQMunicipalities />} />
        <Route path="messages" element={<RescueHQMessages />} />
        <Route path="analytics" element={<RescueHQAnalytics />} />
        <Route path="profile" element={<RescueHQProfile />} />
        <Route path="settings" element={<RescueHQSettings />} />
      </Route>

      {/* Rescue Operations — Municipality */}
      <Route path="/civil/rescue-operations/municipality" element={<CivilLayout />}>
        <Route index element={<RescueMunDashboard />} />
        <Route path="dashboard" element={<RescueMunDashboard />} />
        <Route path="incidents" element={<RescueMunIncidents />} />
        <Route path="dispatch" element={<RescueMunDispatch />} />
        <Route path="municipalities" element={<RescueMunMunicipalities />} />
        <Route path="messages" element={<RescueMunMessages />} />
        <Route path="analytics" element={<RescueMunAnalytics />} />
        <Route path="profile" element={<RescueMunProfile />} />
        <Route path="settings" element={<RescueMunSettings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
