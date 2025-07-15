import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import { mockSchemes, getSchemesByStatus } from '../data/mockData';
import type { Scheme, TableColumn } from '../types/interfaces';

const Schemes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [schemes, setSchemes] = useState(mockSchemes);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionScheme, setActionScheme] = useState<{ scheme: Scheme; action: 'approve' | 'reject' } | null>(null);
  const [viewingScheme, setViewingScheme] = useState<Scheme | null>(null);

  const handleSchemeAction = (scheme: Scheme, action: 'approve' | 'reject') => {
    setActionScheme({ scheme, action });
    setShowConfirmDialog(true);
  };

  const confirmSchemeAction = () => {
    if (!actionScheme) return;

    const updatedSchemes = schemes.map(scheme =>
      scheme.id === actionScheme.scheme.id
        ? {
            ...scheme,
            status: actionScheme.action === 'approve' ? 'approved' as const : 'rejected' as const,
            reviewedBy: 'अमित शर्मा',
            reviewDate: new Date().toISOString().split('T')[0],
            remarks: actionScheme.action === 'approve' 
              ? 'सभी दस्तावेज़ सत्यापित और अनुमोदित'
              : 'दस्तावेज़ में कमी या अपूर्ण जानकारी'
          }
        : scheme
    );

    setSchemes(updatedSchemes);
    setActionScheme(null);
  };

  const getTabData = () => {
    return schemes.filter(scheme => scheme.status === activeTab);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const columns: TableColumn[] = [
    {
      key: 'applicantName',
      label: 'Applicant',
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.employeeId}</p>
        </div>
      ),
    },
    {
      key: 'schemeName',
      label: 'Scheme',
      render: (value) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-medium text-gray-900">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'appliedDate',
      label: 'Applied Date',
      render: (value) => new Date(value).toLocaleDateString('en-IN'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'documents',
      label: 'Documents',
      sortable: false,
      render: (value: string[]) => (
        <div className="space-y-1">
          {value.slice(0, 2).map((doc, index) => (
            <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {doc}
            </div>
          ))}
          {value.length > 2 && (
            <p className="text-xs text-gray-500">+{value.length - 2} more</p>
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
            onClick={() => setViewingScheme(row)}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleSchemeAction(row, 'approve')}
                className="p-1 text-gray-400 hover:text-green-600"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleSchemeAction(row, 'reject')}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </>
          )}
          {(row.status === 'approved' || row.status === 'rejected') && (
            <button
              onClick={() => console.log('Download certificate for', row.id)}
              className="p-1 text-gray-400 hover:text-primary-600"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: getSchemesByStatus('pending').length },
    { id: 'approved', label: 'Approved', count: getSchemesByStatus('approved').length },
    { id: 'rejected', label: 'Rejected', count: getSchemesByStatus('rejected').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schemes Management</h1>
          <p className="text-gray-600">Review and manage scheme applications</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {getSchemesByStatus('pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {getSchemesByStatus('approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {getSchemesByStatus('rejected').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  getSchemesByStatus('approved').reduce((sum, scheme) => sum + scheme.amount, 0)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          <DataTable data={getTabData()} columns={columns} searchable={true} />
        </div>
      </div>

      {/* Scheme Details Modal */}
      {viewingScheme && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Scheme Details</h3>
                <button
                  onClick={() => setViewingScheme(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Applicant</label>
                  <p className="text-sm text-gray-900">{viewingScheme.applicantName}</p>
                  <p className="text-xs text-gray-500">{viewingScheme.employeeId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Scheme Name</label>
                  <p className="text-sm text-gray-900">{viewingScheme.schemeName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="text-sm text-gray-900">{formatCurrency(viewingScheme.amount)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Applied Date</label>
                    <p className="text-sm text-gray-900">
                      {new Date(viewingScheme.appliedDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  {getStatusBadge(viewingScheme.status)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Documents</label>
                  <div className="space-y-2">
                    {viewingScheme.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{doc}</span>
                        <button className="text-xs text-primary-600 hover:text-primary-700">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {viewingScheme.reviewedBy && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reviewed By</label>
                    <p className="text-sm text-gray-900">{viewingScheme.reviewedBy}</p>
                    <p className="text-xs text-gray-500">
                      {viewingScheme.reviewDate && new Date(viewingScheme.reviewDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                )}

                {viewingScheme.remarks && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <p className="text-sm text-gray-900">{viewingScheme.remarks}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                {viewingScheme.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleSchemeAction(viewingScheme, 'reject');
                        setViewingScheme(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        handleSchemeAction(viewingScheme, 'approve');
                        setViewingScheme(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </>
                )}
                <button
                  onClick={() => setViewingScheme(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Action Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmSchemeAction}
        title={`${actionScheme?.action === 'approve' ? 'Approve' : 'Reject'} Scheme`}
        message={`Are you sure you want to ${actionScheme?.action} the scheme application for ${actionScheme?.scheme.applicantName}?`}
        type={actionScheme?.action === 'approve' ? 'success' : 'danger'}
        confirmText={actionScheme?.action === 'approve' ? 'Approve' : 'Reject'}
        cancelText="Cancel"
      />
    </div>
  );
};

export default Schemes;
