// ─────────────────────────────────────────────
//  MediCore — Clinical Feature Data
// ─────────────────────────────────────────────

// ── Patient vitals history ────────────────────
export const VITALS_HISTORY = [
  { date: '03/26/2026', bp: '120/80', pulse: 72,  temp: 36.6, spo2: 98, weight: 74 },
  { date: '03/24/2026', bp: '118/76', pulse: 68,  temp: 36.8, spo2: 97, weight: 74 },
  { date: '03/20/2026', bp: '125/82', pulse: 75,  temp: 37.1, spo2: 96, weight: 75 },
  { date: '03/14/2026', bp: '122/79', pulse: 70,  temp: 36.5, spo2: 98, weight: 74 },
  { date: '03/08/2026', bp: '119/77', pulse: 73,  temp: 36.7, spo2: 99, weight: 73 },
];

// ── Medical history timeline ──────────────────
export const MEDICAL_HISTORY = [
  { date: '03/20/2026', type: 'Diagnosis',    desc: 'Type 2 Diabetes confirmed', doctor: 'Dr. Yıldız' },
  { date: '02/15/2026', type: 'Lab',          desc: 'HbA1c: 7.2% — elevated',   doctor: 'Dr. Kaplan' },
  { date: '01/10/2026', type: 'Consultation', desc: 'Annual checkup — normal',   doctor: 'Dr. Yıldız' },
  { date: '11/20/2025', type: 'Surgery',      desc: 'Appendectomy — successful', doctor: 'Dr. Arslan' },
  { date: '09/05/2025', type: 'Admission',    desc: 'Admitted — chest pain',     doctor: 'Dr. Kaplan' },
];

// ── Allergies ────────────────────────────────
export const ALLERGIES = [
  { substance: 'Penicillin',  reaction: 'Rash',            severity: 'Moderate' },
  { substance: 'Aspirin',     reaction: 'GI upset',         severity: 'Mild'     },
  { substance: 'Pollen',      reaction: 'Rhinitis',         severity: 'Mild'     },
];

// ── Prescriptions ────────────────────────────
export const PRESCRIPTION_DATA = [
  {
    id: 'RX-2026-0128', patient: 'Mehmet Kaya', doctor: 'Dr. Kaplan',
    date: '03/26/2026', dept: 'Cardiology', status: 'Active',
    medications: [
      { name: 'Metformin 850mg',   dose: '1 tab',  freq: 'Twice daily', duration: '90 days' },
      { name: 'Atorvastatin 20mg', dose: '1 tab',  freq: 'Once daily',  duration: '90 days' },
    ],
    notes: 'Take with food. Monitor blood sugar weekly.',
  },
  {
    id: 'RX-2026-0127', patient: 'Ayşe Demir', doctor: 'Dr. Yıldız',
    date: '03/25/2026', dept: 'Internal Medicine', status: 'Active',
    medications: [
      { name: 'Amoxicillin 500mg', dose: '1 cap',  freq: 'Three times daily', duration: '10 days' },
      { name: 'Omeprazole 20mg',   dose: '1 tab',  freq: 'Once daily',        duration: '30 days' },
    ],
    notes: 'Complete full antibiotic course.',
  },
  {
    id: 'RX-2026-0126', patient: 'Zeynep Koç', doctor: 'Dr. Şahin',
    date: '03/24/2026', dept: 'Neurology', status: 'Completed',
    medications: [
      { name: 'Ibuprofen 400mg',   dose: '1 tab',  freq: 'As needed',    duration: '7 days'  },
    ],
    notes: 'Do not exceed 3 tablets per day.',
  },
  {
    id: 'RX-2026-0125', patient: 'Hasan Öztürk', doctor: 'Dr. Arslan',
    date: '03/22/2026', dept: 'Orthopedics', status: 'Active',
    medications: [
      { name: 'Calcium 500mg',     dose: '2 tabs', freq: 'Once daily',   duration: '180 days' },
      { name: 'Vitamin D 1000IU',  dose: '1 tab',  freq: 'Once daily',   duration: '180 days' },
    ],
    notes: 'Post-fracture rehabilitation protocol.',
  },
  {
    id: 'RX-2026-0124', patient: 'Ali Çelik', doctor: 'Dr. Kaplan',
    date: '03/20/2026', dept: 'Cardiology', status: 'Active',
    medications: [
      { name: 'Losartan 50mg',     dose: '1 tab',  freq: 'Once daily',   duration: '90 days'  },
      { name: 'Aspirin 100mg',     dose: '1 tab',  freq: 'Once daily',   duration: '90 days'  },
    ],
    notes: 'Monitor blood pressure daily. Avoid NSAIDs.',
  },
];

