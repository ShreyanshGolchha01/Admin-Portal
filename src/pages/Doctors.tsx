import React, { useState } from 'react';
import { Plus, Stethoscope, Award, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import { mockDoctors, mockCamps, getCampById } from '../data/mockData';
import type { Doctor, TableColumn } from '../types/interfaces';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    experience: '',
    qualification: '',
    assignedCamps: [] as string[],
  });

  const handleAddDoctor = () => {
    const newDoctor: Doctor = {
      id: Date.now().toString(),
      name: formData.name,
      specialty: formData.specialty,
      phone: formData.phone,
      email: formData.email,
      experience: parseInt(formData.experience),
      qualification: formData.qualification,
      assignedCamps: formData.assignedCamps,
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1612349317150-e413f6a5b16d' : '1559839734-2b71ea197ec2'}?w=100&h=100&fit=crop&crop=face`,
    };

    setDoctors([...doctors, newDoctor]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditDoctor = () => {
    if (!editingDoctor) return;

    const updatedDoctors = doctors.map(doctor =>
      doctor.id === editingDoctor.id
        ? {
            ...doctor,
            name: formData.name,
            specialty: formData.specialty,
            phone: formData.phone,
            email: formData.email,
            experience: parseInt(formData.experience),
            qualification: formData.qualification,
            assignedCamps: formData.assignedCamps,
          }
        : doctor
    );

    setDoctors(updatedDoctors);
    setEditingDoctor(null);
    resetForm();
  };

  const handleDeleteDoctor = () => {
    if (!deletingDoctor) return;
    setDoctors(doctors.filter(doctor => doctor.id !== deletingDoctor.id));
    setDeletingDoctor(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      phone: '',
      email: '',
      experience: '',
      qualification: '',
      assignedCamps: [],
    });
  };

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      phone: doctor.phone,
      email: doctor.email,
      experience: doctor.experience.toString(),
      qualification: doctor.qualification,
      assignedCamps: doctor.assignedCamps,
    });
    setShowAddModal(true);
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Doctor',
      render: (value, row) => (
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={row.avatar || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face`}
            alt={value}
          />
          <div className="ml-4">
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.qualification}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'specialty',
      label: 'Specialty',
      render: (value) => (
        <div className="flex items-center">
          <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (value) => (
        <div className="flex items-center">
          <Award className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-900">{value} years</span>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center">
            <Phone className="h-3 w-3 text-gray-400 mr-2" />
            <span className="text-sm text-gray-900">{value}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-3 w-3 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'assignedCamps',
      label: 'Assigned Camps',
      sortable: false,
      render: (value: string[]) => (
        <div className="space-y-1">
          {value.slice(0, 2).map(campId => {
            const camp = getCampById(campId);
            return camp ? (
              <div key={campId} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {camp.location}
              </div>
            ) : null;
          })}
          {value.length > 2 && (
            <p className="text-xs text-gray-500">+{value.length - 2} more</p>
          )}
          {value.length === 0 && (
            <span className="text-xs text-gray-400">Not assigned</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1 text-gray-400 hover:text-primary-600"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setDeletingDoctor(row);
              setShowConfirmDialog(true);
            }}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Orthopedics',
    'Gynecology',
    'Pediatrics',
    'Dermatology',
    'Ophthalmology',
    'ENT',
    'Neurology',
    'Psychiatry',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600">Manage medical professionals</p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
            setEditingDoctor(null);
            resetForm();
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Experience</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(doctors.reduce((sum, doctor) => sum + doctor.experience, 0) / doctors.length)} years
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Specialties</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(doctors.map(doctor => doctor.specialty)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.filter(doctor => doctor.assignedCamps.length > 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <DataTable data={doctors} columns={columns} />

      {/* Add/Edit Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter doctor's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select specialty</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="input-field"
                      placeholder="Years of experience"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="input-field"
                    placeholder="e.g., MBBS, MD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Camps
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {mockCamps.filter(camp => camp.status === 'scheduled').map(camp => (
                      <label key={camp.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.assignedCamps.includes(camp.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                assignedCamps: [...formData.assignedCamps, camp.id]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                assignedCamps: formData.assignedCamps.filter(id => id !== camp.id)
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {camp.location} - {new Date(camp.date).toLocaleDateString('en-IN')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingDoctor(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={editingDoctor ? handleEditDoctor : handleAddDoctor}
                  className="btn-primary"
                >
                  {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleDeleteDoctor}
        title="Delete Doctor"
        message={`Are you sure you want to delete Dr. ${deletingDoctor?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Doctors;
