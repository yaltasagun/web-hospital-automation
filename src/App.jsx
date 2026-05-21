import { useState } from 'react';

import Sidebar             from './components/Sidebar';
import Topbar              from './components/Topbar';
import NotificationPanel,
     { INITIAL_NOTIFICATIONS } from './components/NotificationPanel';

import Dashboard      from './pages/Dashboard';
import Patients       from './pages/Patients';
import Appointments   from './pages/Appointments';
import Doctors        from './pages/Doctors';
import Laboratory     from './pages/Laboratory';
import Pharmacy       from './pages/Pharmacy';
import Reports        from './pages/Reports';
import Financial      from './pages/Financial';
import Settings       from './pages/Settings';

import Prescriptions  from './pages/clinical/Prescriptions';
import SurgerySchedule from './pages/clinical/SurgerySchedule';
import DischargeSummary from './pages/clinical/DischargeSummary';
import BedManagement  from './pages/clinical/BedManagement';

import useTheme from './hooks/useTheme';
import { generatePatients, generateAppointments } from './data/generators';

function PageContent({ page, patients, setPatients, appointments, setAppointments, theme, setTheme }) {
  switch (page) {
    case 'dashboard':    return <Dashboard />;
    case 'patients':     return <Patients patients={patients} setPatients={setPatients} />;
    case 'appointments': return <Appointments appointments={appointments} setAppointments={setAppointments} />;
    case 'doctors':      return <Doctors />;
    case 'laboratory':   return <Laboratory />;
    case 'pharmacy':     return <Pharmacy />;
    case 'prescriptions':return <Prescriptions />;
    case 'surgery':      return <SurgerySchedule />;
    case 'discharge':    return <DischargeSummary />;
    case 'beds':         return <BedManagement />;
    case 'reports':      return <Reports />;
    case 'financial':    return <Financial />;
    case 'settings':     return <Settings theme={theme} setTheme={setTheme} />;
    default:             return <Dashboard />;
  }
}

export default function App() {
  const [page,         setPage]        = useState('dashboard');
  const [collapsed,    setCollapsed]   = useState(false);
  const [notifOpen,    setNotifOpen]   = useState(false);
  const [search,       setSearch]      = useState('');
  const [theme,        setTheme]       = useTheme('Dark');
  const [patients,     setPatients]    = useState(() => generatePatients());
  const [appointments, setAppointments]= useState(() => generateAppointments());

  const hasUnread = INITIAL_NOTIFICATIONS.some(n => n.unread);

  const handleNavigate = (pageId) => {
    setPage(pageId);
    setNotifOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={page} onNavigate={handleNavigate} collapsed={collapsed} />

      <div className="main">
        <Topbar
          activePage={page}
          search={search}
          onSearchChange={setSearch}
          hasUnread={hasUnread}
          onNotifClick={() => setNotifOpen(o => !o)}
          onToggleSidebar={() => setCollapsed(c => !c)}
          collapsed={collapsed}
        />

        {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}

        <div className="page-area">
          <PageContent
            page={page}
            patients={patients}         setPatients={setPatients}
            appointments={appointments} setAppointments={setAppointments}
            theme={theme}               setTheme={setTheme}
          />
        </div>
      </div>
    </div>
  );
}
