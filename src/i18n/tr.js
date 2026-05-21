// ─────────────────────────────────────────────
//  MediCore — Türkçe çeviriler
// ─────────────────────────────────────────────
const tr = {
  // ── Sidebar ──────────────────────────────
  sidebar: {
    system:        'Hastane Sistemi',
    role:          'Sistem Yöneticisi',
    groups: {
      main:       'ANA MENÜ',
      clinical:   'KLİNİK',
      management: 'YÖNETİM',
    },
  },

  // ── Nav items ────────────────────────────
  nav: {
    dashboard:     'Gösterge',
    patients:      'Hastalar',
    appointments:  'Randevular',
    doctors:       'Doktorlar',
    laboratory:    'Laboratuvar',
    pharmacy:      'Eczane',
    prescriptions: 'Reçeteler',
    surgery:       'Ameliyat',
    discharge:     'Taburcu',
    beds:          'Yataklar',
    reports:       'Raporlar',
    financial:     'Finansal',
    settings:      'Ayarlar',
  },

  // ── Page titles ──────────────────────────
  pages: {
    dashboard:     'Gösterge Paneli',
    patients:      'Hasta Yönetimi',
    appointments:  'Randevu Takibi',
    doctors:       'Doktor Yönetimi',
    laboratory:    'Laboratuvar',
    pharmacy:      'Eczane',
    prescriptions: 'Reçete Yönetimi',
    surgery:       'Ameliyat Programı',
    discharge:     'Taburcu Özetleri',
    beds:          'Yatak Yönetimi',
    reports:       'Raporlar ve İstatistikler',
    financial:     'Finansal Yönetim',
    settings:      'Sistem Ayarları',
  },

  // ── Topbar ───────────────────────────────
  topbar: {
    searchPlaceholder: 'Hasta, doktor ara...',
    collapse:          'Daralt',
    expand:            'Genişlet',
  },

  // ── Notifications ────────────────────────
  notifications: {
    title:    'Bildirimler',
    clearAll: 'Temizle',
    items: {
      emergency:   { title: 'Acil Vaka!',            body: 'Kardiyoloji — Oda 118'                },
      appointment: { title: 'Randevu Hatırlatıcısı', body: 'Ali Çelik — 10:30 randevusu'         },
      lab:         { title: 'Lab Sonucu Hazır',      body: 'Zeynep Koç kan tahlili tamamlandı'   },
    },
    times: {
      twoMin:    '2 dk önce',
      fifteenMin:'15 dk önce',
      oneHour:   '1 sa önce',
    },
  },

  // ── Common ───────────────────────────────
  common: {
    save:       'Kaydet',
    cancel:     'İptal',
    edit:       'Düzenle',
    delete:     'Sil',
    view:       'Görüntüle',
    print:      'Yazdır',
    details:    'Detay',
    viewAll:    'Tümünü Gör',
    allDepts:   'Tüm Departmanlar',
    allStatuses:'Tüm Durumlar',
    allDoctors: 'Tüm Doktorlar',
    select:     'Seçin',
    required:   'Zorunlu',
    search:     'Ara',
  },

  // ── Dashboard ────────────────────────────
  dashboard: {
    totalPatients:       'Toplam Hasta',
    todayAppointments:   'Bugünkü Randevular',
    activeDoctors:       'Aktif Doktor',
    emergencyCases:      'Acil Vaka',
    change: {
      thisWeek:  '↑ Bu hafta 12',
      pending:   '↑ 5 bekliyor',
      onLeave:   '= 3 izinde',
      resolved:  '↓ 2 çözüldü',
    },
    weeklyActivity:      'Haftalık Hasta Hareketleri',
    admissions:          'Kabul',
    discharges:          'Taburcu',
    recentActivity:      'Son Aktiviteler',
    deptOccupancy:       'Departman Doluluk Oranları',
    todayAppts:          'Bugünkü Randevular',
    activity: {
      newPatient:     'Yeni hasta kaydı',
      discharged:     'Taburcu işlemi',
      labReady:       'Lab sonucu hazır',
      emergency:      'Acil çağrı',
      prescriptions:  'Reçete yazıldı',
    },
  },

  // ── Patients ─────────────────────────────
  patients: {
    title:         'Hasta Listesi',
    newBtn:        'Yeni Hasta',
    searchPlaceholder: 'Hasta ara...',
    count:         (n) => `${n} hasta`,
    showing:       (start, end, total) => `${start}–${end} / ${total}`,
    cols: {
      id:         'Hasta ID',
      name:       'Ad Soyad',
      age:        'Yaş',
      dept:       'Departman',
      doctor:     'Doktor',
      status:     'Durum',
      admission:  'Yatış Tarihi',
      actions:    'İşlem',
    },
  },

  // ── Patient Form ─────────────────────────
  patientForm: {
    title:        'Yeni Hasta Kaydı',
    firstName:    'Ad *',
    lastName:     'Soyad *',
    dob:          'Doğum Tarihi',
    bloodType:    'Kan Grubu',
    department:   'Departman *',
    doctor:       'Doktor *',
    status:       'Durum',
    phone:        'Telefon',
    complaint:    'Şikayet / Tanı',
    placeholders: {
      firstName:  'Ad',
      lastName:   'Soyad',
      phone:      '+90 5XX XXX XX XX',
      complaint:  'Şikayet ve notlar...',
    },
    errors: {
      required:     'Zorunlu alan',
      invalidPhone: 'Geçersiz telefon',
      futureDate:   'Gelecek tarih',
    },
  },

  // ── Appointments ─────────────────────────
  appointments: {
    title:       'Randevu Listesi',
    newBtn:      'Yeni Randevu',
    calendar:    'Takvim',
    count:       (n) => `${n} randevu`,
    cols: {
      time:    'Saat',
      patient: 'Hasta',
      doctor:  'Doktor',
      dept:    'Departman',
      type:    'Tür',
      status:  'Durum',
      actions: 'İşlem',
    },
    form: {
      title:       'Yeni Randevu',
      patientName: 'Hasta Adı *',
      date:        'Tarih',
      time:        'Saat *',
      doctor:      'Doktor *',
      dept:        'Departman',
      type:        'Tür',
      notes:       'Not',
      placeholder: {
        patient: 'Hasta adı',
        notes:   'Ek notlar...',
      },
    },
    cancel:  'İptal Et',
    details: 'Detay',
  },

  // ── Doctors ──────────────────────────────
  doctors: {
    addBtn:     'Doktor Ekle',
    patients:   'Hasta',
    rating:     'Puan',
    profile:    'Profil',
    appoint:    'Randevu',
    experience: 'deneyim',
  },

  // ── Laboratory ───────────────────────────
  laboratory: {
    title:       'Lab Sonuçları',
    requestBtn:  'Test İste',
    allTests:    'Tüm Testler',
    allStatuses: 'Tüm Durumlar',
    pending:     'Bekliyor',
    completed:   'Tamamlandı',
    cols: {
      id:       'Test ID',
      patient:  'Hasta',
      type:     'Test Türü',
      date:     'İstek Tarihi',
      doctor:   'Doktor',
      status:   'Durum',
      result:   'Sonuç',
      actions:  'İşlem',
    },
    tests: {
      bloodPanel:  'Kan Tahlili',
      urinalysis:  'İdrar Tahlili',
      imaging:     'Görüntüleme',
      culture:     'Kültür',
    },
  },

  // ── Pharmacy ─────────────────────────────
  pharmacy: {
    inventoryTitle:      'Stok Durumu',
    prescriptionsTitle:  'Son Reçeteler',
    prescriptionBtn:     'Reçete Yaz',
    allMedications:      'Tüm İlaçlar',
    antibiotics:         'Antibiyotik',
    analgesics:          'Ağrı Kesici',
    vitamins:            'Vitamin',
    lowStock:            'Düşük Stok',
    inStock:             'Stokta Var',
    cols: {
      medication: 'İlaç',
      category:   'Kategori',
      stock:      'Stok',
      minStock:   'Min. Stok',
      unitPrice:  'Birim Fiyat',
      status:     'Durum',
    },
  },

  // ── Reports ──────────────────────────────
  reports: {
    monthlyStats:    'Aylık Hasta İstatistikleri',
    deptDist:        'Departman Dağılımı',
    summaryTitle:    'Özet Rapor',
    downloadPdf:     'PDF İndir',
    admissions:      'Kabul',
    discharges:      'Taburcu',
    summary: {
      totalAdmissions:  'Toplam Yatış (Bu Ay)',
      avgStay:          'Ortalama Yatış Süresi',
      surgeries:        'Başarılı Ameliyat',
      satisfaction:     'Hasta Memnuniyeti',
      revenue:          'Aylık Gelir',
      expenses:         'Aylık Gider',
    },
    months: ['Eki', 'Kas', 'Ara', 'Oca', 'Şub', 'Mar'],
  },

  // ── Financial ────────────────────────────
  financial: {
    revenue:         'Aylık Gelir',
    expenses:        'Aylık Gider',
    profit:          'Net Kâr',
    pending:         'Bekleyen Ödeme',
    invoiceTitle:    'Fatura Listesi',
    invoiceCount:    (n) => `${n} fatura`,
    changes: {
      revenue:  '↑ %8.2',
      expenses: '↓ %3.1',
      profit:   '↑ %18.4',
      pending:  '= 42 fatura',
    },
    cols: {
      no:      'Fatura No',
      patient: 'Hasta',
      service: 'Hizmet',
      date:    'Tarih',
      amount:  'Tutar',
      status:  'Durum',
      actions: 'İşlem',
    },
  },

  // ── Settings ─────────────────────────────
  settings: {
    general:       'Genel Ayarlar',
    notifications: 'Bildirim Ayarları',
    appearance:    'Tema ve Görünüm',
    systemInfo:    'Sistem Bilgisi',
    userMgmt:      'Kullanıcı Yönetimi',
    saveChanges:   'Kaydet',
    addUser:       'Kullanıcı Ekle',
    darkTheme:     'Koyu Tema',
    lightTheme:    'Açık Tema',
    fields: {
      hospitalName: 'Hastane Adı',
      address:      'Adres',
      phone:        'Telefon',
      email:        'E-posta',
      bedCapacity:  'Yatak Kapasitesi',
    },
    toggles: {
      emergency:    'Acil vaka bildirimleri',
      appointments: 'Randevu hatırlatıcıları',
      lab:          'Lab sonuç bildirimleri',
      stock:        'Stok uyarıları',
      financial:    'Finansal raporlar',
    },
    sys: {
      version:    'Versiyon',
      lastUpdate: 'Son Güncelleme',
      license:    'Lisans',
      server:     'Sunucu Durumu',
      online:     '● Çevrimiçi',
    },
    userRoles: {
      admin:      'Yönetici',
      nurse:      'Hemşire',
      secretary:  'Sekreter',
      lab:        'Lab Teknisyeni',
    },
    active:   'Aktif',
    inactive: 'Pasif',
  },

  // ── Badge statuses ───────────────────────
  status: {
    admitted:    'Yatıyor',
    followUp:    'Takipte',
    discharged:  'Taburcu',
    completed:   'Tamamlandı',
    waiting:     'Bekliyor',
    inProgress:  'Devam Ediyor',
    cancelled:   'İptal',
    paid:        'Ödendi',
    partial:     'Kısmi',
    pending:     'Bekliyor',
    normal:      'Normal',
    abnormal:    'Anormal',
  },

  // ── Dept names ───────────────────────────
  departments: {
    internalMedicine: 'Dahiliye',
    cardiology:       'Kardiyoloji',
    orthopedics:      'Ortopedi',
    neurology:        'Nöroloji',
    pediatrics:       'Pediatri',
    emergency:        'Acil Servis',
  },

  // ── Hasta Profili ─────────────────────────
  profile: {
    title:        'Hasta Profili',
    backToList:   'Hasta Listesine Dön',
    overview:     'Genel Bakış',
    vitals:       'Vital Bulgular',
    history:      'Tıbbi Geçmiş',
    allergies:    'Alerjiler',
    activeMeds:   'Aktif İlaçlar',
    noAllergies:  'Bilinen alerji yok',
    bloodType:    'Kan Grubu',
    admitDate:    'Yatış Tarihi',
    department:   'Departman',
    attendingDoc: 'Sorumlu Doktor',
    vitalsCols: {
      date: 'Tarih', bp: 'Tansiyon', pulse: 'Nabız',
      temp: 'Ateş (°C)', spo2: 'SpO₂ (%)', weight: 'Kilo (kg)',
    },
    historyCols: {
      date: 'Tarih', type: 'Tür', desc: 'Açıklama', doctor: 'Doktor',
    },
    allergyCols: {
      substance: 'Madde', reaction: 'Reaksiyon', severity: 'Şiddet',
    },
    severity:     { mild: 'Hafif', moderate: 'Orta', severe: 'Şiddetli' },
    historyTypes: {
      diagnosis: 'Tanı', lab: 'Lab', consultation: 'Muayene',
      surgery: 'Ameliyat', admission: 'Yatış',
    },
  },

  // ── Reçeteler ─────────────────────────────
  prescriptions: {
    title:       'Reçete Yönetimi',
    newBtn:      'Yeni Reçete',
    allStatuses: 'Tüm Durumlar',
    active:      'Aktif',
    completed:   'Tamamlandı',
    count:       (n) => `${n} reçete`,
    cols: {
      id: 'Reçete No', patient: 'Hasta', doctor: 'Doktor', date: 'Tarih',
      dept: 'Departman', meds: 'İlaçlar', status: 'Durum', actions: 'İşlem',
    },
    detail: {
      title: 'Reçete Detayı', medication: 'İlaç', dose: 'Doz',
      frequency: 'Kullanım Sıklığı', duration: 'Süre',
      notes: 'Klinik Notlar', printBtn: 'Reçeteyi Yazdır',
    },
    form: {
      title: 'Yeni Reçete', patient: 'Hasta *', doctor: 'Doktor *',
      dept: 'Departman', medName: 'İlaç Adı *', dose: 'Doz *',
      frequency: 'Kullanım Sıklığı *', duration: 'Süre *', notes: 'Notlar',
      addMed: 'İlaç Ekle', removeMed: 'Kaldır',
      placeholders: {
        patient: 'Hasta adı', medName: 'örn. Amoksisilin 500mg',
        dose: 'örn. 1 tablet', frequency: 'örn. Günde iki kez',
        duration: 'örn. 10 gün', notes: 'Klinik notlar...',
      },
    },
  },

  // ── Ameliyat Programı ─────────────────────
  surgery: {
    title:       'Ameliyat Programı',
    newBtn:      'Ameliyat Planla',
    allStatuses: 'Tüm Durumlar',
    allOrs:      'Tüm Ameliyathaneler',
    count:       (n) => `${n} ameliyat`,
    cols: {
      id: 'Ameliyat No', patient: 'Hasta', type: 'İşlem', doctor: 'Cerrah',
      date: 'Tarih', time: 'Saat', or: 'Ameliyathane', duration: 'Süre',
      anesthesia: 'Anestezi', status: 'Durum', actions: 'İşlem',
    },
    detail: {
      title: 'Ameliyat Detayı', team: 'Cerrahi Ekip',
      notes: 'Preoperatif Notlar', duration: (m) => `${m} dk`,
    },
    form: {
      title: 'Ameliyat Planla', patient: 'Hasta *', surgeon: 'Cerrah *',
      procedure: 'İşlem *', dept: 'Departman', date: 'Tarih *', time: 'Saat *',
      or: 'Ameliyathane *', duration: 'Tahmini Süre (dk)',
      anesthesia: 'Anestezi Türü', notes: 'Preoperatif Notlar',
    },
    anesthesiaTypes: ['Genel', 'Lokal', 'Spinal', 'Epidural', 'Sedasyon'],
    orRooms: ['AH-1', 'AH-2', 'AH-3', 'AH-4'],
    statusTypes: {
      scheduled: 'Planlandı', confirmed: 'Onaylandı',
      pendingConsent: 'Onay Bekleniyor', inProgress: 'Devam Ediyor',
      completed: 'Tamamlandı', cancelled: 'İptal',
    },
  },

  // ── Taburcu Özeti ─────────────────────────
  discharge: {
    title:       'Taburcu Özetleri',
    newBtn:      'Yeni Taburcu',
    allStatuses: 'Tüm Durumlar',
    count:       (n) => `${n} kayıt`,
    cols: {
      id: 'Kayıt No', patient: 'Hasta', doctor: 'Doktor',
      admitDate: 'Yatış', dischargeDate: 'Taburcu',
      stayDays: 'Yatış Süresi', diagnosis: 'Tanı', status: 'Durum', actions: 'İşlem',
    },
    detail: {
      title: 'Taburcu Özeti', diagnosis: 'Ana Tanı',
      procedures: 'Yapılan İşlemler', condition: 'Taburculuk Durumu',
      medications: 'Taburcu İlaçları', instructions: 'Hasta Talimatları',
      followUp: 'Kontrol Randevusu', followUpDept: 'Kontrol Departmanı',
      stayDays: (n) => `${n} gün`, printBtn: 'Özeti Yazdır',
      conditions: {
        improved: 'İyileşti', stable: 'Stabil', awaitingSurgery: 'Ameliyat Bekliyor',
        transferred: 'Nakledildi', deceased: 'Vefat',
      },
    },
    statuses: { completed: 'Tamamlandı', draft: 'Taslak' },
  },

  // ── Yatak Yönetimi ────────────────────────
  beds: {
    title:      'Yatak Yönetimi',
    overview:   'Servis Özeti',
    totalBeds:  'Toplam Yatak',
    available:  'Boş',
    occupied:   'Dolu',
    cleaning:   'Temizleniyor',
    occupancy:  'Doluluk Oranı',
    selectWard: 'Tüm Servisler',
    legend:     'Gösterge',
    bedDetail: {
      bedNo: 'Yatak No', patient: 'Hasta', doctor: 'Doktor',
      admitted: 'Yatış Tarihi', discharge: 'Yatak Boşalt', assign: 'Hasta Ata',
    },
    statuses: { available: 'Boş', occupied: 'Dolu', cleaning: 'Temizleniyor' },
  },
};

export default tr;