// ── Surgery schedule ──────────────────────────
export const SURGERY_DATA = [
  {
    id: 'SRG-001', patient: 'Fatma Yılmaz', doctor: 'Dr. Arslan',
    type: 'Laparoscopic Cholecystectomy', dept: 'Orthopedics',
    date: '03/28/2026', time: '08:00', or: 'OR-1',
    duration: 90, anesthesia: 'General', status: 'Scheduled',
    team: ['Dr. Arslan', 'Dr. Demir', 'Nurse Kadir'],
    notes: 'Patient NPO since midnight.',
  },
  {
    id: 'SRG-002', patient: 'Mehmet Kaya', doctor: 'Dr. Kaplan',
    type: 'Coronary Angioplasty', dept: 'Cardiology',
    date: '03/28/2026', time: '10:30', or: 'OR-2',
    duration: 120, anesthesia: 'Local', status: 'Confirmed',
    team: ['Dr. Kaplan', 'Dr. Çelik', 'Nurse Selin'],
    notes: 'Pre-op labs completed.',
  },
  {
    id: 'SRG-003', patient: 'Ali Çelik', doctor: 'Dr. Arslan',
    type: 'Knee Arthroscopy', dept: 'Orthopedics',
    date: '03/29/2026', time: '09:00', or: 'OR-1',
    duration: 75, anesthesia: 'Spinal', status: 'Scheduled',
    team: ['Dr. Arslan', 'Nurse Kadir'],
    notes: 'Physiotherapy booked for post-op.',
  },
  {
    id: 'SRG-004', patient: 'Zeynep Koç', doctor: 'Dr. Şahin',
    type: 'Lumbar Discectomy', dept: 'Neurology',
    date: '03/29/2026', time: '11:30', or: 'OR-3',
    duration: 180, anesthesia: 'General', status: 'Pending Consent',
    team: ['Dr. Şahin', 'Dr. Güneş', 'Nurse Selin'],
    notes: 'Consent form pending signature.',
  },
  {
    id: 'SRG-005', patient: 'Hasan Öztürk', doctor: 'Dr. Arslan',
    type: 'Hip Replacement', dept: 'Orthopedics',
    date: '03/30/2026', time: '08:30', or: 'OR-2',
    duration: 150, anesthesia: 'General', status: 'Confirmed',
    team: ['Dr. Arslan', 'Dr. Demir', 'Nurse Kadir'],
    notes: 'Blood type matched. Crossmatch done.',
  },
  {
    id: 'SRG-006', patient: 'Burak Şahin', doctor: 'Dr. Kaplan',
    type: 'Pacemaker Implantation', dept: 'Cardiology',
    date: '03/30/2026', time: '14:00', or: 'OR-2',
    duration: 120, anesthesia: 'Local', status: 'Scheduled',
    team: ['Dr. Kaplan', 'Dr. Çelik'],
    notes: 'Device ordered. EPS scheduled beforehand.',
  },
];

