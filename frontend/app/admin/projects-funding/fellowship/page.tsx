'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'

interface Fellowship {
  id: string
  name: string
  description: string
  pdf: string | null
}

export default function FellowshipAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fellowships, setFellowships] = useState<Fellowship[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pdf: null as File | null,
  })
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // TipTap editor configuration
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: formData.description,
    immediatelyRender: false, // Fix SSR hydration mismatch
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        description: editor.getHTML()
      }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })

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

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

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

      // Create new fellowship
      const newFellowship: Fellowship = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        pdf: pdfBase64,
      }

      // Add to list
      setFellowships(prev => [...prev, newFellowship])
      
      // TODO: Add API call to submit the form data
      // await fetch('/api/fellowships', { method: 'POST', body: JSON.stringify(newFellowship) })
      
      // Reset form and close modal
      setFormData({
        name: '',
        description: '',
        pdf: null,
      })
      editor?.commands.setContent('')
      setPdfPreview(null)
      setIsModalOpen(false)
      
      // Show success message
      alert('Fellowship added successfully!')
    } catch (error) {
      console.error('Error adding fellowship:', error)
      alert('Failed to add fellowship. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this fellowship?')) {
      setFellowships(prev => prev.filter(fellowship => fellowship.id !== id))
    }
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
      setFormData({
        name: '',
        description: '',
        pdf: null,
      })
      editor?.commands.setContent('')
      setPdfPreview(null)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fellowship</h1>
        <p className="mt-2 text-sm text-gray-600">Manage fellowships</p>
      </div>

      <div className="glass-strong rounded-xl p-6 border-2 border-primary/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Fellowships {fellowships.length > 0 && `(${fellowships.length})`}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Fellowship
          </button>
        </div>

        {fellowships.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-award text-4xl mb-4"></i>
            <p>No fellowships added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fellowships.map((fellowship) => (
              <div
                key={fellowship.id}
                className="glass-strong rounded-xl p-6 border-2 border-primary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4 mx-auto">
                  <i className="fas fa-award text-3xl text-primary"></i>
                </div>
                <h3 className="text-lg font-bold mb-3 text-primary text-center">
                  {fellowship.name}
                </h3>
                <div 
                  className="text-sm text-gray-600 mb-4 line-clamp-3 prose prose-sm max-w-none [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4"
                  dangerouslySetInnerHTML={{ __html: fellowship.description }}
                />
                {fellowship.pdf && (
                  <a
                    href={fellowship.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-center mb-3"
                  >
                    <i className="fas fa-download mr-2"></i>
                    View PDF
                  </a>
                )}
                <button
                  onClick={() => handleDelete(fellowship.id)}
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

      {/* Add Fellowship Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">Add Fellowship</h2>
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Fellowship Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Fellowship Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter fellowship name"
                />
              </div>

              {/* Description Field with Rich Text Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                
                {/* Toolbar */}
                <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
                  {/* Text Formatting */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('bold') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Bold"
                  >
                    <i className="fas fa-bold"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('italic') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Italic"
                  >
                    <i className="fas fa-italic"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('strike') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Strikethrough"
                  >
                    <i className="fas fa-strikethrough"></i>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1"></div>

                  {/* Headings */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Heading 3"
                  >
                    H3
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1"></div>

                  {/* Lists */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Bullet List"
                  >
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Numbered List"
                  >
                    <i className="fas fa-list-ol"></i>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1"></div>

                  {/* Link */}
                  <button
                    type="button"
                    onClick={setLink}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('link') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Add Link"
                  >
                    <i className="fas fa-link"></i>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1"></div>

                  {/* Alignment */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Align Left"
                  >
                    <i className="fas fa-align-left"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Align Center"
                  >
                    <i className="fas fa-align-center"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-white' : 'bg-white'
                    }`}
                    title="Align Right"
                  >
                    <i className="fas fa-align-right"></i>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-1"></div>

                  {/* Clear Formatting */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    className="px-3 py-1.5 rounded hover:bg-gray-200 transition-colors bg-white"
                    title="Clear Formatting"
                  >
                    <i className="fas fa-eraser"></i>
                  </button>
                </div>

                {/* Editor Content */}
                <div className="border-x border-b border-gray-300 rounded-b-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                  <EditorContent 
                    editor={editor} 
                    className="min-h-[300px] max-h-[400px] overflow-y-auto [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_li]:ml-4" 
                  />
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Use the toolbar above to format text: <strong>Bold</strong>, <em>Italic</em>, Headings, Bullet Points, Links, etc.
                </p>
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
                  disabled={isSubmitting || !formData.name.trim() || !formData.description.trim()}
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
