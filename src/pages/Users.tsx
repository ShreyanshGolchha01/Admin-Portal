import React, { useState } from 'react';
import { Users as UsersIcon, Building, Calendar, ChevronDown, ChevronRight, Download } from 'lucide-react';
import { mockUsers, mockHealthRecords, getUserHealthRecords } from '../data/mockData';
import type { User, TableColumn } from '../types/interfaces';

const Users: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (userId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(userId)) {
      newExpandedRows.delete(userId);
    } else {
      newExpandedRows.add(userId);
    }
    setExpandedRows(newExpandedRows);
  };

  const generatePDF = (user: User) => {
    // Mock PDF generation
    console.log(`Generating PDF for ${user.name}`);
    alert(`PDF report for ${user.name} will be downloaded (Demo)`);
  };

  const HealthTimeline: React.FC<{ userId: string }> = ({ userId }) => {
    const healthRecords = getUserHealthRecords(userId);
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Health Records Timeline</h4>
        {healthRecords.length > 0 ? (
          <div className="space-y-3">
            {healthRecords.map((record) => (
              <div key={record.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-IN')}
                    </p>
                    <div className="flex space-x-4 text-xs text-gray-600">
                      <span>BP: {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}</span>
                      <span>Sugar: {record.sugarLevel} mg/dL</span>
                      <span>BMI: {record.bmi}</span>
                    </div>
                  </div>
                  {record.notes && (
                    <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No health records available</p>
        )}
      </div>
    );
  };

  const columns: TableColumn[] = [
    {
      key: 'expand',
      label: '',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => toggleRowExpansion(row.id)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          {expandedRows.has(row.id) ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ),
    },
    {
      key: 'name',
      label: 'Employee',
      render: (value, row) => (
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={row.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`}
            alt={value}
          />
          <div className="ml-4">
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      render: (value) => (
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'joiningDate',
      label: 'Joining Date',
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-900">
            {value ? new Date(value).toLocaleDateString('en-IN') : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (value, row) => (
        <div className="space-y-1">
          <p className="text-sm text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'healthStatus',
      label: 'Health Status',
      sortable: false,
      render: (_, row) => {
        const healthRecords = getUserHealthRecords(row.id);
        const latestRecord = healthRecords[0];
        
        if (!latestRecord) {
          return <span className="text-xs text-gray-400">No records</span>;
        }

        const getBPStatus = (systolic: number, diastolic: number) => {
          if (systolic < 120 && diastolic < 80) return { status: 'Normal', color: 'green' };
          if (systolic < 140 || diastolic < 90) return { status: 'High', color: 'yellow' };
          return { status: 'Very High', color: 'red' };
        };

        const getSugarStatus = (sugar: number) => {
          if (sugar < 100) return { status: 'Normal', color: 'green' };
          if (sugar < 126) return { status: 'Pre-diabetic', color: 'yellow' };
          return { status: 'Diabetic', color: 'red' };
        };

        const bpStatus = getBPStatus(latestRecord.bloodPressure.systolic, latestRecord.bloodPressure.diastolic);
        const sugarStatus = getSugarStatus(latestRecord.sugarLevel);

        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full bg-${bpStatus.color}-500`}></div>
              <span className="text-xs text-gray-600">BP: {bpStatus.status}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full bg-${sugarStatus.color}-500`}></div>
              <span className="text-xs text-gray-600">Sugar: {sugarStatus.status}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => generatePDF(row)}
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
        >
          <Download className="h-3 w-3" />
          <span>PDF</span>
        </button>
      ),
    },
  ];

  // Enhanced data table that supports expandable rows
  const EnhancedDataTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    const filteredData = mockUsers.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md input-field"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {column.render ? column.render((row as any)[column.key], row) : (row as any)[column.key]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows.has(row.id) && (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-0">
                        <HealthTimeline userId={row.id} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Simple Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Health Records</h1>
          <p className="text-gray-600">View employee health records and family data</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export All Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(mockUsers.map(user => user.department)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Health Records</p>
              <p className="text-2xl font-bold text-gray-900">{mockHealthRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockUsers.filter(user => user.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table with Expandable Rows */}
      <EnhancedDataTable />

      {/* Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Status Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Normal BP</span>
              <span className="text-sm font-medium text-green-600">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High BP</span>
              <span className="text-sm font-medium text-yellow-600">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Very High BP</span>
              <span className="text-sm font-medium text-red-600">5%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sugar Level Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Normal</span>
              <span className="text-sm font-medium text-green-600">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pre-diabetic</span>
              <span className="text-sm font-medium text-yellow-600">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Diabetic</span>
              <span className="text-sm font-medium text-red-600">5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