// ── Discharge summaries ───────────────────────
export const DISCHARGE_DATA = [
  {
    id: 'DC-001', patient: 'Ayşe Demir', patientId: 'PAT-0002',
    admitDate: '03/20/2026', dischargeDate: '03/26/2026', stayDays: 6,
    dept: 'Internal Medicine', doctor: 'Dr. Yıldız',
    diagnosis: 'Community-acquired pneumonia',
    procedures: ['Chest X-ray', 'Blood cultures x2', 'IV antibiotics'],
    condition: 'Improved',
    followUp: '04/05/2026',
    followUpDept: 'Internal Medicine',
    instructions: 'Complete oral antibiotics course. Rest for 1 week. Return if fever > 38.5°C.',
    medications: [
      { name: 'Amoxicillin 500mg', dose: '1 cap three times daily for 7 days' },
      { name: 'Vitamin C 1000mg',  dose: '1 tab once daily for 30 days'       },
    ],
    status: 'Completed',
  },
  {
    id: 'DC-002', patient: 'Burak Şahin', patientId: 'PAT-0006',
    admitDate: '03/14/2026', dischargeDate: '03/20/2026', stayDays: 6,
    dept: 'Cardiology', doctor: 'Dr. Kaplan',
    diagnosis: 'Acute myocardial infarction (NSTEMI)',
    procedures: ['Coronary angiography', 'Stent placement x1', 'ECG monitoring'],
    condition: 'Stable',
    followUp: '04/03/2026',
    followUpDept: 'Cardiology',
    instructions: 'Strict low-sodium, low-fat diet. Cardiac rehab enrollment. No heavy lifting.',
    medications: [
      { name: 'Aspirin 100mg',     dose: '1 tab once daily — lifelong' },
      { name: 'Atorvastatin 40mg', dose: '1 tab once daily at night'   },
      { name: 'Metoprolol 25mg',   dose: '1 tab twice daily'           },
    ],
    status: 'Completed',
  },
  {
    id: 'DC-003', patient: 'Fatma Yılmaz', patientId: 'PAT-0005',
    admitDate: '03/22/2026', dischargeDate: null, stayDays: null,
    dept: 'Orthopedics', doctor: 'Dr. Arslan',
    diagnosis: 'Acute cholecystitis',
    procedures: ['Abdominal ultrasound', 'IV fluids', 'Analgesics'],
    condition: 'Awaiting Surgery',
    followUp: null,
    followUpDept: 'Orthopedics',
    instructions: 'NPO from midnight before surgery.',
    medications: [],
    status: 'Draft',
  },
];

// ── Bed management ────────────────────────────
export const WARDS = [
  { id: 'W1', name: 'Internal Medicine', nameTr: 'Dahiliye',    color: '#3b82f6', totalBeds: 20 },
  { id: 'W2', name: 'Cardiology',        nameTr: 'Kardiyoloji', color: '#ef4444', totalBeds: 16 },
  { id: 'W3', name: 'Orthopedics',       nameTr: 'Ortopedi',    color: '#f59e0b', totalBeds: 18 },
  { id: 'W4', name: 'Neurology',         nameTr: 'Nöroloji',    color: '#8b5cf6', totalBeds: 14 },
  { id: 'W5', name: 'Pediatrics',        nameTr: 'Pediatri',    color: '#10b981', totalBeds: 12 },
  { id: 'W6', name: 'Emergency',         nameTr: 'Acil Servis', color: '#f97316', totalBeds: 10 },
];

// Generate beds per ward
export function generateBeds() {
  const patientNames = [
    'Mehmet Kaya','Ayşe Demir','Ali Çelik','Zeynep Koç','Hasan Öztürk',
    'Fatma Yılmaz','Burak Şahin','Selin Arslan','Tolga Güneş','Merve Yıldız',
    'İbrahim Çetin','Emine Doğan','Hüseyin Kılıç','Meryem Aslan','Ömer Yıldırım',
    'Zeliha Kaplan','Mustafa Aydın','Hatice Bulut','Süleyman Erdoğan','Rabia Koç',
  ];
  const doctors = ['Dr. Kaplan','Dr. Arslan','Dr. Şahin','Dr. Yıldız','Dr. Güneş','Dr. Demir'];

  const beds = [];
  let nameIdx = 0;

  WARDS.forEach(ward => {
    for (let b = 1; b <= ward.totalBeds; b++) {
      const pct = ward.id === 'W2' ? 0.91 : ward.id === 'W6' ? 0.83 :
                  ward.id === 'W1' ? 0.78 : ward.id === 'W3' ? 0.62 :
                  ward.id === 'W4' ? 0.55 : 0.44;
      const occupied = Math.random() < pct;
      const isCleaning = !occupied && Math.random() < 0.15;

      beds.push({
        id:      `${ward.id}-B${String(b).padStart(2,'0')}`,
        ward:    ward.id,
        number:  b,
        status:  occupied ? 'Occupied' : isCleaning ? 'Cleaning' : 'Available',
        patient: occupied ? patientNames[nameIdx++ % patientNames.length] : null,
        doctor:  occupied ? doctors[Math.floor(Math.random() * doctors.length)] : null,
        admitDate: occupied ? '03/2' + (Math.floor(Math.random()*8)+18) + '/2026' : null,
      });
    }
  });
  return beds;
}
