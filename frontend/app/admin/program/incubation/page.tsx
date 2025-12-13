'use client'

import { useState } from 'react'
import {
  useGetStartupsQuery,
  useCreateStartupMutation,
  useDeleteStartupMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/lib/store/api'

interface Startup {
  _id: string
  name: string
  category: string
  location: string
  link: string
  image?: string | null
}

export default function IncubationAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  
  // RTK Query hooks
  const { data: startupsData, refetch: refetchStartups } = useGetStartupsQuery({})
  const [createStartup, { isLoading: isCreatingStartup }] = useCreateStartupMutation()
  const [deleteStartup] = useDeleteStartupMutation()
  
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesQuery()
  const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  
  const startups = startupsData?.data || []
  const categories = categoriesData?.data || []
  const thematicCategories = categories.map((cat: { name: string }) => cat.name)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    link: '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [categoryFormData, setCategoryFormData] = useState({
    categoryName: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = formData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a startup name')
      return
    }
    if (!formData.category) {
      alert('Please select a category')
      return
    }
    if (!formData.location?.trim()) {
      alert('Please enter a location')
      return
    }
    if (!formData.link?.trim()) {
      alert('Please enter a website link')
      return
    }

    try {
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      }

      await createStartup({
        name: trimmedName,
        category: formData.category,
        location: formData.location.trim(),
        link: formData.link.trim(),
        image: imageBase64 || undefined,
      }).unwrap()
      
      // Reset form and close modal
      setFormData({
        name: '',
        category: '',
        location: '',
        link: '',
        image: null,
      })
      setImagePreview(null)
      setIsModalOpen(false)
      refetchStartups()
      
      // Show success message
      alert('Startup added successfully!')
    } catch (error: any) {
      console.error('Error adding startup:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add startup'
      alert(errorMessage)
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        name: '',
        category: '',
        location: '',
        link: '',
        image: null,
      })
      setImagePreview(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this startup?')) {
      try {
        await deleteStartup(id).unwrap()
        refetchStartups()
        alert('Startup deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting startup:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete startup'
        alert(errorMessage)
      }
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const categoryName = categoryFormData.categoryName.trim()
    
    if (!categoryName) {
      alert('Please enter a category name')
      return
    }

    if (thematicCategories.includes(categoryName)) {
      alert('This category already exists')
      return
    }

    try {
      await createCategory({ name: categoryName }).unwrap()
      
      // Reset form and close modal
      setCategoryFormData({ categoryName: '' })
      setIsCategoryModalOpen(false)
      refetchCategories()
      
      // Show success message
      alert('Category added successfully!')
    } catch (error: any) {
      console.error('Error adding category:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add category'
      alert(errorMessage)
    }
  }

  const handleDeleteCategory = async (category: string) => {
    // Check if any startup is using this category
    const startupsUsingCategory = startups.filter(startup => startup.category === category)
    
    if (startupsUsingCategory.length > 0) {
      alert(`Cannot delete this category. ${startupsUsingCategory.length} startup(s) are using it. Please update those startups first.`)
      return
    }

    if (confirm(`Are you sure you want to delete the category "${category}"?`)) {
      try {
        await deleteCategory(category).unwrap()
        refetchCategories()
        alert('Category deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting category:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete category'
        alert(errorMessage)
      }
    }
  }

  const handleCloseCategoryModal = () => {
    if (!isCategorySubmitting) {
      setIsCategoryModalOpen(false)
      setCategoryFormData({ categoryName: '' })
    }
  }

  return (
    <div>
      <div 
        className="glass-strong rounded-2xl p-6 border-2 border-primary/10 shadow-xl mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <i className="fas fa-rocket text-primary text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">iHub Invested Startups</h2>
              <p className="text-sm text-gray-600 mt-1">Manage startup portfolio and categories</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-5 py-2.5 text-primary transition-all duration-300 border-2 border-primary rounded-xl hover:bg-primary/10 hover:shadow-md font-semibold"
            >
              <i className="mr-2 fas fa-tags"></i>
              Manage Categories
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              <i className="mr-2 fas fa-plus"></i>
              Add Startup
            </button>
          </div>
        </div>

        {startups.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <i className="text-4xl fas fa-rocket text-primary"></i>
            </div>
            <p className="text-lg font-medium">No startups added yet</p>
            <p className="text-sm mt-1">Click "Add Startup" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <div key={startup._id} className="p-5 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                {startup.image && (
                  <div className="w-full h-48 mb-3 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                      src={startup.image}
                      alt={startup.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-primary flex-1">{startup.name}</h3>
                  <button
                    onClick={() => handleDelete(startup._id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete startup"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-primary">Thematic Category:</strong> {startup.category}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                    {startup.location}
                  </p>
                  {startup.link && (
                    <a
                      href={startup.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Visit Website
                      <i className="fas fa-external-link-alt text-xs"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Startup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Startup</h2>
              <button
                onClick={handleCloseModal}
                disabled={isCreatingStartup}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Startup Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                  Startup Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Brave Heart Solutions"
                />
              </div>

              {/* Thematic Category Field */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">
                  Thematic Category in HCi <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {thematicCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Select the thematic category for this startup</p>
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Noida, Bengaluru, Delhi"
                />
              </div>

              {/* Website Link Field */}
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Website Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  required
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the startup's website URL</p>
              </div>

              {/* Image Upload Field */}
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Startup Logo/Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-48 border border-gray-200 rounded-lg" />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Upload a logo or image for this startup (optional)</p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isCreatingStartup}
                  className="flex-1 px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingStartup}
                  className="flex-1 px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  {isCreatingStartup ? (
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

      {/* Manage Categories Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Manage Thematic Categories</h2>
              <button
                onClick={handleCloseCategoryModal}
                disabled={isCreatingCategory}
                className="text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
              >
                <i className="text-xl fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Add New Category Form */}
              <form onSubmit={handleCategorySubmit} className="space-y-4 pb-6 border-b border-gray-200">
                <div>
                  <label htmlFor="categoryName" className="block mb-2 text-sm font-semibold text-gray-700">
                    Add New Category <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      required
                      value={categoryFormData.categoryName}
                      onChange={(e) => setCategoryFormData({ categoryName: e.target.value })}
                      className="flex-1 px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Assistive Technologies"
                    />
                    <button
                      type="submit"
                      disabled={isCreatingCategory}
                      className="px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
                    >
                      {isCreatingCategory ? (
                        <>
                          <i className="mr-2 fas fa-spinner fa-spin"></i>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="mr-2 fas fa-plus"></i>
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Existing Categories List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Categories</h3>
                {thematicCategories.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No categories added yet</p>
                ) : (
                  <div className="space-y-2">
                    {thematicCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-700 font-medium">{category}</span>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete category"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="pt-4">
                <button
                  onClick={handleCloseCategoryModal}
                  disabled={isCreatingCategory}
                  className="w-full px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
