'use client'

import { useState } from 'react'

interface GalleryImage {
  id: string
  title: string | null
  image: string
  date: string | null
}

export default function GalleryAdmin() {
  const [activeTab, setActiveTab] = useState('visits-to-ihub')
  
  // State for each tab's images
  const [visitsImages, setVisitsImages] = useState<GalleryImage[]>([])
  const [facilitiesImages, setFacilitiesImages] = useState<GalleryImage[]>([])
  const [workshopsImages, setWorkshopsImages] = useState<GalleryImage[]>([])
  
  // State for modals
  const [isVisitsModalOpen, setIsVisitsModalOpen] = useState(false)
  const [isFacilitiesModalOpen, setIsFacilitiesModalOpen] = useState(false)
  const [isWorkshopsModalOpen, setIsWorkshopsModalOpen] = useState(false)
  
  // Form states
  const [visitsFormData, setVisitsFormData] = useState({
    title: '',
    date: '',
    image: null as File | null,
  })
  const [visitsImagePreview, setVisitsImagePreview] = useState<string | null>(null)
  
  const [facilitiesFormData, setFacilitiesFormData] = useState({
    title: '',
    date: '',
    image: null as File | null,
  })
  const [facilitiesImagePreview, setFacilitiesImagePreview] = useState<string | null>(null)
  
  const [workshopsFormData, setWorkshopsFormData] = useState({
    title: '',
    date: '',
    image: null as File | null,
  })
  const [workshopsImagePreview, setWorkshopsImagePreview] = useState<string | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tabs = [
    { id: 'visits-to-ihub', label: 'Visits to iHub' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'workshops', label: 'Workshops' },
  ]

  // Common handlers
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setFormData((prev: any) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  // Visits to iHub handlers
  const handleVisitsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageBase64 = null
      if (visitsFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(visitsFormData.image!)
        })
      }

      const newImage: GalleryImage = {
        id: Date.now().toString(),
        title: visitsFormData.title || null,
        date: visitsFormData.date || null,
        image: imageBase64!,
      }

      setVisitsImages(prev => [...prev, newImage])
      
      setVisitsFormData({ title: '', date: '', image: null })
      setVisitsImagePreview(null)
      setIsVisitsModalOpen(false)
      
      alert('Image added successfully!')
    } catch (error) {
      console.error('Error adding image:', error)
      alert('Failed to add image. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Facilities handlers
  const handleFacilitiesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageBase64 = null
      if (facilitiesFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(facilitiesFormData.image!)
        })
      }

      const newImage: GalleryImage = {
        id: Date.now().toString(),
        title: facilitiesFormData.title || null,
        date: facilitiesFormData.date || null,
        image: imageBase64!,
      }

      setFacilitiesImages(prev => [...prev, newImage])
      
      setFacilitiesFormData({ title: '', date: '', image: null })
      setFacilitiesImagePreview(null)
      setIsFacilitiesModalOpen(false)
      
      alert('Image added successfully!')
    } catch (error) {
      console.error('Error adding image:', error)
      alert('Failed to add image. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Workshops handlers
  const handleWorkshopsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageBase64 = null
      if (workshopsFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(workshopsFormData.image!)
        })
      }

      const newImage: GalleryImage = {
        id: Date.now().toString(),
        title: workshopsFormData.title || null,
        date: workshopsFormData.date || null,
        image: imageBase64!,
      }

      setWorkshopsImages(prev => [...prev, newImage])
      
      setWorkshopsFormData({ title: '', date: '', image: null })
      setWorkshopsImagePreview(null)
      setIsWorkshopsModalOpen(false)
      
      alert('Image added successfully!')
    } catch (error) {
      console.error('Error adding image:', error)
      alert('Failed to add image. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string, setImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== id))
    }
  }

  return (
    <div>
      {/* Sub-Tabs Navigation */}
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
        {/* Visits to iHub Tab */}
        {activeTab === 'visits-to-ihub' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-calendar-check text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Visits to iHub</h2>
              </div>
              <button
                onClick={() => setIsVisitsModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Image
              </button>
            </div>

            {visitsImages.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-images text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No images added yet</p>
                <p className="text-sm mt-1">Click "Add Image" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visitsImages.map((image) => (
                  <div key={image.id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                    <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                      <img
                        src={image.image}
                        alt={image.title || 'Gallery image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {image.title && (
                      <h3 className="text-lg font-bold text-primary mb-2">{image.title}</h3>
                    )}
                    {image.date && (
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <i className="fas fa-calendar text-primary"></i>
                        {new Date(image.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(image.id, setVisitsImages)}
                      className="w-full px-4 py-2 text-red-500 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-building text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Facilities</h2>
              </div>
              <button
                onClick={() => setIsFacilitiesModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Image
              </button>
            </div>

            {facilitiesImages.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-images text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No images added yet</p>
                <p className="text-sm mt-1">Click "Add Image" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {facilitiesImages.map((image) => (
                  <div key={image.id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                    <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                      <img
                        src={image.image}
                        alt={image.title || 'Gallery image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {image.title && (
                      <h3 className="text-lg font-bold text-primary mb-2">{image.title}</h3>
                    )}
                    {image.date && (
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <i className="fas fa-calendar text-primary"></i>
                        {new Date(image.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(image.id, setFacilitiesImages)}
                      className="w-full px-4 py-2 text-red-500 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Workshops Tab */}
        {activeTab === 'workshops' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-chalkboard-teacher text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Workshops</h2>
              </div>
              <button
                onClick={() => setIsWorkshopsModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Image
              </button>
            </div>

            {workshopsImages.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-images text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No images added yet</p>
                <p className="text-sm mt-1">Click "Add Image" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workshopsImages.map((image) => (
                  <div key={image.id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                    <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                      <img
                        src={image.image}
                        alt={image.title || 'Gallery image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {image.title && (
                      <h3 className="text-lg font-bold text-primary mb-2">{image.title}</h3>
                    )}
                    {image.date && (
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                        <i className="fas fa-calendar text-primary"></i>
                        {new Date(image.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(image.id, setWorkshopsImages)}
                      className="w-full px-4 py-2 text-red-500 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visits to iHub Modal */}
      {isVisitsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Image - Visits to iHub</h2>
              <button
                onClick={() => {
                  setIsVisitsModalOpen(false)
                  setVisitsFormData({ title: '', date: '', image: null })
                  setVisitsImagePreview(null)
                }}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleVisitsSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="visits-title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Title
                </label>
                <input
                  type="text"
                  id="visits-title"
                  name="title"
                  value={visitsFormData.title}
                  onChange={(e) => handleInputChange(e, setVisitsFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image title (optional)"
                />
              </div>

              <div>
                <label htmlFor="visits-date" className="block mb-2 text-sm font-semibold text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="visits-date"
                  name="date"
                  value={visitsFormData.date}
                  onChange={(e) => handleInputChange(e, setVisitsFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the date for this visit (optional)</p>
              </div>

              <div>
                <label htmlFor="visits-image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="visits-image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setVisitsFormData, setVisitsImagePreview)}
                  required
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {visitsImagePreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={visitsImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisitsModalOpen(false)
                    setVisitsFormData({ title: '', date: '', image: null })
                    setVisitsImagePreview(null)
                  }}
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

      {/* Facilities Modal */}
      {isFacilitiesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Image - Facilities</h2>
              <button
                onClick={() => {
                  setIsFacilitiesModalOpen(false)
                  setFacilitiesFormData({ title: '', date: '', image: null })
                  setFacilitiesImagePreview(null)
                }}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleFacilitiesSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="facilities-title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Title
                </label>
                <input
                  type="text"
                  id="facilities-title"
                  name="title"
                  value={facilitiesFormData.title}
                  onChange={(e) => handleInputChange(e, setFacilitiesFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image title (optional)"
                />
              </div>

              <div>
                <label htmlFor="facilities-date" className="block mb-2 text-sm font-semibold text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="facilities-date"
                  name="date"
                  value={facilitiesFormData.date}
                  onChange={(e) => handleInputChange(e, setFacilitiesFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the date for this facility (optional)</p>
              </div>

              <div>
                <label htmlFor="facilities-image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="facilities-image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFacilitiesFormData, setFacilitiesImagePreview)}
                  required
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {facilitiesImagePreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={facilitiesImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFacilitiesModalOpen(false)
                    setFacilitiesFormData({ title: '', date: '', image: null })
                    setFacilitiesImagePreview(null)
                  }}
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

      {/* Workshops Modal */}
      {isWorkshopsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Image - Workshops</h2>
              <button
                onClick={() => {
                  setIsWorkshopsModalOpen(false)
                  setWorkshopsFormData({ title: '', date: '', image: null })
                  setWorkshopsImagePreview(null)
                }}
                disabled={isSubmitting}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleWorkshopsSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="workshops-title" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Title
                </label>
                <input
                  type="text"
                  id="workshops-title"
                  name="title"
                  value={workshopsFormData.title}
                  onChange={(e) => handleInputChange(e, setWorkshopsFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image title (optional)"
                />
              </div>

              <div>
                <label htmlFor="workshops-date" className="block mb-2 text-sm font-semibold text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="workshops-date"
                  name="date"
                  value={workshopsFormData.date}
                  onChange={(e) => handleInputChange(e, setWorkshopsFormData)}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the date for this workshop (optional)</p>
              </div>

              <div>
                <label htmlFor="workshops-image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Image Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="workshops-image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setWorkshopsFormData, setWorkshopsImagePreview)}
                  required
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {workshopsImagePreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={workshopsImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsWorkshopsModalOpen(false)
                    setWorkshopsFormData({ title: '', date: '', image: null })
                    setWorkshopsImagePreview(null)
                  }}
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
