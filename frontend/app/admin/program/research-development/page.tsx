'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import {
  useGetProposalsQuery,
  useCreateProposalMutation,
  useDeleteProposalMutation,
  useGetFellowshipsQuery,
  useCreateFellowshipMutation,
  useDeleteFellowshipMutation,
  useGetOngoingProjectsQuery,
  useCreateOngoingProjectMutation,
  useDeleteOngoingProjectMutation,
} from '@/lib/store/api'

// Interfaces for different item types
interface Proposal {
  _id: string
  name: string
  currentDate: string
  lastDateToApply: string
  pdf?: string | null
}

interface Fellowship {
  _id: string
  name: string
  description: string
  pdf?: string | null
}

interface OngoingProject {
  _id: string
  sno: number
  title: string
  instituteName: string
  principalInvestigator: string
  coPrincipalInvestigator: string
  amountSanctioned: string
  durationFrom: string
  durationTo: string
  pdf?: string | null
}

export default function ResearchDevelopmentAdmin() {
  const [activeTab, setActiveTab] = useState('call-for-proposals')
  
  // State for modals
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false)
  const [isFellowshipModalOpen, setIsFellowshipModalOpen] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  // RTK Query hooks
  const { data: proposalsData, refetch: refetchProposals } = useGetProposalsQuery({})
  const [createProposal, { isLoading: isCreatingProposal }] = useCreateProposalMutation()
  const [deleteProposal] = useDeleteProposalMutation()
  
  const { data: fellowshipsData, refetch: refetchFellowships } = useGetFellowshipsQuery({})
  const [createFellowship, { isLoading: isCreatingFellowship }] = useCreateFellowshipMutation()
  const [deleteFellowship] = useDeleteFellowshipMutation()
  
  const { data: projectsData, refetch: refetchProjects } = useGetOngoingProjectsQuery({})
  const [createOngoingProject, { isLoading: isCreatingProject }] = useCreateOngoingProjectMutation()
  const [deleteOngoingProject] = useDeleteOngoingProjectMutation()
  
  const proposals = proposalsData?.data || []
  const fellowships = fellowshipsData?.data || []
  const projects = projectsData?.data || []

  // Form states for Call for Proposals
  const [proposalFormData, setProposalFormData] = useState({
    name: '',
    currentDate: new Date().toISOString().split('T')[0],
    lastDateToApply: '',
    pdf: null as File | null,
  })
  const [proposalPdfPreview, setProposalPdfPreview] = useState<string | null>(null)

  // Form states for Fellowship
  const [fellowshipFormData, setFellowshipFormData] = useState({
    name: '',
    description: '',
    pdf: null as File | null,
  })
  const [fellowshipPdfPreview, setFellowshipPdfPreview] = useState<string | null>(null)

  // Form states for Ongoing Projects
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    instituteName: '',
    principalInvestigator: '',
    coPrincipalInvestigator: '',
    amountSanctioned: '',
    durationFrom: '',
    durationTo: '',
    pdf: null as File | null,
  })
  const [projectPdfPreview, setProjectPdfPreview] = useState<string | null>(null)


  const tabs = [
    { id: 'call-for-proposals', label: 'Call for Proposals' },
    { id: 'fellowship', label: 'Fellowship' },
    { id: 'ongoing-projects', label: 'Ongoing Projects' },
  ]

  // TipTap editor configuration for Fellowship
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
    content: fellowshipFormData.description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFellowshipFormData(prev => ({
        ...prev,
        description: editor.getHTML(),
      }))
    },
  })

  // Call for Proposals Handlers
  const handleProposalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProposalFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProposalPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setProposalFormData(prev => ({
        ...prev,
        pdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setProposalPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = proposalFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a proposal name')
      return
    }
    if (!proposalFormData.lastDateToApply) {
      alert('Please select a last date to apply')
      return
    }
    
    try {
      let pdfBase64 = null
      if (proposalFormData.pdf) {
        const reader = new FileReader()
        pdfBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(proposalFormData.pdf!)
        })
      }

      await createProposal({
        name: trimmedName,
        currentDate: proposalFormData.currentDate,
        lastDateToApply: proposalFormData.lastDateToApply,
        pdf: pdfBase64 || undefined,
      }).unwrap()
      
      handleCloseProposalModal()
      refetchProposals()
      alert('Proposal added successfully!')
    } catch (error: any) {
      console.error('Error submitting proposal:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to submit proposal'
      alert(errorMessage)
    }
  }

  const handleCloseProposalModal = () => {
    setIsProposalModalOpen(false)
    setProposalFormData({
      name: '',
      currentDate: new Date().toISOString().split('T')[0],
      lastDateToApply: '',
      pdf: null,
    })
    setProposalPdfPreview(null)
  }

  const handleDeleteProposal = async (id: string) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      try {
        await deleteProposal(id).unwrap()
        refetchProposals()
        alert('Proposal deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting proposal:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete proposal'
        alert(errorMessage)
      }
    }
  }

  // Fellowship Handlers
  const handleFellowshipInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFellowshipFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFellowshipPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setFellowshipFormData(prev => ({
        ...prev,
        pdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setFellowshipPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFellowshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = fellowshipFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a fellowship name')
      return
    }
    if (!fellowshipFormData.description?.trim()) {
      alert('Please enter a description')
      return
    }
    
    try {
      let pdfBase64 = null
      if (fellowshipFormData.pdf) {
        const reader = new FileReader()
        pdfBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(fellowshipFormData.pdf!)
        })
      }

      await createFellowship({
        name: trimmedName,
        description: fellowshipFormData.description,
        pdf: pdfBase64 || undefined,
      }).unwrap()
      
      handleCloseFellowshipModal()
      refetchFellowships()
      alert('Fellowship added successfully!')
    } catch (error: any) {
      console.error('Error submitting fellowship:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to submit fellowship'
      alert(errorMessage)
    }
  }

  const handleCloseFellowshipModal = () => {
    setIsFellowshipModalOpen(false)
    setFellowshipFormData({
      name: '',
      description: '',
      pdf: null,
    })
    setFellowshipPdfPreview(null)
    if (editor) {
      editor.commands.setContent('')
    }
  }

  const handleDeleteFellowship = async (id: string) => {
    if (confirm('Are you sure you want to delete this fellowship?')) {
      try {
        await deleteFellowship(id).unwrap()
        refetchFellowships()
        alert('Fellowship deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting fellowship:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete fellowship'
        alert(errorMessage)
      }
    }
  }

  // Ongoing Projects Handlers
  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProjectFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      setProjectFormData(prev => ({
        ...prev,
        pdf: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setProjectPdfPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedTitle = projectFormData.title?.trim()
    if (!trimmedTitle) {
      alert('Please enter a project title')
      return
    }
    if (!projectFormData.instituteName?.trim()) {
      alert('Please enter an institute name')
      return
    }
    if (!projectFormData.principalInvestigator?.trim()) {
      alert('Please enter a principal investigator')
      return
    }
    if (!projectFormData.amountSanctioned) {
      alert('Please enter an amount sanctioned')
      return
    }
    if (!projectFormData.durationFrom || !projectFormData.durationTo) {
      alert('Please select project duration')
      return
    }

    try {
      let pdfBase64 = null
      if (projectFormData.pdf) {
        pdfBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(projectFormData.pdf!)
        })
      }

      const nextSno = projects.length > 0 
        ? Math.max(...projects.map(p => p.sno)) + 1 
        : 1

      await createOngoingProject({
        sno: nextSno,
        title: trimmedTitle,
        instituteName: projectFormData.instituteName.trim(),
        principalInvestigator: projectFormData.principalInvestigator.trim(),
        coPrincipalInvestigator: projectFormData.coPrincipalInvestigator?.trim() || undefined,
        amountSanctioned: projectFormData.amountSanctioned,
        durationFrom: projectFormData.durationFrom,
        durationTo: projectFormData.durationTo,
        pdf: pdfBase64 || undefined,
      }).unwrap()
      
      handleCloseProjectModal()
      refetchProjects()
      alert('Project added successfully!')
    } catch (error: any) {
      console.error('Error submitting project:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to submit project'
      alert(errorMessage)
    }
  }

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false)
    setProjectFormData({
      title: '',
      instituteName: '',
      principalInvestigator: '',
      coPrincipalInvestigator: '',
      amountSanctioned: '',
      durationFrom: '',
      durationTo: '',
      pdf: null,
    })
    setProjectPdfPreview(null)
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteOngoingProject(id).unwrap()
        refetchProjects()
        alert('Project deleted successfully!')
      } catch (error: any) {
        console.error('Error deleting project:', error)
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete project'
        alert(errorMessage)
      }
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
        {/* Call for Proposals Tab */}
        {activeTab === 'call-for-proposals' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-file-alt text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Call for Proposals</h2>
              </div>
              <button
                onClick={() => setIsProposalModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Proposal
              </button>
            </div>

            {proposals.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-file-alt text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No proposals added yet</p>
                <p className="text-sm mt-1">Click "Add Proposal" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proposals.map((proposal) => (
                  <div
                    key={proposal._id}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4 mx-auto">
                      <i className="fas fa-file-alt text-3xl text-primary"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-primary text-center">
                      {proposal.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><strong>Current Date:</strong> {new Date(proposal.currentDate).toLocaleDateString()}</p>
                      <p><strong>Last Date to Apply:</strong> {new Date(proposal.lastDateToApply).toLocaleDateString()}</p>
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
                      onClick={() => handleDeleteProposal(proposal._id)}
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
        )}

        {/* Fellowship Tab */}
        {activeTab === 'fellowship' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-user-graduate text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Fellowship Programs</h2>
              </div>
              <button
                onClick={() => setIsFellowshipModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Fellowship
              </button>
      </div>

            {fellowships.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-award text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No fellowships added yet</p>
                <p className="text-sm mt-1">Click "Add Fellowship" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fellowships.map((fellowship) => (
                  <div
                    key={fellowship._id}
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
                      onClick={() => handleDeleteFellowship(fellowship._id)}
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
        )}

        {/* Ongoing Projects Tab */}
        {activeTab === 'ongoing-projects' && (
          <div>
        <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-project-diagram text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Ongoing Projects</h2>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
            <i className="fas fa-plus mr-2"></i>
                Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <i className="fas fa-project-diagram text-4xl text-primary"></i>
                </div>
                <p className="text-lg font-medium">No projects added yet</p>
                <p className="text-sm mt-1">Click "Add Project" to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white">
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">S.No.</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Institute</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">PI</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Co-PI</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr
                        key={project._id}
                        className={`border-b border-primary/10 ${
                          index % 2 === 0 ? 'bg-white/60' : 'bg-primary-lighter/30'
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-bold text-primary">{project.sno}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{project.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{project.instituteName}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{project.principalInvestigator}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{project.coPrincipalInvestigator}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 font-bold">₹{parseFloat(project.amountSanctioned).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {new Date(project.durationFrom).toLocaleDateString()} - {new Date(project.durationTo).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call for Proposals Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Proposal</h2>
              <button
                onClick={handleCloseProposalModal}
                disabled={isCreatingProposal}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Call of Proposal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={proposalFormData.name}
                  onChange={handleProposalInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter proposal name"
                />
              </div>

              <div>
                <label htmlFor="currentDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="currentDate"
                  name="currentDate"
                  required
                  value={proposalFormData.currentDate}
                  onChange={handleProposalInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Current date is automatically selected</p>
              </div>

              <div>
                <label htmlFor="lastDateToApply" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Date to Apply <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="lastDateToApply"
                  name="lastDateToApply"
                  required
                  value={proposalFormData.lastDateToApply}
                  onChange={handleProposalInputChange}
                  min={proposalFormData.currentDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

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
                    onChange={handleProposalPdfChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {proposalPdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {proposalFormData.pdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(proposalFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseProposalModal}
                  disabled={isCreatingProposal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingProposal}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingProposal ? (
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

      {/* Fellowship Modal */}
      {isFellowshipModalOpen && editor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">Add Fellowship</h2>
              <button
                onClick={handleCloseFellowshipModal}
                disabled={isCreatingFellowship}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleFellowshipSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Fellowship Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={fellowshipFormData.name}
                  onChange={handleFellowshipInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter fellowship name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                
                {/* Toolbar */}
                <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('bold') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                  >
                    <i className="fas fa-bold"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('italic') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                  >
                    <i className="fas fa-italic"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                  >
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1.5 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-white'
                    }`}
                  >
                    <i className="fas fa-list-ol"></i>
                  </button>
                </div>

                {/* Editor */}
                <div className="border-x border-b border-gray-300 rounded-b-lg p-4 min-h-[200px]">
                  <EditorContent editor={editor} />
                </div>
              </div>

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
                    onChange={handleFellowshipPdfChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {fellowshipPdfPreview && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {fellowshipFormData.pdf?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(fellowshipFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseFellowshipModal}
                  disabled={isCreatingFellowship}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingFellowship}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingFellowship ? (
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

      {/* Ongoing Projects Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
              <button
                onClick={handleCloseProjectModal}
                disabled={isCreatingProject}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
          </button>
        </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  S.No.
                </label>
                <div className="text-lg font-bold text-primary">
                  {projects.length > 0 
                    ? Math.max(...projects.map(p => p.sno)) + 1 
                    : 1}
                </div>
                <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title of the Proposal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={projectFormData.title}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter proposal title"
                />
              </div>

              <div>
                <label htmlFor="instituteName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name of the Institute <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  required
                  value={projectFormData.instituteName}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter institute name"
                />
              </div>

              <div>
                <label htmlFor="principalInvestigator" className="block text-sm font-semibold text-gray-700 mb-2">
                  Principal Investigator (PI) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="principalInvestigator"
                  name="principalInvestigator"
                  required
                  value={projectFormData.principalInvestigator}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter principal investigator name"
                />
              </div>

              <div>
                <label htmlFor="coPrincipalInvestigator" className="block text-sm font-semibold text-gray-700 mb-2">
                  Co-Principal Investigator
                </label>
                <input
                  type="text"
                  id="coPrincipalInvestigator"
                  name="coPrincipalInvestigator"
                  value={projectFormData.coPrincipalInvestigator}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter co-principal investigator name"
                />
              </div>

              <div>
                <label htmlFor="amountSanctioned" className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount Sanctioned (INR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amountSanctioned"
                  name="amountSanctioned"
                  required
                  min="0"
                  step="0.01"
                  value={projectFormData.amountSanctioned}
                  onChange={handleProjectInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter amount in INR"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration of Project <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="durationFrom" className="block text-xs font-medium text-gray-600 mb-2">
                      From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="durationFrom"
                      name="durationFrom"
                      required
                      value={projectFormData.durationFrom}
                      onChange={handleProjectInputChange}
                      max={projectFormData.durationTo || undefined}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="durationTo" className="block text-xs font-medium text-gray-600 mb-2">
                      To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="durationTo"
                      name="durationTo"
                      required
                      value={projectFormData.durationTo}
                      onChange={handleProjectInputChange}
                      min={projectFormData.durationFrom || undefined}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="projectPdf" className="block text-sm font-semibold text-gray-700 mb-2">
                  PDF Upload (Project Document)
                </label>
                <input
                  type="file"
                  id="projectPdf"
                  accept=".pdf,application/pdf"
                  onChange={handleProjectPdfChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {projectPdfPreview && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {projectFormData.pdf?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(projectFormData.pdf?.size! / 1024 / 1024).toFixed(2)} MB
                        </p>
        </div>
      </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseProjectModal}
                  disabled={isCreatingProject}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingProject}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingProject ? (
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
