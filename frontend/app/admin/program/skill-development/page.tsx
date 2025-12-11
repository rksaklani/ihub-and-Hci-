'use client'

import { useState } from 'react'

// Interfaces for different item types
interface PMKVYItem {
  id: string
  description1: string
  description2: string
  readMoreLink: string
  pdf: string | null
}

interface HPKVNItem {
  id: string
  description: string
  readMoreLink: string
  pdf: string | null
}

interface JobRole {
  id: string
  title: string
  applicationLink: string
  pdf: string | null
}

interface WebinarWorkshop {
  id: string
  title: string
  image: string
  link: string
}

interface PastActivity {
  id: string
  image: string
  title?: string
}

export default function SkillDevelopmentAdmin() {
  const [activeTab, setActiveTab] = useState('pmkvy')
  
  // State for modals
  const [isPMKVYModalOpen, setIsPMKVYModalOpen] = useState(false)
  const [isHPKVNModalOpen, setIsHPKVNModalOpen] = useState(false)
  const [isJobRoleModalOpen, setIsJobRoleModalOpen] = useState(false)
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  // State for data
  const [pmkvyItems, setPmkvyItems] = useState<PMKVYItem[]>([])
  const [hpkvnItems, setHpkvnItems] = useState<HPKVNItem[]>([])
  const [jobRoles, setJobRoles] = useState<JobRole[]>([])
  const [webinars, setWebinars] = useState<WebinarWorkshop[]>([])
  const [pastActivities, setPastActivities] = useState<PastActivity[]>([])

  // Form states
  const [pmkvyFormData, setPmkvyFormData] = useState({
    description1: '',
    description2: '',
    readMoreLink: '',
    pdf: null as File | null,
  })
  const [pmkvyPdfPreview, setPmkvyPdfPreview] = useState<string | null>(null)

  const [hpkvnFormData, setHpkvnFormData] = useState({
    description: '',
    readMoreLink: '',
    pdf: null as File | null,
  })
  const [hpkvnPdfPreview, setHpkvnPdfPreview] = useState<string | null>(null)

  const [jobRoleFormData, setJobRoleFormData] = useState({
    title: '',
    applicationLink: '',
    pdf: null as File | null,
  })
  const [jobRolePdfPreview, setJobRolePdfPreview] = useState<string | null>(null)

  const [webinarFormData, setWebinarFormData] = useState({
    title: '',
    image: null as File | null,
    link: '',
  })
  const [webinarImagePreview, setWebinarImagePreview] = useState<string | null>(null)

  const [activityFormData, setActivityFormData] = useState({
    image: null as File | null,
    title: '',
  })
  const [activityImagePreview, setActivityImagePreview] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const tabs = [
    { id: 'pmkvy', label: 'Training Partner for PMKVY' },
    { id: 'hpkvn', label: 'Training Partner for HPKVN' },
    { id: 'job-roles', label: 'Job Roles' },
    { id: 'webinars-workshops', label: 'Webinars & Workshops' },
    { id: 'past-activities', label: 'Past Activities' },
  ]

  // PMKVY Handlers
  const handlePmkvyPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setPmkvyFormData(prev => ({ ...prev, pdf: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPmkvyPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePmkvySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let pdfBase64 = null
      if (pmkvyFormData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(pmkvyFormData.pdf!)
        })
      }
      const newItem: PMKVYItem = {
        id: Date.now().toString(),
        description1: pmkvyFormData.description1,
        description2: pmkvyFormData.description2,
        readMoreLink: pmkvyFormData.readMoreLink,
        pdf: pdfBase64,
      }
      setPmkvyItems(prev => [...prev, newItem])
      setPmkvyFormData({ description1: '', description2: '', readMoreLink: '', pdf: null })
      setPmkvyPdfPreview(null)
      setIsPMKVYModalOpen(false)
      alert('PMKVY item added successfully!')
    } catch (error) {
      alert('Failed to add item. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // HPKVN Handlers
  const handleHpkvnPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setHpkvnFormData(prev => ({ ...prev, pdf: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setHpkvnPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHpkvnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let pdfBase64 = null
      if (hpkvnFormData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(hpkvnFormData.pdf!)
        })
      }
      const newItem: HPKVNItem = {
        id: Date.now().toString(),
        description: hpkvnFormData.description,
        readMoreLink: hpkvnFormData.readMoreLink,
        pdf: pdfBase64,
      }
      setHpkvnItems(prev => [...prev, newItem])
      setHpkvnFormData({ description: '', readMoreLink: '', pdf: null })
      setHpkvnPdfPreview(null)
      setIsHPKVNModalOpen(false)
      alert('HPKVN item added successfully!')
    } catch (error) {
      alert('Failed to add item. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Job Role Handlers
  const handleJobRolePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setJobRoleFormData(prev => ({ ...prev, pdf: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setJobRolePdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleJobRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let pdfBase64 = null
      if (jobRoleFormData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(jobRoleFormData.pdf!)
        })
      }
      const newItem: JobRole = {
        id: Date.now().toString(),
        title: jobRoleFormData.title,
        applicationLink: jobRoleFormData.applicationLink,
        pdf: pdfBase64,
      }
      setJobRoles(prev => [...prev, newItem])
      setJobRoleFormData({ title: '', applicationLink: '', pdf: null })
      setJobRolePdfPreview(null)
      setIsJobRoleModalOpen(false)
      alert('Job role added successfully!')
    } catch (error) {
      alert('Failed to add job role. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Webinar Handlers
  const handleWebinarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setWebinarFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setWebinarImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWebinarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let imageBase64 = null
      if (webinarFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(webinarFormData.image!)
        })
      }

      const newItem: WebinarWorkshop = {
        id: Date.now().toString(),
        title: webinarFormData.title,
        image: imageBase64 || '',
        link: webinarFormData.link,
      }
      setWebinars(prev => [...prev, newItem])
      setWebinarFormData({ title: '', image: null, link: '' })
      setWebinarImagePreview(null)
      setIsWebinarModalOpen(false)
      alert('Webinar/Workshop added successfully!')
    } catch (error) {
      alert('Failed to add webinar/workshop. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Past Activity Handlers
  const handleActivityImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setActivityFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setActivityImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let imageBase64 = null
      if (activityFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(activityFormData.image!)
        })
      }

      const newItem: PastActivity = {
        id: Date.now().toString(),
        image: imageBase64 || '',
        title: activityFormData.title || undefined,
      }
      setPastActivities(prev => [...prev, newItem])
      setActivityFormData({ image: null, title: '' })
      setActivityImagePreview(null)
      setIsActivityModalOpen(false)
      alert('Past activity added successfully!')
    } catch (error) {
      alert('Failed to add activity. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Sub-Tabs Navigation - Smaller and More Subtle */}
      <div className="mb-6">
        <div className="bg-gray-50/50 rounded-xl p-1.5 border border-gray-200/50">
          <div className="flex flex-wrap gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-primary border border-gray-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div 
        className="p-6 border-2 glass-strong rounded-2xl border-primary/10 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* PMKVY Tab */}
        {activeTab === 'pmkvy' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-building text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Training Partner for PMKVY</h2>
              </div>
              <button
                onClick={() => setIsPMKVYModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Item
              </button>
            </div>
            {pmkvyItems.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <i className="mb-4 text-4xl fas fa-building"></i>
                <p>No items added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pmkvyItems.map((item) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                    <p className="mb-2 text-gray-700">{item.description1}</p>
                    <p className="mb-2 text-gray-700">{item.description2}</p>
                    {item.readMoreLink && (
                      <a href={item.readMoreLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Read More
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HPKVN Tab */}
        {activeTab === 'hpkvn' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Training Partner for HPKVN</h2>
              <button
                onClick={() => setIsHPKVNModalOpen(true)}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Item
              </button>
            </div>
            {hpkvnItems.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <i className="mb-4 text-4xl fas fa-building"></i>
                <p>No items added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hpkvnItems.map((item) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                    <p className="mb-2 text-gray-700">{item.description}</p>
                    {item.readMoreLink && (
                      <a href={item.readMoreLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Read More
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Job Roles Tab */}
        {activeTab === 'job-roles' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Job Roles</h2>
              <button
                onClick={() => setIsJobRoleModalOpen(true)}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Job Role
              </button>
            </div>
            {jobRoles.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <i className="mb-4 text-4xl fas fa-briefcase"></i>
                <p>No job roles added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobRoles.map((role) => (
                  <div key={role.id} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-900">{role.title}</h3>
                    <a href={role.applicationLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Application Link
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Webinars & Workshops Tab */}
        {activeTab === 'webinars-workshops' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Webinars & Workshops</h2>
              <button
                onClick={() => setIsWebinarModalOpen(true)}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Webinar/Workshop
              </button>
            </div>
            {webinars.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <i className="mb-4 text-4xl fas fa-video"></i>
                <p>No webinars or workshops added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="p-4 border border-gray-200 rounded-lg">
                    {webinar.image && (
                      <img src={webinar.image} alt={webinar.title} className="object-cover w-full h-48 mb-3 rounded-lg" />
                    )}
                    <h3 className="mb-2 font-semibold text-gray-900">{webinar.title}</h3>
                    {webinar.link && (
                      <a href={webinar.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        View Details
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Past Activities Tab */}
        {activeTab === 'past-activities' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Past Activities</h2>
              <button
                onClick={() => setIsActivityModalOpen(true)}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Activity
              </button>
            </div>
            {pastActivities.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <i className="mb-4 text-4xl fas fa-history"></i>
                <p>No past activities added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {pastActivities.map((activity) => (
                  <div key={activity.id} className="p-2 border border-gray-200 rounded-lg">
                    {activity.image && (
                      <img src={activity.image} alt={activity.title || 'Past Activity'} className="object-cover w-full h-48 rounded-lg" />
                    )}
                    {activity.title && (
                      <p className="mt-2 text-sm text-center text-gray-700">{activity.title}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PMKVY Modal */}
      {isPMKVYModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add PMKVY Item</h2>
              <button
                onClick={() => setIsPMKVYModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handlePmkvySubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="description1" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description Paragraph 1 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description1"
                  name="description1"
                  required
                  rows={4}
                  value={pmkvyFormData.description1}
                  onChange={(e) => setPmkvyFormData(prev => ({ ...prev, description1: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter first paragraph of description"
                />
              </div>
              <div>
                <label htmlFor="description2" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description Paragraph 2 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description2"
                  name="description2"
                  required
                  rows={4}
                  value={pmkvyFormData.description2}
                  onChange={(e) => setPmkvyFormData(prev => ({ ...prev, description2: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter second paragraph of description"
                />
              </div>
              <div>
                <label htmlFor="readMoreLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read More Link URL
                </label>
                <input
                  type="url"
                  id="readMoreLink"
                  name="readMoreLink"
                  value={pmkvyFormData.readMoreLink}
                  onChange={(e) => setPmkvyFormData(prev => ({ ...prev, readMoreLink: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/read-more"
                />
              </div>
              <div>
                <label htmlFor="pmkvyPdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload
                </label>
                <input
                  type="file"
                  id="pmkvyPdf"
                  accept=".pdf,application/pdf"
                  onChange={handlePmkvyPdfChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {pmkvyPdfPreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {pmkvyFormData.pdf?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(pmkvyFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPMKVYModalOpen(false)}
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
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HPKVN Modal */}
      {isHPKVNModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add HPKVN Item</h2>
              <button
                onClick={() => setIsHPKVNModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleHpkvnSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={hpkvnFormData.description}
                  onChange={(e) => setHpkvnFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label htmlFor="readMoreLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read More Link URL
                </label>
                <input
                  type="url"
                  id="readMoreLink"
                  name="readMoreLink"
                  value={hpkvnFormData.readMoreLink}
                  onChange={(e) => setHpkvnFormData(prev => ({ ...prev, readMoreLink: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/read-more"
                />
              </div>
              <div>
                <label htmlFor="hpkvnPdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload
                </label>
                <input
                  type="file"
                  id="hpkvnPdf"
                  accept=".pdf,application/pdf"
                  onChange={handleHpkvnPdfChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {hpkvnPdfPreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {hpkvnFormData.pdf?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(hpkvnFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsHPKVNModalOpen(false)}
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
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Role Modal */}
      {isJobRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Job Role</h2>
              <button
                onClick={() => setIsJobRoleModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleJobRoleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Job Role Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={jobRoleFormData.title}
                  onChange={(e) => setJobRoleFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., AR/VR Developer, UI/UX Designer"
                />
              </div>
              <div>
                <label htmlFor="applicationLink" className="block mb-2 text-sm font-semibold text-gray-700">
                  Application Form Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="applicationLink"
                  name="applicationLink"
                  required
                  value={jobRoleFormData.applicationLink}
                  onChange={(e) => setJobRoleFormData(prev => ({ ...prev, applicationLink: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://docs.google.com/forms/..."
                />
                <p className="mt-1 text-xs text-gray-500">Enter the Google Form or application link URL</p>
              </div>
              <div>
                <label htmlFor="jobRolePdf" className="block mb-2 text-sm font-semibold text-gray-700">
                  PDF Upload (Job Description)
                </label>
                <input
                  type="file"
                  id="jobRolePdf"
                  accept=".pdf,application/pdf"
                  onChange={handleJobRolePdfChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {jobRolePdfPreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {jobRoleFormData.pdf?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(jobRoleFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsJobRoleModalOpen(false)}
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
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Webinar/Workshop Modal */}
      {isWebinarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Webinar/Workshop</h2>
              <button
                onClick={() => setIsWebinarModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleWebinarSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={webinarFormData.title}
                  onChange={(e) => setWebinarFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Workshop on Internet Of Things"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleWebinarImageChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {webinarImagePreview && (
                  <div className="mt-3">
                    <img src={webinarImagePreview} alt="Preview" className="object-cover w-full h-48 border border-gray-200 rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Link URL
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={webinarFormData.link}
                  onChange={(e) => setWebinarFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/webinar-details"
                />
                <p className="mt-1 text-xs text-gray-500">Link to the detailed page about this webinar/workshop</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsWebinarModalOpen(false)}
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
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Past Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Past Activity</h2>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleActivitySubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleActivityImageChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {activityImagePreview && (
                  <div className="mt-3">
                    <img src={activityImagePreview} alt="Preview" className="object-cover w-full h-48 border border-gray-200 rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Title/Caption
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={activityFormData.title}
                  onChange={(e) => setActivityFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Optional title or caption for the activity"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
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
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
