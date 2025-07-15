import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Plus, 
  Heart,
  Calendar,
  Phone,
  MapPin,
  UserPlus,
  ArrowLeft,
  Edit,
  Eye
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  address: string;
  lastVisit: string;
  healthStatus: 'good' | 'fair' | 'poor';
  familyMembers: number;
}

const PatientsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Mock patients data
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'राम कुमार',
      age: 45,
      gender: 'male',
      phone: '9876543210',
      address: 'दुर्ग, छत्तीसगढ़',
      lastVisit: '2025-07-10',
      healthStatus: 'fair',
      familyMembers: 4
    },
    {
      id: '2',
      name: 'सुनीता देवी',
      age: 38,
      gender: 'female',
      phone: '8765432109',
      address: 'बिलासपुर, छत्तीसगढ़',
      lastVisit: '2025-07-12',
      healthStatus: 'good',
      familyMembers: 3
    },
    {
      id: '3',
      name: 'मोहन लाल',
      age: 62,
      gender: 'male',
      phone: '7654321098',
      address: 'रायपुर, छत्तीसगढ़',
      lastVisit: '2025-07-08',
      healthStatus: 'poor',
      familyMembers: 2
    },
    {
      id: '4',
      name: 'प्रिया गुप्ता',
      age: 29,
      gender: 'female',
      phone: '6543210987',
      address: 'कोरबा, छत्तीसगढ़',
      lastVisit: '2025-07-14',
      healthStatus: 'good',
      familyMembers: 5
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusText = (status: string) => {
    switch (status) {
      case 'good':
        return 'अच्छी';
      case 'fair':
        return 'सामान्य';
      case 'poor':
        return 'खराब';
      default:
        return 'अज्ञात';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>वापस डैशबोर्ड पर जाएं</span>
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">मरीज़ प्रबंधन</h1>
              <p className="text-blue-100 mt-1">
                सभी मरीजों की जानकारी और स्वास्थ्य रिकॉर्ड देखें
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{patients.length}</p>
            <p className="text-blue-100 text-sm">कुल मरीज़</p>
          </div>
        </div>
      </div>

      {/* Search and Add Patient */}
      <div className="card border border-gray-400">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="मरीज़ खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Add Patient Button */}
          <button
            onClick={() => setShowAddPatient(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>नया मरीज़ जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card border border-gray-400 text-center">
          <div className="p-6">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">कुल मरीज़</div>
          </div>
        </div>
        
        <div className="card border border-gray-400 text-center">
          <div className="p-6">
            <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.healthStatus === 'good').length}
            </div>
            <div className="text-sm text-gray-600">स्वस्थ मरीज़</div>
          </div>
        </div>
        
        <div className="card border border-gray-400 text-center">
          <div className="p-6">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => {
                const lastVisit = new Date(p.lastVisit);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}
            </div>
            <div className="text-sm text-gray-600">इस सप्ताह मिले</div>
          </div>
        </div>
        
        <div className="card border border-gray-400 text-center">
          <div className="p-6">
            <UserPlus className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {patients.reduce((sum, p) => sum + p.familyMembers, 0)}
            </div>
            <div className="text-sm text-gray-600">कुल पारिवारिक सदस्य</div>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="card border border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            मरीजों की सूची ({filteredPatients.length} परिणाम)
          </h3>
        </div>

        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{patient.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{patient.age} वर्ष • {patient.gender === 'male' ? 'पुरुष' : 'महिला'}</span>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{patient.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">अंतिम जांच:</span>
                      <span className="font-medium">
                        {new Date(patient.lastVisit).toLocaleDateString('hi-IN')}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">स्वास्थ्य स्थिति:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthStatusColor(patient.healthStatus)}`}>
                        {getHealthStatusText(patient.healthStatus)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{patient.familyMembers} पारिवारिक सदस्य</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/doctor/health-records?patient=${patient.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="स्वास्थ्य रिकॉर्ड देखें"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/doctor/family-health?patient=${patient.id}`)}
                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="पारिवारिक स्वास्थ्य"
                  >
                    <UserPlus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => alert('संपादन सुविधा जल्द आ रही है')}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="संपादित करें"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">कोई मरीज़ नहीं मिला</h3>
              <p className="text-gray-600">
                आपके खोज मापदंड के अनुसार कोई मरीज़ नहीं मिला।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal Placeholder */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">नया मरीज़ जोड़ें</h3>
            <p className="text-gray-600 mb-4">यह सुविधा जल्द उपलब्ध होगी।</p>
            <button
              onClick={() => setShowAddPatient(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              बंद करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsManagement;
