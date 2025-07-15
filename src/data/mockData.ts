import type { User, Doctor, Camp, HealthRecord, Scheme, KPIData, ChartData, ActivityLog } from '../types/interfaces';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'राम कुमार',
    email: 'ram.kumar@company.com',
    phone: '9876543210',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    employeeId: 'EMP001',
    department: 'IT',
    joiningDate: '2022-01-15'
  },
  {
    id: '2',
    name: 'सुनीता देवी',
    email: 'sunita.devi@company.com',
    phone: '8765432109',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    employeeId: 'EMP002',
    department: 'HR',
    joiningDate: '2021-06-10'
  },
  {
    id: '3',
    name: 'अमित शर्मा',
    email: 'amit.sharma@company.com',
    phone: '7654321098',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    employeeId: 'EMP003',
    department: 'Admin',
    joiningDate: '2020-03-20'
  },
  {
    id: '4',
    name: 'प्रिया गुप्ता',
    email: 'priya.gupta@company.com',
    phone: '6543210987',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    employeeId: 'EMP004',
    department: 'Finance',
    joiningDate: '2023-02-05'
  }
];

// Mock Doctors Data
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'डॉ. राजेश वर्मा',
    specialty: 'General Medicine',
    phone: '9876543210',
    email: 'dr.rajesh@hospital.com',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    experience: 15,
    qualification: 'MBBS, MD',
    assignedCamps: ['1', '3']
  },
  {
    id: '2',
    name: 'डॉ. सुनीता सिंह',
    specialty: 'Cardiology',
    phone: '8765432109',
    email: 'dr.sunita@hospital.com',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    experience: 12,
    qualification: 'MBBS, DM (Cardiology)',
    assignedCamps: ['2', '4']
  },
  {
    id: '3',
    name: 'डॉ. अनिल कुमार',
    specialty: 'Orthopedics',
    phone: '7654321098',
    email: 'dr.anil@hospital.com',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
    experience: 18,
    qualification: 'MBBS, MS (Ortho)',
    assignedCamps: ['1', '2']
  },
  {
    id: '4',
    name: 'डॉ. मीना पटेल',
    specialty: 'Gynecology',
    phone: '6543210987',
    email: 'dr.meena@hospital.com',
    avatar: 'https://images.unsplash.com/photo-1594824804732-ca58f6520cd4?w=100&h=100&fit=crop&crop=face',
    experience: 10,
    qualification: 'MBBS, MS (Gynec)',
    assignedCamps: ['3', '4']
  }
];

// Mock Camps Data
export const mockCamps: Camp[] = [
  {
    id: '1',
    location: 'रायपुर कार्यालय',
    date: '2025-07-18',
    time: '09:00 AM - 05:00 PM',
    doctors: ['1', '3'],
    status: 'scheduled',
    beneficiaries: 0,
    expectedBeneficiaries: 150,
    address: 'सेक्टर 24, नया रायपुर, छत्तीसगढ़',
    coordinator: 'अमित शर्मा'
  },
  {
    id: '2',
    location: 'भिलाई शाखा',
    date: '2025-07-20',
    time: '10:00 AM - 04:00 PM',
    doctors: ['2', '3'],
    status: 'scheduled',
    beneficiaries: 0,
    expectedBeneficiaries: 120,
    address: 'सेक्टर 7, भिलाई, छत्तीसगढ़',
    coordinator: 'सुनीता देवी'
  },
  {
    id: '3',
    location: 'दुर्ग केंद्र',
    date: '2025-07-15',
    time: '08:30 AM - 03:30 PM',
    doctors: ['1', '4'],
    status: 'completed',
    beneficiaries: 95,
    expectedBeneficiaries: 100,
    address: 'सिविल लाइन्स, दुर्ग, छत्तीसगढ़',
    coordinator: 'राम कुमार'
  },
  {
    id: '4',
    location: 'बिलासपुर कार्यालय',
    date: '2025-07-22',
    time: '09:30 AM - 04:30 PM',
    doctors: ['2', '4'],
    status: 'scheduled',
    beneficiaries: 0,
    expectedBeneficiaries: 180,
    address: 'लिंक रोड, बिलासपुर, छत्तीसगढ़',
    coordinator: 'प्रिया गुप्ता'
  }
];

// Mock Health Records
export const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    userId: '1',
    date: '2025-07-10',
    bloodPressure: { systolic: 120, diastolic: 80 },
    sugarLevel: 110,
    weight: 70,
    height: 175,
    bmi: 22.9,
    notes: 'सामान्य स्वास्थ्य',
    campId: '3'
  },
  {
    id: '2',
    userId: '2',
    date: '2025-07-10',
    bloodPressure: { systolic: 130, diastolic: 85 },
    sugarLevel: 140,
    weight: 65,
    height: 160,
    bmi: 25.4,
    notes: 'हल्का मधुमेह',
    campId: '3'
  },
  {
    id: '3',
    userId: '1',
    date: '2025-06-15',
    bloodPressure: { systolic: 115, diastolic: 75 },
    sugarLevel: 105,
    weight: 69,
    height: 175,
    bmi: 22.5,
    notes: 'अच्छा स्वास्थ्य'
  },
  {
    id: '4',
    userId: '4',
    date: '2025-07-12',
    bloodPressure: { systolic: 125, diastolic: 82 },
    sugarLevel: 98,
    weight: 55,
    height: 155,
    bmi: 22.9,
    notes: 'उत्कृष्ट स्वास्थ्य'
  }
];

