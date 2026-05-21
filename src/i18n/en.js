// ─────────────────────────────────────────────
//  MediCore — English translations
// ─────────────────────────────────────────────
const en = {
  // ── Sidebar ──────────────────────────────
  sidebar: {
    system:        'Hospital System',
    role:          'Administrator',
    groups: {
      main:       'MAIN MENU',
      clinical:   'CLINICAL',
      management: 'MANAGEMENT',
    },
  },

  // ── Nav items ────────────────────────────
  nav: {
    dashboard:     'Dashboard',
    patients:      'Patients',
    appointments:  'Appointments',
    doctors:       'Doctors',
    laboratory:    'Laboratory',
    pharmacy:      'Pharmacy',
    prescriptions: 'Prescriptions',
    surgery:       'Surgery',
    discharge:     'Discharge',
    beds:          'Beds',
    reports:       'Reports',
    financial:     'Financial',
    settings:      'Settings',
  },

  // ── Page titles ──────────────────────────
  pages: {
    dashboard:     'Dashboard',
    patients:      'Patient Management',
    appointments:  'Appointment Scheduling',
    doctors:       'Doctor Management',
    laboratory:    'Laboratory',
    pharmacy:      'Pharmacy',
    prescriptions: 'Prescription Management',
    surgery:       'Surgery Schedule',
    discharge:     'Discharge Summaries',
    beds:          'Bed Management',
    reports:       'Reports & Statistics',
    financial:     'Financial Management',
    settings:      'System Settings',
  },

  // ── Topbar ───────────────────────────────
  topbar: {
    searchPlaceholder: 'Search patients, doctors...',
    collapse:          'Collapse',
    expand:            'Expand',
  },

  // ── Notifications ────────────────────────
  notifications: {
    title:    'Notifications',
    clearAll: 'Clear All',
    items: {
      emergency:   { title: 'Emergency Alert!',      body: 'Cardiology — Room 118'           },
      appointment: { title: 'Appointment Reminder',  body: 'Ali Çelik — 10:30 appointment'   },
      lab:         { title: 'Lab Result Ready',      body: 'Zeynep Koç blood panel complete' },
    },
    times: {
      twoMin:    '2 min ago',
      fifteenMin:'15 min ago',
      oneHour:   '1 hr ago',
    },
  },

  // ── Common ───────────────────────────────
  common: {
    save:       'Save',
    cancel:     'Cancel',
    edit:       'Edit',
    delete:     'Delete',
    view:       'View',
    print:      'Print',
    details:    'Details',
    viewAll:    'View All',
    allDepts:   'All Departments',
    allStatuses:'All Statuses',
    allDoctors: 'All Doctors',
    select:     'Select',
    required:   'Required',
    search:     'Search',
  },

  // ── Dashboard ────────────────────────────
  dashboard: {
    totalPatients:       'Total Patients',
    todayAppointments:   "Today's Appointments",
    activeDoctors:       'Active Doctors',
    emergencyCases:      'Emergency Cases',
    change: {
      thisWeek:  '↑ 12 this week',
      pending:   '↑ 5 pending',
      onLeave:   '= 3 on leave',
      resolved:  '↓ 2 resolved',
    },
    weeklyActivity:      'Weekly Patient Activity',
    admissions:          'Admissions',
    discharges:          'Discharges',
    recentActivity:      'Recent Activity',
    deptOccupancy:       'Department Occupancy',
    todayAppts:          "Today's Appointments",
    activity: {
      newPatient:     'New patient registered',
      discharged:     'Patient discharged',
      labReady:       'Lab result ready',
      emergency:      'Emergency call',
      prescriptions:  'Prescriptions issued',
    },
  },

  // ── Patients ─────────────────────────────
  patients: {
    title:         'Patient List',
    newBtn:        'New Patient',
    searchPlaceholder: 'Search patients...',
    count:         (n) => `${n} patients`,
    showing:       (start, end, total) => `${start}–${end} / ${total}`,
    cols: {
      id:         'Patient ID',
      name:       'Full Name',
      age:        'Age',
      dept:       'Department',
      doctor:     'Doctor',
      status:     'Status',
      admission:  'Admission',
      actions:    'Actions',
    },
  },

  // ── Patient Form ─────────────────────────
  patientForm: {
    title:        'New Patient Registration',
    firstName:    'First Name *',
    lastName:     'Last Name *',
    dob:          'Date of Birth',
    bloodType:    'Blood Type',
    department:   'Department *',
    doctor:       'Doctor *',
    status:       'Status',
    phone:        'Phone',
    complaint:    'Complaint / Diagnosis',
    placeholders: {
      firstName:  'First name',
      lastName:   'Last name',
      phone:      '+1 (555) 000-0000',
      complaint:  'Symptoms and notes...',
    },
    errors: {
      required:     'Required',
      invalidPhone: 'Invalid phone',
      futureDate:   'Future date',
    },
  },

  // ── Appointments ─────────────────────────
  appointments: {
    title:       'Appointment List',
    newBtn:      'New Appointment',
    calendar:    'Calendar',
    count:       (n) => `${n} appointments`,
    cols: {
      time:    'Time',
      patient: 'Patient',
      doctor:  'Doctor',
      dept:    'Department',
      type:    'Type',
      status:  'Status',
      actions: 'Actions',
    },
    form: {
      title:       'New Appointment',
      patientName: 'Patient Name *',
      date:        'Date',
      time:        'Time *',
      doctor:      'Doctor *',
      dept:        'Department',
      type:        'Type',
      notes:       'Notes',
      placeholder: {
        patient: 'Patient name',
        notes:   'Additional notes...',
      },
    },
    cancel:  'Cancel',
    details: 'Details',
  },

  // ── Doctors ──────────────────────────────
  doctors: {
    addBtn:     'Add Doctor',
    patients:   'Patients',
    rating:     'Rating',
    profile:    'Profile',
    appoint:    'Appoint',
    experience: 'experience',
  },

  // ── Laboratory ───────────────────────────
  laboratory: {
    title:       'Lab Results',
    requestBtn:  'Request Test',
    allTests:    'All Tests',
    allStatuses: 'All Statuses',
    pending:     'Pending',
    completed:   'Completed',
    cols: {
      id:       'Test ID',
      patient:  'Patient',
      type:     'Type',
      date:     'Requested',
      doctor:   'Doctor',
      status:   'Status',
      result:   'Result',
      actions:  'Actions',
    },
    tests: {
      bloodPanel:  'Blood Panel',
      urinalysis:  'Urinalysis',
      imaging:     'Imaging',
      culture:     'Culture',
    },
  },

  // ── Pharmacy ─────────────────────────────
  pharmacy: {
    inventoryTitle:      'Inventory Status',
    prescriptionsTitle:  'Recent Prescriptions',
    prescriptionBtn:     'Write Prescription',
    allMedications:      'All Medications',
    antibiotics:         'Antibiotics',
    analgesics:          'Analgesics',
    vitamins:            'Vitamins',
    lowStock:            'Low Stock',
    inStock:             'In Stock',
    cols: {
      medication: 'Medication',
      category:   'Category',
      stock:      'Stock',
      minStock:   'Min Stock',
      unitPrice:  'Unit Price',
      status:     'Status',
    },
  },

  // ── Reports ──────────────────────────────
  reports: {
    monthlyStats:    'Monthly Patient Statistics',
    deptDist:        'Department Distribution',
    summaryTitle:    'Summary Report',
    downloadPdf:     'Download PDF',
    admissions:      'Admissions',
    discharges:      'Discharges',
    summary: {
      totalAdmissions:  'Total Admissions (This Month)',
      avgStay:          'Average Length of Stay',
      surgeries:        'Successful Surgeries',
      satisfaction:     'Patient Satisfaction',
      revenue:          'Monthly Revenue',
      expenses:         'Monthly Expenses',
    },
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  },

  // ── Financial ────────────────────────────
  financial: {
    revenue:         'Monthly Revenue',
    expenses:        'Monthly Expenses',
    profit:          'Net Profit',
    pending:         'Pending Payments',
    invoiceTitle:    'Invoice List',
    invoiceCount:    (n) => `${n} invoices`,
    changes: {
      revenue:  '↑ 8.2%',
      expenses: '↓ 3.1%',
      profit:   '↑ 18.4%',
      pending:  '= 42 invoices',
    },
    cols: {
      no:      'Invoice No',
      patient: 'Patient',
      service: 'Service',
      date:    'Date',
      amount:  'Amount',
      status:  'Status',
      actions: 'Actions',
    },
  },

  // ── Settings ─────────────────────────────
  settings: {
    general:       'General Settings',
    notifications: 'Notification Settings',
    appearance:    'Theme & Appearance',
    systemInfo:    'System Info',
    userMgmt:      'User Management',
    saveChanges:   'Save Changes',
    addUser:       'Add User',
    darkTheme:     'Dark Theme',
    lightTheme:    'Light Theme',
    fields: {
      hospitalName: 'Hospital Name',
      address:      'Address',
      phone:        'Phone',
      email:        'Email',
      bedCapacity:  'Bed Capacity',
    },
    toggles: {
      emergency:    'Emergency case alerts',
      appointments: 'Appointment reminders',
      lab:          'Lab result notifications',
      stock:        'Stock level warnings',
      financial:    'Financial reports',
    },
    sys: {
      version:    'Version',
      lastUpdate: 'Last Update',
      license:    'License',
      server:     'Server Status',
      online:     '● Online',
    },
    userRoles: {
      admin:      'Administrator',
      nurse:      'Nurse',
      secretary:  'Secretary',
      lab:        'Lab Technician',
    },
    active:   'Active',
    inactive: 'Inactive',
  },

  // ── Badge statuses ───────────────────────
  status: {
    admitted:    'Admitted',
    followUp:    'Follow-up',
    discharged:  'Discharged',
    completed:   'Completed',
    waiting:     'Waiting',
    inProgress:  'In Progress',
    cancelled:   'Cancelled',
    paid:        'Paid',
    partial:     'Partial',
    pending:     'Pending',
    normal:      'Normal',
    abnormal:    'Abnormal',
  },

  // ── Dept names ───────────────────────────
  departments: {
    internalMedicine: 'Internal Medicine',
    cardiology:       'Cardiology',
    orthopedics:      'Orthopedics',
    neurology:        'Neurology',
    pediatrics:       'Pediatrics',
    emergency:        'Emergency',
  },

  // ── Patient Profile ───────────────────────
  profile: {
    title:        'Patient Profile',
    backToList:   'Back to Patients',
    overview:     'Overview',
    vitals:       'Vitals',
    history:      'Medical History',
    allergies:    'Allergies',
    activeMeds:   'Active Medications',
    noAllergies:  'No known allergies',
    bloodType:    'Blood Type',
    admitDate:    'Admission Date',
    department:   'Department',
    attendingDoc: 'Attending Doctor',
    vitalsCols: {
      date: 'Date', bp: 'Blood Pressure', pulse: 'Pulse',
      temp: 'Temp (°C)', spo2: 'SpO₂ (%)', weight: 'Weight (kg)',
    },
    historyCols: {
      date: 'Date', type: 'Type', desc: 'Description', doctor: 'Doctor',
    },
    allergyCols: {
      substance: 'Substance', reaction: 'Reaction', severity: 'Severity',
    },
    severity:     { mild: 'Mild', moderate: 'Moderate', severe: 'Severe' },
    historyTypes: {
      diagnosis: 'Diagnosis', lab: 'Lab', consultation: 'Consultation',
      surgery: 'Surgery', admission: 'Admission',
    },
  },

  // ── Prescriptions ─────────────────────────
  prescriptions: {
    title:       'Prescription Management',
    newBtn:      'New Prescription',
    allStatuses: 'All Statuses',
    active:      'Active',
    completed:   'Completed',
    count:       (n) => `${n} prescriptions`,
    cols: {
      id: 'Rx ID', patient: 'Patient', doctor: 'Doctor', date: 'Date',
      dept: 'Department', meds: 'Medications', status: 'Status', actions: 'Actions',
    },
    detail: {
      title: 'Prescription Detail', medication: 'Medication', dose: 'Dose',
      frequency: 'Frequency', duration: 'Duration', notes: 'Clinical Notes', printBtn: 'Print Rx',
    },
    form: {
      title: 'New Prescription', patient: 'Patient *', doctor: 'Doctor *',
      dept: 'Department', medName: 'Medication Name *', dose: 'Dose *',
      frequency: 'Frequency *', duration: 'Duration *', notes: 'Notes',
      addMed: 'Add Medication', removeMed: 'Remove',
      placeholders: {
        patient: 'Patient name', medName: 'e.g. Amoxicillin 500mg',
        dose: 'e.g. 1 tablet', frequency: 'e.g. Twice daily',
        duration: 'e.g. 10 days', notes: 'Clinical notes...',
      },
    },
  },

  // ── Surgery Schedule ──────────────────────
  surgery: {
    title:       'Surgery Schedule',
    newBtn:      'Schedule Surgery',
    allStatuses: 'All Statuses',
    allOrs:      'All Operating Rooms',
    count:       (n) => `${n} surgeries`,
    cols: {
      id: 'Surgery ID', patient: 'Patient', type: 'Procedure', doctor: 'Surgeon',
      date: 'Date', time: 'Time', or: 'O.R.', duration: 'Duration',
      anesthesia: 'Anesthesia', status: 'Status', actions: 'Actions',
    },
    detail: {
      title: 'Surgery Details', team: 'Surgical Team',
      notes: 'Pre-op Notes', duration: (m) => `${m} min`,
    },
    form: {
      title: 'Schedule Surgery', patient: 'Patient *', surgeon: 'Surgeon *',
      procedure: 'Procedure *', dept: 'Department', date: 'Date *', time: 'Time *',
      or: 'Operating Room *', duration: 'Est. Duration (min)',
      anesthesia: 'Anesthesia Type', notes: 'Pre-op Notes',
    },
    anesthesiaTypes: ['General', 'Local', 'Spinal', 'Epidural', 'Sedation'],
    orRooms: ['OR-1', 'OR-2', 'OR-3', 'OR-4'],
    statusTypes: {
      scheduled: 'Scheduled', confirmed: 'Confirmed',
      pendingConsent: 'Pending Consent', inProgress: 'In Progress',
      completed: 'Completed', cancelled: 'Cancelled',
    },
  },

  // ── Discharge Summary ─────────────────────
  discharge: {
    title:       'Discharge Summaries',
    newBtn:      'New Discharge',
    allStatuses: 'All Statuses',
    count:       (n) => `${n} records`,
    cols: {
      id: 'Record ID', patient: 'Patient', doctor: 'Doctor',
      admitDate: 'Admitted', dischargeDate: 'Discharged',
      stayDays: 'Stay', diagnosis: 'Diagnosis', status: 'Status', actions: 'Actions',
    },
    detail: {
      title: 'Discharge Summary', diagnosis: 'Primary Diagnosis',
      procedures: 'Procedures Performed', condition: 'Condition at Discharge',
      medications: 'Discharge Medications', instructions: 'Patient Instructions',
      followUp: 'Follow-up Appointment', followUpDept: 'Follow-up Department',
      stayDays: (n) => `${n} day${n !== 1 ? 's' : ''}`, printBtn: 'Print Summary',
      conditions: {
        improved: 'Improved', stable: 'Stable', awaitingSurgery: 'Awaiting Surgery',
        transferred: 'Transferred', deceased: 'Deceased',
      },
    },
    statuses: { completed: 'Completed', draft: 'Draft' },
  },

  // ── Bed Management ────────────────────────
  beds: {
    title:      'Bed Management',
    overview:   'Ward Overview',
    totalBeds:  'Total Beds',
    available:  'Available',
    occupied:   'Occupied',
    cleaning:   'Cleaning',
    occupancy:  'Occupancy Rate',
    selectWard: 'All Wards',
    legend:     'Legend',
    bedDetail: {
      bedNo: 'Bed No', patient: 'Patient', doctor: 'Doctor',
      admitted: 'Admitted', discharge: 'Discharge Bed', assign: 'Assign Patient',
    },
    statuses: { available: 'Available', occupied: 'Occupied', cleaning: 'Cleaning' },
  },
};

export default en;

