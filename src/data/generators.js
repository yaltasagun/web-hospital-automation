// ─────────────────────────────────────────────
//  MediCore — Sample Data Generators
// ─────────────────────────────────────────────
import { DEPARTMENTS, DOCTORS, STATUSES, APPT_TYPES, BLOOD_GROUPS } from './constants';

const FIRST_NAMES = [
  'Mehmet','Ayşe','Ali','Fatma','Hasan','Zeynep','Ahmet','Elif',
  'Mustafa','Hatice','İbrahim','Emine','Hüseyin','Meryem','Ömer',
  'Zeliha','Süleyman','Hacer','İsmail','Rabia',
];

const LAST_NAMES = [
  'Yılmaz','Kaya','Demir','Çelik','Şahin','Yıldız','Öztürk','Arslan',
  'Doğan','Kılıç','Aslan','Çetin','Demirel','Kaplan','Güneş',
  'Koç','Aydın','Bulut','Erdoğan','Yıldırım',
];

const PATIENT_NAMES_FOR_APPTS = [
  'Mehmet Kaya','Ayşe Demir','Ali Çelik','Zeynep Koç',
  'Hasan Öztürk','Fatma Yılmaz','Burak Şahin','Selin Arslan',
  'Tolga Güneş','Merve Yıldız',
];

const APPT_STATUSES = ['Completed', 'Waiting', 'In Progress', 'Cancelled'];

/** Generate 248 sample patients (deterministic, no Math.random) */
export function generatePatients() {
  return Array.from({ length: 248 }, (_, i) => ({
    id:     `PAT-${String(i + 1).padStart(4, '0')}`,
    first:  FIRST_NAMES[i % FIRST_NAMES.length],
    last:   LAST_NAMES[i % LAST_NAMES.length],
    age:    5 + (i * 7) % 75,
    dept:   DEPARTMENTS[i % DEPARTMENTS.length],
    doctor: DOCTORS[i % DOCTORS.length],
    status: STATUSES[i % STATUSES.length],
    blood:  BLOOD_GROUPS[i % BLOOD_GROUPS.length],
    date:   `03/${String((i % 26) + 1).padStart(2, '0')}/2026`,
  }));
}

/** Generate 38 sample appointments (deterministic) */
export function generateAppointments() {
  return Array.from({ length: 38 }, (_, i) => {
    const h   = 8 + (i % 10);
    const min = i % 2 === 0 ? '00' : '30';
    return {
      id:      i,
      time:    `${String(h).padStart(2, '0')}:${min}`,
      patient: PATIENT_NAMES_FOR_APPTS[i % PATIENT_NAMES_FOR_APPTS.length],
      doctor:  DOCTORS[i % DOCTORS.length],
      dept:    DEPARTMENTS[i % DEPARTMENTS.length],
      type:    APPT_TYPES[i % APPT_TYPES.length],
      status:  APPT_STATUSES[i % APPT_STATUSES.length],
    };
  }).sort((a, b) => a.time.localeCompare(b.time));
}
