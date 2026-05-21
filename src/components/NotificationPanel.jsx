import { useState, useEffect, useRef } from 'react';
import { useLang } from '../i18n/LangContext';
import { PulseIcon, CalIcon, LabIcon } from './Icons';

const NOTIF_KEYS = [
  { id: 1, cls: 'ni-red',    Icon: PulseIcon, key: 'emergency',   timeKey: 'twoMin',     unread: true  },
  { id: 2, cls: 'ni-yellow', Icon: CalIcon,   key: 'appointment', timeKey: 'fifteenMin', unread: true  },
  { id: 3, cls: 'ni-blue',   Icon: LabIcon,   key: 'lab',         timeKey: 'oneHour',    unread: false },
];

// Export for App.jsx hasUnread check
export const INITIAL_NOTIFICATIONS = NOTIF_KEYS;

/**
 * Slide-down notification panel.
 * Props: onClose
 */
export default function NotificationPanel({ onClose }) {
  const { t } = useLang();
  const [read, setRead] = useState([]);
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const clearAll = () => setRead(NOTIF_KEYS.map(n => n.id));

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-hdr">
        <h4>{t.notifications.title}</h4>
        <button className="btn-link" onClick={clearAll}>{t.notifications.clearAll}</button>
      </div>

      {NOTIF_KEYS.map(n => {
        const isUnread = n.unread && !read.includes(n.id);
        const item = t.notifications.items[n.key];
        const time = t.notifications.times[n.timeKey];
        return (
          <div key={n.id} className={`notif-item${isUnread ? ' unread' : ''}`}>
            <div className={`notif-icon ${n.cls}`}><n.Icon /></div>
            <div className="notif-body">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              <span>{time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
