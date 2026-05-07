// ─────────────────────────────────────────────
//  MediCore — Static Data & Constants
// ─────────────────────────────────────────────

export const DEPARTMENTS = [
  'Internal Medicine', 'Cardiology', 'Orthopedics',
  'Neurology', 'Pediatrics', 'Emergency',
];

export const DOCTORS = [
  'Dr. Kaplan', 'Dr. Arslan', 'Dr. Şahin',
  'Dr. Yıldız', 'Dr. Güneş', 'Dr. Demir', 'Dr. Çelik', 'Dr. Koç',
];

export const STATUSES     = ['Admitted', 'Follow-up', 'Discharged'];
export const APPT_TYPES   = ['Consultation', 'Follow-up', 'Surgery', 'Lab Work'];
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DOCTOR_DATA = [
  { name: 'Dr. Mehmet Kaplan', dept: 'Cardiology',        exp: '12 yrs', patients: 84,  rating: 4.9, init: 'MK', color: '#3b82f6' },
  { name: 'Dr. Selin Arslan',  dept: 'Orthopedics',       exp: '8 yrs',  patients: 62,  rating: 4.7, init: 'SA', color: '#10b981' },
  { name: 'Dr. Can Şahin',     dept: 'Neurology',         exp: '15 yrs', patients: 71,  rating: 4.8, init: 'CS', color: '#8b5cf6' },
  { name: 'Dr. Elif Yıldız',   dept: 'Internal Medicine', exp: '6 yrs',  patients: 93,  rating: 4.6, init: 'EY', color: '#f59e0b' },
  { name: 'Dr. Burak Güneş',   dept: 'Pediatrics',        exp: '10 yrs', patients: 58,  rating: 4.9, init: 'BG', color: '#ef4444' },
  { name: 'Dr. Aylin Demir',   dept: 'Emergency',         exp: '9 yrs',  patients: 110, rating: 4.5, init: 'AD', color: '#f97316' },
  { name: 'Dr. Tolga Çelik',   dept: 'Cardiology',        exp: '18 yrs', patients: 76,  rating: 4.8, init: 'TC', color: '#06b6d4' },
  { name: 'Dr. Merve Koç',     dept: 'Neurology',         exp: '5 yrs',  patients: 45,  rating: 4.7, init: 'MK', color: '#d946ef' },
];

export const LAB_DATA = [
  { id: 'LAB-001', patient: 'Mehmet Kaya',  type: 'Blood Panel', date: '03/26/2026', doctor: 'Dr. Kaplan', status: 'Completed', result: 'Normal'   },
  { id: 'LAB-002', patient: 'Ayşe Demir',   type: 'Urinalysis',  date: '03/26/2026', doctor: 'Dr. Yıldız', status: 'Pending',   result: '—'        },
  { id: 'LAB-003', patient: 'Zeynep Koç',   type: 'Imaging',     date: '03/25/2026', doctor: 'Dr. Şahin',  status: 'Completed', result: 'Abnormal' },
  { id: 'LAB-004', patient: 'Hasan Öztürk', type: 'Blood Panel', date: '03/25/2026', doctor: 'Dr. Arslan', status: 'Completed', result: 'Normal'   },
  { id: 'LAB-005', patient: 'Fatma Yılmaz', type: 'Culture',     date: '03/24/2026', doctor: 'Dr. Güneş',  status: 'Pending',   result: '—'        },
  { id: 'LAB-006', patient: 'Ali Çelik',    type: 'Blood Panel', date: '03/24/2026', doctor: 'Dr. Kaplan', status: 'Completed', result: 'Normal'   },
];

export const PHARMACY_DATA = [
  { name: 'Amoxicillin 500mg',  category: 'Antibiotic',       stock: 245, min: 50,  price: 12.50 },
  { name: 'Ibuprofen 400mg',    category: 'Analgesic',        stock: 180, min: 100, price: 6.90  },
  { name: 'Metformin 850mg',    category: 'Diabetes',         stock: 32,  min: 80,  price: 18.00 },
  { name: 'Aspirin 100mg',      category: 'Anticoagulant',    stock: 560, min: 150, price: 4.75  },
  { name: 'Vitamin D 1000IU',   category: 'Vitamin',          stock: 88,  min: 60,  price: 22.00 },
  { name: 'Omeprazole 20mg',    category: 'Gastric',          stock: 320, min: 100, price: 9.00  },
  { name: 'Losartan 50mg',      category: 'Antihypertensive', stock: 15,  min: 50,  price: 15.50 },
  { name: 'Atorvastatin 20mg',  category: 'Cholesterol',      stock: 210, min: 80,  price: 21.00 },
];

export const PRESCRIPTIONS = [
  { patient: 'Mehmet Kaya',  med: 'Amoxicillin 500mg × 14', doctor: 'Dr. Kaplan', date: '03/26/2026' },
  { patient: 'Zeynep Koç',   med: 'Omeprazole 20mg × 30',   doctor: 'Dr. Şahin',  date: '03/26/2026' },
  { patient: 'Hasan Öztürk', med: 'Metformin 850mg × 60',   doctor: 'Dr. Yıldız', date: '03/25/2026' },
  { patient: 'Ayşe Demir',   med: 'Losartan 50mg × 30',     doctor: 'Dr. Kaplan', date: '03/25/2026' },
  { patient: 'Ali Çelik',    med: 'Ibuprofen 400mg × 20',   doctor: 'Dr. Arslan', date: '03/24/2026' },
];

