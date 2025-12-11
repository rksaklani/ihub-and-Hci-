'use client'

import { useState } from 'react'

interface Proposal {
  id: string
  name: string
  currentDate: string
  lastDateToApply: string
  pdf: string | null
}

export default function CallForProposalsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [formData, setFormData] = useState({
    name: '',
    currentDate: new Date().toISOString().split('T')[0], // Auto-pick current date
    lastDateToApply: '',
    pdf: null as File | null,
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Create preview URL
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
      // Convert PDF to base64 for storage
      let pdfBase64 = null
      if (formData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.pdf!)
        })
      }

      // Create new proposal
      const newProposal: Proposal = {
        id: Date.now().toString(),
        name: formData.name,
        currentDate: formData.currentDate,
        lastDateToApply: formData.lastDateToApply,
        pdf: pdfBase64,
      }

      // Add to list
      setProposals(prev => [...prev, newProposal])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/call-for-proposals', { method: 'POST', body: JSON.stringify(newProposal) })
      
      // Reset form and close modal
      setFormData({
        name: '',
        currentDate: new Date().toISOString().split('T')[0],
        lastDateToApply: '',
        pdf: null,
      })
      setPdfPreview(null)
      setIsModalOpen(false)
      
      // Show success message
      alert('Proposal added successfully!')
    } catch (error) {
      console.error('Error adding proposal:', error)
      alert('Failed to add proposal. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      setProposals(prev => prev.filter(proposal => proposal.id !== id))
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        name: '',
        currentDate: new Date().toISOString().split('T')[0],
        lastDateToApply: '',
        pdf: null,
      })
      setPdfPreview(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Call for Proposals</h1>
        <p className="mt-2 text-sm text-gray-600">Manage call for proposals</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Proposals {proposals.length > 0 && `(${proposals.length})`}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Proposal
          </button>
        </div>

        {proposals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-file-alt text-4xl mb-4"></i>
            <p>No proposals added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="glass-strong rounded-xl p-6 border-2 border-primary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4 mx-auto">
                  <i className="fas fa-file-pdf text-3xl text-primary"></i>
                </div>
                <h3 className="text-lg font-bold mb-3 text-primary text-center">
                  {proposal.name}
                </h3>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Date:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(proposal.currentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Date:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(proposal.lastDateToApply).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {proposal.pdf && (
                  <a
                    href={proposal.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-center mb-3"
                  >
                    <i className="fas fa-download mr-2"></i>
                    View PDF
                  </a>
                )}
                <button
                  onClick={() => handleDelete(proposal.id)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Proposal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Proposal</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Call of Proposal Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Call of Proposal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter proposal name"
                />
              </div>

              {/* Current Date Field (Auto-picked) */}
              <div>
                <label htmlFor="currentDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="currentDate"
                  name="currentDate"
                  required
                  value={formData.currentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Current date is automatically selected</p>
              </div>

              {/* Last Date to Apply Field */}
              <div>
                <label htmlFor="lastDateToApply" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Date to Apply <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="lastDateToApply"
                  name="lastDateToApply"
                  required
                  value={formData.lastDateToApply}
                  onChange={handleInputChange}
                  min={formData.currentDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* PDF Upload Field */}
              <div>
                <label htmlFor="pdf" className="block text-sm font-semibold text-gray-700 mb-2">
                  PDF Upload
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
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
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
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
