'use client'

import { useState } from 'react'
import {
  useGetTendersQuery,
  useCreateTenderMutation,
  useUpdateTenderMutation,
  useDeleteTenderMutation,
} from '@/lib/store/api'

interface Tender {
  _id?: string
  dated: string
  refNo: string
  details: string
  dateOfIssue: string
  startDate: string
  lastDate: string
  openingDate: string
  downloadLink: string | null
  corrigendumLink: string | null
  extensionNotice: string | null
  pdf: string | null
  corrigendumPdf: string | null
  extensionPdf: string | null
}

export default function TendersAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Tender | null>(null)

  const { data, isLoading, error, refetch } = useGetTendersQuery()
  const [createItem, { isLoading: isCreating }] = useCreateTenderMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateTenderMutation()
  const [deleteItem] = useDeleteTenderMutation()

  const tenders = data?.data || []
  const [formData, setFormData] = useState({
    dated: '',
    refNo: '',
    details: '',
    dateOfIssue: '',
    startDate: '',
    startTime: '',
    lastDate: '',
    lastTime: '',
    openingDate: '',
    openingTime: '',
    downloadLink: '',
    corrigendumLink: '',
    extensionNotice: '',
    pdf: null as File | null,
    corrigendumPdf: null as File | null,
    extensionPdf: null as File | null,
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [corrigendumPdfPreview, setCorrigendumPdfPreview] = useState<string | null>(null)
  const [extensionPdfPreview, setExtensionPdfPreview] = useState<string | null>(null)
  const isSubmitting = isCreating || isUpdating

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setFormData(prev => ({
        ...prev,
        pdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCorrigendumPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setFormData(prev => ({
        ...prev,
        corrigendumPdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setCorrigendumPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExtensionPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setFormData(prev => ({
        ...prev,
        extensionPdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setExtensionPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      }

      let corrigendumPdfBase64 = null
      if (formData.corrigendumPdf) {
        corrigendumPdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.corrigendumPdf!)
        })
      }

      let extensionPdfBase64 = null
      if (formData.extensionPdf) {
        extensionPdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.extensionPdf!)
        })
      }

      // Format dates with times
      const startDateFormatted = formData.startTime 
        ? `${formData.startDate} ${formData.startTime}`
        : formData.startDate
      
      const lastDateFormatted = formData.lastTime
        ? `${formData.lastDate}${formData.lastTime ? ' up to ' + formData.lastTime : ''}`
        : formData.lastDate
      
      const openingDateFormatted = formData.openingTime
        ? `${formData.openingDate}${formData.openingTime ? ' at ' + formData.openingTime : ''}`
        : formData.openingDate

      const tenderData = {
        dated: formData.dated,
        refNo: formData.refNo,
        details: formData.details,
        dateOfIssue: formData.dateOfIssue,
        startDate: startDateFormatted,
        lastDate: lastDateFormatted,
        openingDate: openingDateFormatted,
        downloadLink: formData.downloadLink || null,
        corrigendumLink: formData.corrigendumLink || null,
        extensionNotice: formData.extensionNotice || null,
        pdf: pdfBase64,
        corrigendumPdf: corrigendumPdfBase64,
        extensionPdf: extensionPdfBase64,
      }

      if (editingItem?._id) {
        await updateItem({ id: editingItem._id, ...tenderData }).unwrap()
      } else {
        await createItem(tenderData).unwrap()
      }

      refetch()
      resetForm()
      setIsModalOpen(false)
      alert(editingItem ? 'Tender updated successfully!' : 'Tender added successfully!')
    } catch (error: any) {
      console.error('Error saving tender:', error)
      alert(error?.data?.message || 'Failed to save tender. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      dated: '',
      refNo: '',
      details: '',
      dateOfIssue: '',
      startDate: '',
      startTime: '',
      lastDate: '',
      lastTime: '',
      openingDate: '',
      openingTime: '',
      downloadLink: '',
      corrigendumLink: '',
      extensionNotice: '',
      pdf: null,
      corrigendumPdf: null,
      extensionPdf: null,
    })
    setPdfPreview(null)
    setCorrigendumPdfPreview(null)
    setExtensionPdfPreview(null)
    setEditingItem(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleEdit = (tender: Tender) => {
    setEditingItem(tender)
    // Parse dates back from formatted strings if needed
    setFormData({
      dated: tender.dated || '',
      refNo: tender.refNo || '',
      details: tender.details || '',
      dateOfIssue: tender.dateOfIssue || '',
      startDate: tender.startDate?.split(' ')[0] || '',
      startTime: tender.startDate?.split(' ')[1] || '',
      lastDate: tender.lastDate?.split(' up to ')[0] || '',
      lastTime: tender.lastDate?.includes(' up to ') ? tender.lastDate.split(' up to ')[1] : '',
      openingDate: tender.openingDate?.split(' at ')[0] || '',
      openingTime: tender.openingDate?.includes(' at ') ? tender.openingDate.split(' at ')[1] : '',
      downloadLink: tender.downloadLink || '',
      corrigendumLink: tender.corrigendumLink || '',
      extensionNotice: tender.extensionNotice || '',
      pdf: null,
      corrigendumPdf: null,
      extensionPdf: null,
    })
    setPdfPreview(tender.pdf)
    setCorrigendumPdfPreview(tender.corrigendumPdf)
    setExtensionPdfPreview(tender.extensionPdf)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tender?')) {
      try {
        await deleteItem(id).unwrap()
        refetch()
        alert('Tender deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  return (
    <div>
      <div 
        className="p-6 border-2 shadow-xl glass-strong rounded-2xl border-primary/10"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
              <i className="text-xl fas fa-file-contract text-primary"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tender List</h2>
              <p className="mt-1 text-sm text-gray-600">Manage tenders and EOI notices</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Tender
          </button>
        </div>

        {error ? (
          <div className="py-16 text-center text-red-500">
            <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
            <p>Error loading data. Please try again.</p>
          </div>
        ) : isLoading ? (
          <div className="py-16 text-center text-gray-500">
            <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
            <p>Loading...</p>
          </div>
        ) : tenders.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <i className="text-4xl fas fa-file-contract text-primary"></i>
            </div>
            <p className="text-lg font-medium">No tenders added yet</p>
            <p className="mt-1 text-sm">Click "Add Tender" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenders.map((tender) => (
              <div key={tender._id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-contract text-primary"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-xs text-gray-600 font-medium">Dated: {tender.dated}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(tender)}
                          className="text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0"
                          title="Edit tender"
                        >
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button
                          onClick={() => tender._id && handleDelete(tender._id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                          title="Delete tender"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-primary truncate">{tender.refNo}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{tender.details}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="fas fa-calendar-alt text-primary text-xs"></i>
                    <span className="truncate">Issue: {tender.dateOfIssue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="fas fa-clock text-primary text-xs"></i>
                    <span className="truncate">Last: {tender.lastDate?.split(' up to')[0] || tender.lastDate}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tender.pdf && (
                    <a
                      href={tender.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm"
                    >
                      <i className="fas fa-download"></i>
                      Download
                    </a>
                  )}
                  {tender.downloadLink && !tender.pdf && (
                    <a
                      href={tender.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm"
                    >
                      <i className="fas fa-download"></i>
                      Download
                    </a>
                  )}
                  {tender.corrigendumPdf && (
                    <a
                      href={tender.corrigendumPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-sm"
                    >
                      <i className="fas fa-file-alt"></i>
                      Corrigendum
                    </a>
                  )}
                  {tender.extensionPdf && (
                    <a
                      href={tender.extensionPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-sm"
                    >
                      <i className="fas fa-file-alt"></i>
                      Extension
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Tender Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Tender' : 'Add Tender'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Dated Field */}
              <div>
                <label htmlFor="dated" className="block mb-2 text-sm font-semibold text-gray-700">
                  Dated <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dated"
                  name="dated"
                  required
                  value={formData.dated}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the date of the tender</p>
              </div>

              {/* Reference Number Field */}
              <div>
                <label htmlFor="refNo" className="block mb-2 text-sm font-semibold text-gray-700">
                  Reference Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="refNo"
                  name="refNo"
                  required
                  value={formData.refNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., iHub//EOI/2025-2026/05"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the tender reference number</p>
              </div>

              {/* Details Field */}
              <div>
                <label htmlFor="details" className="block mb-2 text-sm font-semibold text-gray-700">
                  Tender Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  rows={4}
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Expression of Interest (EOI) for skill development training partnership."
                />
                <p className="mt-1 text-xs text-gray-500">Enter the details/description of the tender</p>
              </div>

              {/* Date of Issue/Publishing */}
              <div>
                <label htmlFor="dateOfIssue" className="block mb-2 text-sm font-semibold text-gray-700">
                  Date of Issue/Publishing <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfIssue"
                  name="dateOfIssue"
                  required
                  value={formData.dateOfIssue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the date of issue/publishing</p>
              </div>

              {/* Start Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block mb-2 text-sm font-semibold text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block mb-2 text-sm font-semibold text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 -mt-2">Start date and time of submission of bids</p>

              {/* Last Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastDate" className="block mb-2 text-sm font-semibold text-gray-700">
                    Last Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="lastDate"
                    name="lastDate"
                    required
                    value={formData.lastDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastTime" className="block mb-2 text-sm font-semibold text-gray-700">
                    Last Time
                  </label>
                  <input
                    type="time"
                    id="lastTime"
                    name="lastTime"
                    value={formData.lastTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 -mt-2">Last date and time for submissions of bids</p>

              {/* Opening Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="openingDate" className="block mb-2 text-sm font-semibold text-gray-700">
                    Opening Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="openingDate"
                    name="openingDate"
                    required
                    value={formData.openingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="openingTime" className="block mb-2 text-sm font-semibold text-gray-700">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    id="openingTime"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 -mt-2">Date and time of opening of EOI/Technical bid</p>

              {/* PDF Upload Field */}
              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  Tender PDF Upload
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {pdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formData.pdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload the tender PDF file (optional)</p>
              </div>

              {/* Download Link Field */}
              <div>
                <label htmlFor="downloadLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Download Link
                </label>
                <input
                  type="url"
                  id="downloadLink"
                  name="downloadLink"
                  value={formData.downloadLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/tender-document.pdf"
                />
                <p className="mt-1 text-xs text-gray-500">Enter URL to download tender document (optional, if not uploading PDF)</p>
              </div>

              {/* Corrigendum PDF Upload */}
              <div>
                <label htmlFor="corrigendumPdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  Corrigendum PDF Upload
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="corrigendumPdf"
                    name="corrigendumPdf"
                    accept=".pdf,application/pdf"
                    onChange={handleCorrigendumPdfChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {corrigendumPdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formData.corrigendumPdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.corrigendumPdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload corrigendum PDF (optional)</p>
              </div>

              {/* Corrigendum Link Field */}
              <div>
                <label htmlFor="corrigendumLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Corrigendum Link
                </label>
                <input
                  type="url"
                  id="corrigendumLink"
                  name="corrigendumLink"
                  value={formData.corrigendumLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/corrigendum.pdf"
                />
                <p className="mt-1 text-xs text-gray-500">Enter URL to corrigendum document (optional)</p>
              </div>

              {/* Extension Notice PDF Upload */}
              <div>
                <label htmlFor="extensionPdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  Extension Notice PDF Upload
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="extensionPdf"
                    name="extensionPdf"
                    accept=".pdf,application/pdf"
                    onChange={handleExtensionPdfChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {extensionPdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formData.extensionPdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.extensionPdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload extension notice PDF (optional)</p>
              </div>

              {/* Extension Notice Link Field */}
              <div>
                <label htmlFor="extensionNotice" className="block mb-2 text-sm font-semibold text-gray-700">
                  Extension Notice Link
                </label>
                <input
                  type="url"
                  id="extensionNotice"
                  name="extensionNotice"
                  value={formData.extensionNotice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/extension-notice.pdf"
                />
                <p className="mt-1 text-xs text-gray-500">Enter URL to extension notice document (optional)</p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="mr-2 fas fa-spinner fa-spin"></i>
                      {editingItem ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-check"></i>
                      {editingItem ? 'Update' : 'Submit'}
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