// Mock Schemes Data
export const mockSchemes: Scheme[] = [
  {
    id: '1',
    applicantName: 'राम कुमार',
    employeeId: 'EMP001',
    schemeName: 'आयुष्मान भारत योजना',
    appliedDate: '2025-07-01',
    status: 'pending',
    documents: ['आधार कार्ड', 'वेतन प्रमाण पत्र', 'चिकित्सा रिपोर्ट'],
    amount: 50000,
    remarks: 'दस्तावेज़ सत्यापन के लिए भेजा गया'
  },
  {
    id: '2',
    applicantName: 'सुनीता देवी',
    employeeId: 'EMP002',
    schemeName: 'मातृत्व लाभ योजना',
    appliedDate: '2025-06-25',
    status: 'approved',
    documents: ['आधार कार्ड', 'प्रसव प्रमाण पत्र', 'बैंक पासबुक'],
    amount: 25000,
    reviewedBy: 'अमित शर्मा',
    reviewDate: '2025-07-05',
    remarks: 'सभी दस्तावेज़ सत्यापित'
  },
  {
    id: '3',
    applicantName: 'प्रिया गुप्ता',
    employeeId: 'EMP004',
    schemeName: 'स्वास्थ्य बीमा योजना',
    appliedDate: '2025-06-30',
    status: 'rejected',
    documents: ['आधार कार्ड', 'वेतन प्रमाण पत्र'],
    amount: 75000,
    reviewedBy: 'अमित शर्मा',
    reviewDate: '2025-07-08',
    remarks: 'अपूर्ण दस्तावेज़'
  },
  {
    id: '4',
    applicantName: 'राम कुमार',
    employeeId: 'EMP001',
    schemeName: 'दुर्घटना बीमा योजना',
    appliedDate: '2025-07-05',
    status: 'pending',
    documents: ['आधार कार्ड', 'चिकित्सा रिपोर्ट', 'FIR कॉपी'],
    amount: 100000,
    remarks: 'चिकित्सा जांच के लिए भेजा गया'
  }
];

// Mock KPI Data
export const mockKPIData: KPIData = {
  totalCamps: 4,
  totalUsers: 4,
  totalSchemes: 4,
  totalDoctors: 4,
  monthlyBeneficiaries: 95,
  approvedSchemes: 1
};

// Mock Chart Data for last 6 months
export const mockChartData: ChartData[] = [
  { महीना: 'फर', शिविर: 3, लाभार्थी: 280 },
  { महीना: 'मार्च', शिविर: 4, लाभार्थी: 350 },
  { महीना: 'अप्रै', शिविर: 2, लाभार्थी: 180 },
  { महीना: 'मई', शिविर: 5, लाभार्थी: 420 },
  { महीना: 'जून', शिविर: 3, लाभार्थी: 290 },
  { महीना: 'जुला', शिविर: 1, लाभार्थी: 95 }
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'शिविर पूर्ण',
    user: 'डॉ. राजेश वर्मा',
    timestamp: '2025-07-15 03:30 PM',
    details: 'दुर्ग केंद्र में स्वास्थ्य शिविर पूर्ण'
  },
  {
    id: '2',
    action: 'योजना स्वीकृत',
    user: 'अमित शर्मा',
    timestamp: '2025-07-14 02:15 PM',
    details: 'सुनीता देवी की मातृत्व लाभ योजना अनुमोदित'
  },
  {
    id: '3',
    action: 'नए डॉक्टर जोड़े गए',
    user: 'व्यवस्थापक',
    timestamp: '2025-07-13 11:30 AM',
    details: 'डॉ. मीना पटेल को टीम में शामिल किया गया'
  },
  {
    id: '4',
    action: 'स्वास्थ्य रिकॉर्ड अपडेट',
    user: 'डॉ. सुनीता सिंह',
    timestamp: '2025-07-12 04:45 PM',
    details: 'प्रिया गुप्ता का स्वास्थ्य रिकॉर्ड अपडेट किया गया'
  },
  {
    id: '5',
    action: 'शिविर निर्धारित समय',
    user: 'अमित शर्मा',
    timestamp: '2025-07-11 10:00 AM',
    details: 'बिलासपुर कार्यालय में नया शिविर निर्धारित'
  }
];

// Utility functions for data filtering and searching
export const getSchemesByStatus = (status: 'pending' | 'approved' | 'rejected') => {
  return mockSchemes.filter(scheme => scheme.status === status);
};

export const getUserHealthRecords = (userId: string) => {
  return mockHealthRecords.filter(record => record.userId === userId);
};

export const getDoctorById = (id: string) => {
  return mockDoctors.find(doctor => doctor.id === id);
};

export const getCampById = (id: string) => {
  return mockCamps.find(camp => camp.id === id);
};

export const searchData = <T extends Record<string, any>>(data: T[], searchTerm: string, fields: (keyof T)[]): T[] => {
  if (!searchTerm) return data;
  
  return data.filter(item =>
    fields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );
};
