import { useState, useEffect, useRef } from 'react';
import { PulseIcon, CalIcon, LabIcon } from './Icons';

const INITIAL_NOTIFICATIONS = [
  { id: 1, cls: 'ni-red',    Icon: PulseIcon, title: 'Emergency Alert!',     body: 'Cardiology — Room 118',            time: '2 min ago',  unread: true  },
  { id: 2, cls: 'ni-yellow', Icon: CalIcon,   title: 'Appointment Reminder', body: 'Ali Çelik — 10:30 appointment',    time: '15 min ago', unread: true  },
  { id: 3, cls: 'ni-blue',   Icon: LabIcon,   title: 'Lab Result Ready',     body: 'Zeynep Koç blood panel complete',  time: '1 hr ago',   unread: false },
];

/**
 * Slide-down notification panel with click-outside dismissal.
 *
 * Props:
 *   onClose {function} - Called when user clicks outside the panel
 */
export default function NotificationPanel({ onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const clearAll = () =>
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-hdr">
        <h4>Notifications</h4>
        <button className="btn-link" onClick={clearAll}>Clear All</button>
      </div>

      {notifications.map(n => (
        <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`}>
          <div className={`notif-icon ${n.cls}`}>
            <n.Icon />
          </div>
          <div className="notif-body">
            <strong>{n.title}</strong>
            <p>{n.body}</p>
            <span>{n.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export { INITIAL_NOTIFICATIONS };