export const FINANCIAL_DATA = [
  { no: 'INV-2026-0842', patient: 'Mehmet Kaya',  service: 'Surgery',            date: '03/24/2026', amount: 12500, status: 'Paid'    },
  { no: 'INV-2026-0841', patient: 'Ayşe Demir',   service: 'Inpatient (3 days)', date: '03/25/2026', amount: 4800,  status: 'Pending' },
  { no: 'INV-2026-0840', patient: 'Ali Çelik',    service: 'Consultation',       date: '03/26/2026', amount: 650,   status: 'Paid'    },
  { no: 'INV-2026-0839', patient: 'Zeynep Koç',   service: 'MRI Scan',           date: '03/25/2026', amount: 2200,  status: 'Pending' },
  { no: 'INV-2026-0838', patient: 'Hasan Öztürk', service: 'Lab Tests',          date: '03/23/2026', amount: 380,   status: 'Paid'    },
  { no: 'INV-2026-0837', patient: 'Fatma Yılmaz', service: 'Inpatient (1 day)',  date: '03/22/2026', amount: 1600,  status: 'Partial' },
  { no: 'INV-2026-0836', patient: 'Burak Şahin',  service: 'Surgery',            date: '03/20/2026', amount: 18700, status: 'Paid'    },
];

export const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    group: 'MAIN MENU'  },
  { id: 'patients',     label: 'Patients',     group: 'MAIN MENU',  badge: '248' },
  { id: 'appointments', label: 'Appointments', group: 'MAIN MENU',  badge: '12', badgeAccent: true },
  { id: 'doctors',      label: 'Doctors',      group: 'MAIN MENU'  },
  { id: 'laboratory',   label: 'Laboratory',   group: 'MAIN MENU'  },
  { id: 'pharmacy',     label: 'Pharmacy',     group: 'MAIN MENU'  },
  { id: 'reports',      label: 'Reports',      group: 'MANAGEMENT' },
  { id: 'financial',    label: 'Financial',    group: 'MANAGEMENT' },
  { id: 'settings',     label: 'Settings',     group: 'MANAGEMENT' },
];

export const PAGE_TITLES = {
  dashboard:    'Dashboard',
  patients:     'Patient Management',
  appointments: 'Appointment Scheduling',
  doctors:      'Doctor Management',
  laboratory:   'Laboratory',
  pharmacy:     'Pharmacy',
  reports:      'Reports & Statistics',
  financial:    'Financial Management',
  settings:     'System Settings',
};

export const DEPT_OCCUPANCY = [
  { name: 'Internal Medicine', pct: 78, color: '#3b82f6' },
  { name: 'Cardiology',        pct: 91, color: '#ef4444' },
  { name: 'Neurology',         pct: 55, color: '#10b981' },
  { name: 'Orthopedics',       pct: 62, color: '#f59e0b' },
  { name: 'Pediatrics',        pct: 44, color: '#8b5cf6' },
  { name: 'Emergency',         pct: 83, color: '#f97316' },
];

export const RECENT_ACTIVITY = [
  { color: '#3b82f6', title: 'New patient registered',  desc: 'Mehmet Kaya — Internal Medicine', time: '2 min ago'  },
  { color: '#10b981', title: 'Patient discharged',      desc: 'Ayşe Demir — Orthopedics',        time: '18 min ago' },
  { color: '#f59e0b', title: 'Lab result ready',        desc: 'Blood panel — Room 204',           time: '34 min ago' },
  { color: '#ef4444', title: 'Emergency call',          desc: 'Cardiology — Room 118',            time: '1 hr ago'   },
  { color: '#8b5cf6', title: 'Prescriptions issued',    desc: 'Dr. Şahin — 3 patients',          time: '2 hr ago'   },
];

export const TODAY_APPOINTMENTS = [
  { time: '09:00', name: 'Fatma Yıldız',  doc: 'Dr. Kaplan • Cardiology',        status: 'Completed'   },
  { time: '10:30', name: 'Ali Çelik',     doc: 'Dr. Arslan • Orthopedics',       status: 'In Progress' },
  { time: '11:15', name: 'Zeynep Koç',    doc: 'Dr. Şahin • Neurology',          status: 'Waiting'     },
  { time: '13:00', name: 'Hasan Öztürk', doc: 'Dr. Yıldız • Internal Medicine', status: 'Waiting'     },
];

export const BADGE_MAP = {
  'Admitted':    'active',
  'Follow-up':   'waiting',
  'Discharged':  'completed',
  'Completed':   'completed',
  'Waiting':     'waiting',
  'In Progress': 'active',
  'Cancelled':   'cancelled',
  'Paid':        'completed',
  'Partial':     'partial',
  'Pending':     'pending',
  'Normal':      'normal',
  'Abnormal':    'abnormal',
};
