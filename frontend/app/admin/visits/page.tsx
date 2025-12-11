'use client'

import { useState } from 'react'
import {
  useGetVisitsQuery,
  useCreateVisitMutation,
  useUpdateVisitMutation,
  useDeleteVisitMutation,
} from '@/lib/store/api'

interface Visit {
  _id?: string
  visitorName: string
  organization?: string
  email: string
  phone?: string
  purpose: string
  preferredDate: string
  preferredTime?: string
  message?: string
  status?: 'pending' | 'approved' | 'rejected' | 'completed'
}

export default function VisitsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Visit | null>(null)
  const [formData, setFormData] = useState<Visit>({
    visitorName: '',
    organization: '',
    email: '',
    phone: '',
    purpose: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    status: 'pending',
  })

  const { data, isLoading, error, refetch } = useGetVisitsQuery()
  const [createItem, { isLoading: isCreating }] = useCreateVisitMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateVisitMutation()
  const [deleteItem] = useDeleteVisitMutation()

  const visits = data?.data || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingItem?._id) {
        await updateItem({ id: editingItem._id, ...formData }).unwrap()
      } else {
        await createItem(formData).unwrap()
      }
      setIsModalOpen(false)
      resetForm()
      refetch()
      alert(editingItem ? 'Updated successfully!' : 'Created successfully!')
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to save')
    }
  }

  const handleEdit = (item: Visit) => {
    setEditingItem(item)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this visit request?')) {
      try {
        await deleteItem(id).unwrap()
        refetch()
        alert('Deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      visitorName: '',
      organization: '',
      email: '',
      phone: '',
      purpose: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      status: 'pending',
    })
    setEditingItem(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Visit to iHub Office</h1>
        <p className="mt-2 text-sm text-gray-600">Manage office visit requests</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Visit Requests</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Visit
          </button>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : visits.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-calendar-check text-4xl mb-4"></i>
            <p>No visit requests added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Visitor Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Organization</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Preferred Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit: Visit) => (
                  <tr key={visit._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{visit.visitorName}</td>
                    <td className="border border-gray-300 px-4 py-2">{visit.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{visit.organization || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">{visit.purpose}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {visit.preferredDate ? new Date(visit.preferredDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        visit.status === 'approved' ? 'bg-green-100 text-green-800' :
                        visit.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        visit.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {visit.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(visit)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => visit._id && handleDelete(visit._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Visit Request' : 'Add Visit Request'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isCreating || isUpdating}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="visitorName" className="block mb-2 text-sm font-semibold text-gray-700">
                  Visitor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="visitorName"
                  name="visitorName"
                  required
                  value={formData.visitorName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter visitor name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block mb-2 text-sm font-semibold text-gray-700">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Organization name"
                />
              </div>

              <div>
                <label htmlFor="purpose" className="block mb-2 text-sm font-semibold text-gray-700">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Purpose of visit"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block mb-2 text-sm font-semibold text-gray-700">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block mb-2 text-sm font-semibold text-gray-700">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Additional message or notes"
                />
              </div>

              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-semibold text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Visit['status'] }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {editingItem ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      {editingItem ? 'Update' : 'Create'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
