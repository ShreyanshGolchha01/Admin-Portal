import React, { useState } from 'react';
import { 
  Users,
  Plus,
  Calendar,
  Phone,
  MapPin,
  User,
  Baby,
  UserCheck,
  Search,
  Eye,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  age: number;
  gender: 'male' | 'female';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  lastCheckup: string;
  conditions: string[];
  medications: string[];
  nextAppointment?: string;
  bloodGroup?: string;
  allergies: string[];
}

interface Family {
  id: string;
  headName: string;
  phone: string;
  address: string;
  registrationDate: string;
  totalMembers: number;
  members: FamilyMember[];
  emergencyContact: string;
  insuranceDetails?: string;
}

const FamilyHealth: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);

  // Mock families data
  const [families, setFamilies] = useState<Family[]>([
    {
      id: 'F001',
      headName: 'राम कुमार',
      phone: '9876543210',
      address: 'दुर्ग, छत्तीसगढ़',
      registrationDate: '2025-01-15',
      totalMembers: 4,
      emergencyContact: '9876543211',
      insuranceDetails: 'CGHS - 123456789',
      members: [
        {
          id: 'M001',
          name: 'राम कुमार',
          relation: 'spouse',
          age: 45,
          gender: 'male',
          healthStatus: 'good',
          lastCheckup: '2025-07-10',
          conditions: ['मधुमेह'],
          medications: ['मेटफॉर्मिन 500mg'],
          nextAppointment: '2025-08-10',
          bloodGroup: 'B+',
          allergies: []
        },
        {
          id: 'M002',
          name: 'सुनीता कुमार',
          relation: 'spouse',
          age: 40,
          gender: 'female',
          healthStatus: 'excellent',
          lastCheckup: '2025-07-12',
          conditions: [],
          medications: [],
          bloodGroup: 'O+',
          allergies: ['पेनिसिलिन']
        },
        {
          id: 'M003',
          name: 'आर्यन कुमार',
          relation: 'child',
          age: 15,
          gender: 'male',
          healthStatus: 'good',
          lastCheckup: '2025-06-20',
          conditions: ['अस्थमा'],
          medications: ['इन्हेलर'],
          bloodGroup: 'B+',
          allergies: ['धूल']
        },
        {
          id: 'M004',
          name: 'प्रिया कुमार',
          relation: 'child',
          age: 12,
          gender: 'female',
          healthStatus: 'excellent',
          lastCheckup: '2025-07-05',
          conditions: [],
          medications: [],
          bloodGroup: 'O+',
          allergies: []
        }
      ]
    },
    {
      id: 'F002',
      headName: 'मोहन लाल',
      phone: '8765432109',
      address: 'रायपुर, छत्तीसगढ़',
      registrationDate: '2025-02-20',
      totalMembers: 3,
      emergencyContact: '8765432108',
      members: [
        {
          id: 'M005',
          name: 'मोहन लाल',
          relation: 'spouse',
          age: 62,
          gender: 'male',
          healthStatus: 'fair',
          lastCheckup: '2025-07-08',
          conditions: ['उच्च रक्तचाप', 'गठिया'],
          medications: ['एम्लोडिपाइन 5mg', 'डिक्लोफेनाक'],
          nextAppointment: '2025-07-22',
          bloodGroup: 'A+',
          allergies: []
        },
        {
          id: 'M006',
          name: 'गीता देवी',
          relation: 'spouse',
          age: 58,
          gender: 'female',
          healthStatus: 'good',
          lastCheckup: '2025-07-01',
          conditions: ['मधुमेह'],
          medications: ['मेटफॉर्मिन 850mg'],
          bloodGroup: 'A+',
          allergies: ['सल्फा ड्रग्स']
        },
        {
          id: 'M007',
          name: 'राहुल लाल',
          relation: 'child',
          age: 28,
          gender: 'male',
          healthStatus: 'excellent',
          lastCheckup: '2025-06-15',
          conditions: [],
          medications: [],
          bloodGroup: 'A+',
          allergies: []
        }
      ]
    },
    {
      id: 'F003',
      headName: 'सुनीता देवी',
      phone: '7654321098',
      address: 'बिलासपुर, छत्तीसगढ़',
      registrationDate: '2025-03-10',
      totalMembers: 5,
      emergencyContact: '7654321097',
      insuranceDetails: 'ESI - 987654321',
      members: [
        {
          id: 'M008',
          name: 'सुनीता देवी',
          relation: 'spouse',
          age: 35,
          gender: 'female',
          healthStatus: 'good',
          lastCheckup: '2025-07-14',
          conditions: [],
          medications: [],
          nextAppointment: '2025-08-14',
          bloodGroup: 'AB+',
          allergies: []
        },
        {
          id: 'M009',
          name: 'विकास गुप्ता',
          relation: 'spouse',
          age: 38,
          gender: 'male',
          healthStatus: 'fair',
          lastCheckup: '2025-07-11',
          conditions: ['उच्च रक्तचाप'],
          medications: ['लोसार्टन 50mg'],
          bloodGroup: 'AB+',
          allergies: ['आयोडीन']
        },
        {
          id: 'M010',
          name: 'अनिका गुप्ता',
          relation: 'child',
          age: 10,
          gender: 'female',
          healthStatus: 'excellent',
          lastCheckup: '2025-07-13',
          conditions: [],
          medications: [],
          bloodGroup: 'AB+',
          allergies: []
        },
        {
          id: 'M011',
          name: 'आदित्य गुप्ता',
          relation: 'child',
          age: 7,
          gender: 'male',
          healthStatus: 'good',
          lastCheckup: '2025-07-13',
          conditions: ['एलर्जिक राइनाइटिस'],
          medications: ['सेटिरिजिन'],
          bloodGroup: 'AB+',
          allergies: ['पराग']
        },
        {
          id: 'M012',
          name: 'कमला देवी',
          relation: 'parent',
          age: 68,
          gender: 'female',
          healthStatus: 'poor',
          lastCheckup: '2025-07-09',
          conditions: ['मधुमेह', 'गठिया', 'कमजोर दृष्टि'],
          medications: ['मेटफॉर्मिन 1000mg', 'डिक्लोफेनाक', 'आई ड्रॉप्स'],
          nextAppointment: '2025-07-20',
          bloodGroup: 'O-',
          allergies: ['पेनिसिलिन']
        }
      ]
    },
    {
      id: 'F004',
      headName: 'अजय सिंह',
      phone: '6543210987',
      address: 'कोरबा, छत्तीसगढ़',
      registrationDate: '2025-04-25',
      totalMembers: 3,
      emergencyContact: '6543210986',
      members: [
        {
          id: 'M013',
          name: 'अजय सिंह',
          relation: 'spouse',
          age: 42,
          gender: 'male',
          healthStatus: 'critical',
          lastCheckup: '2025-07-15',
          conditions: ['हृदय रोग', 'मधुमेह', 'उच्च रक्तचाप'],
          medications: ['एटोरवास्टेटिन', 'मेटोप्रोलोल', 'इंसुलिन'],
          nextAppointment: '2025-07-18',
          bloodGroup: 'B-',
          allergies: []
        },
        {
          id: 'M014',
          name: 'प्रिया सिंह',
          relation: 'spouse',
          age: 38,
          gender: 'female',
          healthStatus: 'good',
          lastCheckup: '2025-07-12',
          conditions: ['एनीमिया'],
          medications: ['आयरन टैबलेट'],
          bloodGroup: 'B+',
          allergies: []
        },
        {
          id: 'M015',
          name: 'रोहित सिंह',
          relation: 'child',
          age: 16,
          gender: 'male',
          healthStatus: 'excellent',
          lastCheckup: '2025-06-28',
          conditions: [],
          medications: [],
          bloodGroup: 'B+',
          allergies: ['मूंगफली']
        }
      ]
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    relation: 'child' as 'spouse' | 'child' | 'parent' | 'sibling' | 'other',
    age: '',
    gender: 'male' as 'male' | 'female',
    bloodGroup: '',
    conditions: '',
    medications: '',
    allergies: ''
  });

  // Filter families based on search and status
  const filteredFamilies = families.filter(family => {
    const matchesSearch = family.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         family.phone.includes(searchTerm) ||
                         family.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    
    const hasStatusMembers = family.members.some(member => {
      if (statusFilter === 'needs-attention') {
        return member.healthStatus === 'fair' || member.healthStatus === 'poor' || member.healthStatus === 'critical';
      }
      return member.healthStatus === statusFilter;
    });
    
    return matchesSearch && hasStatusMembers;
  });

  // Get health status icon
  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'fair':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'poor':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get health status text
  const getHealthStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'उत्कृष्ट';
      case 'good': return 'अच्छी';
      case 'fair': return 'ठीक';
      case 'poor': return 'खराब';
      case 'critical': return 'गंभीर';
      default: return 'अज्ञात';
    }
  };

  // Get relation text
  const getRelationText = (relation: string) => {
    switch (relation) {
      case 'spouse': return 'पति/पत्नी';
      case 'child': return 'बच्चा';
      case 'parent': return 'माता-पिता';
      case 'sibling': return 'भाई-बहन';
      case 'other': return 'अन्य';
      default: return 'अज्ञात';
    }
  };

  // Get relation icon
  const getRelationIcon = (relation: string, gender: string) => {
    switch (relation) {
      case 'child':
        return <Baby className="h-4 w-4 text-blue-500" />;
      case 'parent':
        return <UserCheck className="h-4 w-4 text-purple-500" />;
      default:
        return <User className={`h-4 w-4 ${gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} />;
    }
  };

  // Handle add member
  const handleAddMember = () => {
    if (!selectedFamily) return;

    const memberId = `M${String(Date.now())}`;
    const member: FamilyMember = {
      id: memberId,
      name: newMember.name,
      relation: newMember.relation,
      age: Number(newMember.age),
      gender: newMember.gender,
      healthStatus: 'good',
      lastCheckup: new Date().toISOString().split('T')[0],
      conditions: newMember.conditions ? newMember.conditions.split(',').map(c => c.trim()) : [],
      medications: newMember.medications ? newMember.medications.split(',').map(m => m.trim()) : [],
      bloodGroup: newMember.bloodGroup,
      allergies: newMember.allergies ? newMember.allergies.split(',').map(a => a.trim()) : []
    };

    setFamilies(prev => prev.map(family => 
      family.id === selectedFamily.id
        ? { ...family, members: [...family.members, member], totalMembers: family.totalMembers + 1 }
        : family
    ));

    setShowAddMember(false);
    setNewMember({
      name: '',
      relation: 'child',
      age: '',
      gender: 'male',
      bloodGroup: '',
      conditions: '',
      medications: '',
      allergies: ''
    });
  };

  // Statistics
  const statistics = {
    totalFamilies: families.length,
    totalMembers: families.reduce((sum, family) => sum + family.totalMembers, 0),
    healthyMembers: families.reduce((sum, family) => 
      sum + family.members.filter(m => m.healthStatus === 'excellent' || m.healthStatus === 'good').length, 0),
    needsAttention: families.reduce((sum, family) => 
      sum + family.members.filter(m => m.healthStatus === 'fair' || m.healthStatus === 'poor' || m.healthStatus === 'critical').length, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">पारिवारिक स्वास्थ्य प्रबंधन</h1>
            <p className="text-green-100">
              परिवारों का संपूर्ण स्वास्थ्य रिकॉर्ड और देखभाल प्रबंधन
            </p>
            <p className="text-green-200 text-sm mt-1">
              नए परिवार मरीज़ प्रबंधन से स्वचालित रूप से जोड़े जाते हैं
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-200" />
            <span className="text-green-100 text-sm">
              {new Date().toLocaleDateString('hi-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card border border-gray-400 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">कुल परिवार</p>
              <p className="text-2xl font-bold text-blue-900">{statistics.totalFamilies}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card border border-gray-400 bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">कुल सदस्य</p>
              <p className="text-2xl font-bold text-purple-900">{statistics.totalMembers}</p>
            </div>
            <UserPlus className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="card border border-gray-400 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">स्वस्थ सदस्य</p>
              <p className="text-2xl font-bold text-green-900">{statistics.healthyMembers}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card border border-gray-400 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 mb-1">ध्यान चाहिए</p>
              <p className="text-2xl font-bold text-red-900">{statistics.needsAttention}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card border border-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="परिवार के मुखिया का नाम, फोन या पता खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">सभी परिवार</option>
              <option value="excellent">उत्कृष्ट स्वास्थ्य</option>
              <option value="good">अच्छी स्वास्थ्य</option>
              <option value="needs-attention">ध्यान चाहिए</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>रिपोर्ट</span>
            </button>
          </div>
        </div>
      </div>

      {/* Families List */}
      <div className="card border border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">पंजीकृत परिवार ({filteredFamilies.length})</h3>
        </div>
        
        <div className="space-y-3">
          {filteredFamilies.map((family) => (
            <div key={family.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{family.headName} का परिवार</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        ID: {family.id}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        {family.totalMembers} सदस्य
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{family.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{family.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>पंजीकरण: {new Date(family.registrationDate).toLocaleDateString('hi-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedFamily(family)}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>सदस्य देखें</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFamily(family);
                      setShowAddMember(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>सदस्य जोड़ें</span>
                  </button>
                </div>
              </div>
              
              {/* Health Status Summary */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">स्वास्थ्य स्थिति सारांश:</span>
                  <div className="flex items-center space-x-3">
                    {/* Health status counts */}
                    {(() => {
                      const healthCounts = family.members.reduce((acc, member) => {
                        acc[member.healthStatus] = (acc[member.healthStatus] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);
                      
                      return Object.entries(healthCounts).map(([status, count]) => (
                        <div key={status} className="flex items-center space-x-1">
                          {getHealthStatusIcon(status)}
                          <span className={`text-xs font-medium ${
                            status === 'excellent' || status === 'good' 
                              ? 'text-green-600' 
                              : status === 'fair' 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                          }`}>
                            {count}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredFamilies.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">कोई परिवार नहीं मिला</h3>
          <p className="mt-1 text-sm text-gray-500">नया परिवार जोड़ें या अपनी खोज बदलें।</p>
        </div>
      )}

      {/* Family Detail Modal */}
      {selectedFamily && !showAddMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">{selectedFamily.headName} का परिवार - विस्तृत विवरण</h3>
                <button
                  onClick={() => setSelectedFamily(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Family Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">परिवार की जानकारी</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">मुखिया:</span>
                      <span className="ml-2 font-medium">{selectedFamily.headName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">फोन:</span>
                      <span className="ml-2 font-medium">{selectedFamily.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">पता:</span>
                      <span className="ml-2 font-medium">{selectedFamily.address}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">आपातकालीन संपर्क:</span>
                      <span className="ml-2 font-medium">{selectedFamily.emergencyContact}</span>
                    </div>
                    {selectedFamily.insuranceDetails && (
                      <div>
                        <span className="text-gray-500">बीमा विवरण:</span>
                        <span className="ml-2 font-medium">{selectedFamily.insuranceDetails}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Family Members */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">परिवार के सदस्य ({selectedFamily.totalMembers})</h4>
                    <button
                      onClick={() => setShowAddMember(true)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>सदस्य जोड़ें</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedFamily.members.map((member) => (
                      <div key={member.id} className="bg-white rounded-lg p-4 border">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            {getRelationIcon(member.relation, member.gender)}
                            <div>
                              <h5 className="font-medium text-gray-900">{member.name}</h5>
                              <p className="text-sm text-gray-500">
                                {getRelationText(member.relation)} • {member.age} वर्ष • {member.gender === 'male' ? 'पुरुष' : 'महिला'}
                              </p>
                              {member.bloodGroup && (
                                <p className="text-xs text-gray-400">रक्त समूह: {member.bloodGroup}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getHealthStatusIcon(member.healthStatus)}
                            <span className={`text-sm font-medium ${
                              member.healthStatus === 'excellent' || member.healthStatus === 'good' 
                                ? 'text-green-600' 
                                : member.healthStatus === 'fair' 
                                ? 'text-yellow-600' 
                                : 'text-red-600'
                            }`}>
                              {getHealthStatusText(member.healthStatus)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">अंतिम जांच:</span>
                            <span className="ml-1">{new Date(member.lastCheckup).toLocaleDateString('hi-IN')}</span>
                          </div>
                          {member.nextAppointment && (
                            <div>
                              <span className="text-gray-500">अगली अपॉइंटमेंट:</span>
                              <span className="ml-1">{new Date(member.nextAppointment).toLocaleDateString('hi-IN')}</span>
                            </div>
                          )}
                        </div>

                        {member.conditions.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">स्वास्थ्य स्थितियां:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {member.conditions.map((condition, index) => (
                                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {member.medications.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">दवाइयां:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {member.medications.map((medication, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {medication}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {member.allergies.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">एलर्जी:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {member.allergies.map((allergy, index) => (
                                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedFamily(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  बंद करें
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  रिपोर्ट प्रिंट करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && selectedFamily && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">
                  {selectedFamily.headName} के परिवार में सदस्य जोड़ें
                </h3>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleAddMember(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    सदस्य का नाम *
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="पूरा नाम दर्ज करें"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      रिश्ता *
                    </label>
                    <select
                      value={newMember.relation}
                      onChange={(e) => setNewMember(prev => ({ ...prev, relation: e.target.value as any }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="spouse">पति/पत्नी</option>
                      <option value="child">बच्चा</option>
                      <option value="parent">माता-पिता</option>
                      <option value="sibling">भाई-बहन</option>
                      <option value="other">अन्य</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      आयु *
                    </label>
                    <input
                      type="number"
                      value={newMember.age}
                      onChange={(e) => setNewMember(prev => ({ ...prev, age: e.target.value }))}
                      required
                      min="0"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      लिंग *
                    </label>
                    <select
                      value={newMember.gender}
                      onChange={(e) => setNewMember(prev => ({ ...prev, gender: e.target.value as any }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      रक्त समूह
                    </label>
                    <select
                      value={newMember.bloodGroup}
                      onChange={(e) => setNewMember(prev => ({ ...prev, bloodGroup: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">चुनें</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    स्वास्थ्य स्थितियां (वैकल्पिक)
                  </label>
                  <input
                    type="text"
                    value={newMember.conditions}
                    onChange={(e) => setNewMember(prev => ({ ...prev, conditions: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="कॉमा से अलग करें (जैसे: मधुमेह, उच्च रक्तचाप)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    दवाइयां (वैकल्पिक)
                  </label>
                  <input
                    type="text"
                    value={newMember.medications}
                    onChange={(e) => setNewMember(prev => ({ ...prev, medications: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="कॉमा से अलग करें (जैसे: मेटफॉर्मिन, एस्प्रिन)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    एलर्जी (वैकल्पिक)
                  </label>
                  <input
                    type="text"
                    value={newMember.allergies}
                    onChange={(e) => setNewMember(prev => ({ ...prev, allergies: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="कॉमा से अलग करें (जैसे: पेनिसिलिन, धूल)"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddMember(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>सदस्य जोड़ें</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyHealth;
