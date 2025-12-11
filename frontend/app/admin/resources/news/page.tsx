'use client'

import { useState } from 'react'
import {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} from '@/lib/store/api'

interface NewsArticle {
  _id?: string
  title: string
  date: string
  description?: string | null
  source?: string | null
  author?: string | null
  link?: string | null
  image?: string | null
}

export default function NewsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    source: '',
    author: '',
    link: '',
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { data, isLoading, error, refetch } = useGetNewsQuery()
  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation()
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation()
  const [deleteNews] = useDeleteNewsMutation()

  const newsArticles = data?.data || []
  const isSubmitting = isCreating || isUpdating

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageBase64 = null
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.image!)
        })
      } else if (editingItem?.image) {
        imageBase64 = editingItem.image
      }

      const newsData = {
        title: formData.title,
        date: formData.date,
        description: formData.description || null,
        source: formData.source || null,
        author: formData.author || null,
        link: formData.link || null,
        image: imageBase64,
      }

      if (editingItem?._id) {
        await updateNews({ id: editingItem._id, ...newsData }).unwrap()
      } else {
        await createNews(newsData).unwrap()
      }
      
      refetch()
      resetForm()
      setIsModalOpen(false)
      alert(editingItem ? 'News article updated successfully!' : 'News article added successfully!')
    } catch (error: any) {
      console.error('Error saving news article:', error)
      alert(error?.data?.message || 'Failed to save news article. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      description: '',
      source: '',
      author: '',
      link: '',
      image: null,
    })
    setImagePreview(null)
    setEditingItem(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingItem(article)
    setFormData({
      title: article.title,
      date: article.date,
      description: article.description || '',
      source: article.source || '',
      author: article.author || '',
      link: article.link || '',
      image: null,
    })
    setImagePreview(article.image || null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      try {
        await deleteNews(id).unwrap()
        refetch()
        alert('News article deleted successfully!')
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
              <i className="text-xl fas fa-newspaper text-primary"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">News Articles</h2>
              <p className="mt-1 text-sm text-gray-600">Manage news articles and announcements</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <i className="fas fa-plus mr-2"></i>
            Add News
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
        ) : newsArticles.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <i className="text-4xl fas fa-newspaper text-primary"></i>
            </div>
            <p className="text-lg font-medium">No news articles added yet</p>
            <p className="mt-1 text-sm">Click "Add News" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article) => (
              <div key={article._id} className="p-5 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                {article.image && (
                  <div className="w-full h-48 mb-4 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 mb-4">
                  {!article.image && (
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-newspaper text-primary"></i>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-primary flex-1 line-clamp-2">{article.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0"
                          title="Edit article"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => article._id && handleDelete(article._id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                          title="Delete article"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-3">
                      {article.source && (
                        <span className="flex items-center gap-1">
                          <i className="fas fa-building text-primary text-xs"></i>
                          {article.source}
                        </span>
                      )}
                      {article.author && (
                        <span className="flex items-center gap-1">
                          <i className="fas fa-user text-primary text-xs"></i>
                          {article.author}
                        </span>
                      )}
                      {article.date && (
                        <span className="flex items-center gap-1">
                          <i className="fas fa-calendar text-primary text-xs"></i>
                          {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {article.description && (
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                        {article.description}
                      </p>
                    )}
                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors text-sm"
                      >
                        Read More
                        <i className="fas fa-arrow-right text-xs"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit News' : 'Add News'}
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
              {/* News Title Field */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
                  News Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Project Associate positions at IIT Mandi iHub and HCI Foundation"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the title of the news article</p>
              </div>

              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-semibold text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Select the publication date</p>
              </div>

              {/* Cover Image Upload Field */}
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-semibold text-gray-700">
                  Cover Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {imagePreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Upload a cover image for the news article (optional)</p>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a brief description of the news article (optional)"
                />
                <p className="mt-1 text-xs text-gray-500">Provide a brief description or summary (optional)</p>
              </div>

              {/* Source Field */}
              <div>
                <label htmlFor="source" className="block mb-2 text-sm font-semibold text-gray-700">
                  Source
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., NDTV, The Indian Express, etc."
                />
                <p className="mt-1 text-xs text-gray-500">Enter the news source or publication name (optional)</p>
              </div>

              {/* Author Field */}
              <div>
                <label htmlFor="author" className="block mb-2 text-sm font-semibold text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Nav Prakash"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the author name (optional)</p>
              </div>

              {/* Read More Link Field */}
              <div>
                <label htmlFor="link" className="block mb-2 text-sm font-semibold text-gray-700">
                  Read More Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/news-article"
                />
                <p className="mt-1 text-xs text-gray-500">Enter the URL to read the full article (optional)</p>
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
