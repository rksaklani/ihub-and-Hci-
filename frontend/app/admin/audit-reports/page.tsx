'use client'

import { useState } from 'react'

interface AuditReport {
  id: string
  session: string
  pdf: string
  fileName: string
  fileSize: number
}

export default function AuditReportsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reports, setReports] = useState<AuditReport[]>([])
  const [formData, setFormData] = useState({
    session: '',
    pdf: null as File | null,
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate session options starting from 2023
  const currentYear = new Date().getFullYear()
  const sessionOptions = []
  for (let year = 2023; year <= currentYear; year++) {
    const nextYear = year + 1
    sessionOptions.push({
      value: `${year}-${nextYear}`,
      label: `${year}-${nextYear}`,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        alert('Please upload a PDF file only')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.pdf) {
        alert('Please upload a PDF file.')
        return
      }

      if (!formData.session) {
        alert('Please select a session.')
        return
      }

      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      }

      const newReport: AuditReport = {
        id: Date.now().toString(),
        session: formData.session,
        pdf: pdfBase64!,
        fileName: formData.pdf.name,
        fileSize: formData.pdf.size,
      }

      setReports(prev => [...prev, newReport])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/audit-reports', { method: 'POST', body: JSON.stringify(newReport) })
      
      // Reset form and close modal
      setFormData({
        session: '',
        pdf: null,
      })
      setPdfPreview(null)
      setIsModalOpen(false)
      
      // Show success message
      alert('Audit report added successfully!')
    } catch (error) {
      console.error('Error adding report:', error)
      alert('Failed to add report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        session: '',
        pdf: null,
      })
      setPdfPreview(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this audit report?')) {
      setReports(prev => prev.filter(report => report.id !== id))
      // TODO: Add API call to delete
      // await fetch(`/api/audit-reports/${id}`, { method: 'DELETE' })
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
              <i className="text-xl fas fa-chart-line text-primary"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <p className="mt-1 text-sm text-gray-600">Manage audit reports and financial statements</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Report
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <i className="text-4xl fas fa-chart-line text-primary"></i>
            </div>
            <p className="text-lg font-medium">No audit reports added yet</p>
            <p className="mt-1 text-sm">Click "Add Report" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-file-pdf text-primary text-xl"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-lg font-bold text-primary">
                          Financial Year {report.session}
                        </h3>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                          title="Delete report"
                        >
                          <i className="fas fa-trash text-sm"></i>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">Audited Final Accounts</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.fileName} • {(report.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <a
                    href={report.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-3 rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm whitespace-nowrap"
                  >
                    <i className="fas fa-download"></i>
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Report</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Session Field */}
              <div>
                <label htmlFor="session" className="block mb-2 text-sm font-semibold text-gray-700">
                  Session <span className="text-red-500">*</span>
                </label>
                <select
                  id="session"
                  name="session"
                  required
                  value={formData.session}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Session</option>
                  {sessionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Select the financial year session (e.g., 2023-2024)</p>
              </div>

              {/* PDF Upload Field */}
              <div>
                <label htmlFor="pdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="pdf"
                  name="pdf"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfChange}
                  required
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
                <p className="mt-1 text-xs text-gray-500">Upload the audit report PDF file (PDF only)</p>
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-check"></i>
                      Submit
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
