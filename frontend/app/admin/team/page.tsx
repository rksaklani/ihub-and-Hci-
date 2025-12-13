'use client'

import { useState } from 'react'
import {
  useGetBoardMembersQuery,
  useCreateBoardMemberMutation,
  useDeleteBoardMemberMutation,
  useGetAdvisorsQuery,
  useCreateAdvisorMutation,
  useDeleteAdvisorMutation,
  useGetGoverningBodyMembersQuery,
  useCreateGoverningBodyMemberMutation,
  useDeleteGoverningBodyMemberMutation,
  useGetTeamMembersQuery,
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetFacultyProjectsQuery,
  useCreateFacultyProjectMutation,
  useDeleteFacultyProjectMutation,
  useGetAffiliatedFacultyQuery,
  useCreateAffiliatedFacultyMutation,
  useDeleteAffiliatedFacultyMutation,
} from '@/lib/store/api'

// Interfaces for different team member types
interface BoardMember {
  id: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

interface Advisor {
  id: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

interface GoverningBodyMember {
  id: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

interface TeamMember {
  id: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

interface Project {
  id: string
  name: string
  description: string
}

interface FacultyMember {
  id: string
  projectId: string
  name: string
  image: string | null
  linkedinUrl: string
  description: string
}

export default function TeamAdmin() {
  const [activeTab, setActiveTab] = useState('board-of-directors')
  
  // State for modals
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false)
  const [isGoverningBodyModalOpen, setIsGoverningBodyModalOpen] = useState(false)
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
  const [isFacultyProjectModalOpen, setIsFacultyProjectModalOpen] = useState(false)
  const [isFacultyMemberModalOpen, setIsFacultyMemberModalOpen] = useState(false)

  // RTK Query hooks
  const { data: boardData, refetch: refetchBoard } = useGetBoardMembersQuery()
  const [createBoardMember, { isLoading: isCreatingBoard }] = useCreateBoardMemberMutation()
  const [deleteBoardMember] = useDeleteBoardMemberMutation()

  const { data: advisorsData, refetch: refetchAdvisors } = useGetAdvisorsQuery()
  const [createAdvisor, { isLoading: isCreatingAdvisor }] = useCreateAdvisorMutation()
  const [deleteAdvisor] = useDeleteAdvisorMutation()

  const { data: governingBodyData, refetch: refetchGoverningBody } = useGetGoverningBodyMembersQuery()
  const [createGoverningBodyMember, { isLoading: isCreatingGoverningBody }] = useCreateGoverningBodyMemberMutation()
  const [deleteGoverningBodyMember] = useDeleteGoverningBodyMemberMutation()

  const { data: teamMembersData, refetch: refetchTeamMembers } = useGetTeamMembersQuery()
  const [createTeamMember, { isLoading: isCreatingTeamMember }] = useCreateTeamMemberMutation()
  const [deleteTeamMember] = useDeleteTeamMemberMutation()

  const { data: projectsData, refetch: refetchProjects } = useGetFacultyProjectsQuery()
  const [createFacultyProject, { isLoading: isCreatingProject }] = useCreateFacultyProjectMutation()
  const [deleteFacultyProject] = useDeleteFacultyProjectMutation()

  const { data: facultyData, refetch: refetchFaculty } = useGetAffiliatedFacultyQuery()
  const [createAffiliatedFaculty, { isLoading: isCreatingFaculty }] = useCreateAffiliatedFacultyMutation()
  const [deleteAffiliatedFaculty] = useDeleteAffiliatedFacultyMutation()

  // Extract data from queries
  const boardMembers = boardData?.data || []
  const advisors = advisorsData?.data || []
  const governingBodyMembers = governingBodyData?.data || []
  const teamMembers = teamMembersData?.data || []
  const projects = projectsData?.data || []
  const facultyMembers = facultyData?.data || []

  // Form states
  const [boardFormData, setBoardFormData] = useState({
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [boardImagePreview, setBoardImagePreview] = useState<string | null>(null)

  const [advisorFormData, setAdvisorFormData] = useState({
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [advisorImagePreview, setAdvisorImagePreview] = useState<string | null>(null)

  const [governingBodyFormData, setGoverningBodyFormData] = useState({
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [governingBodyImagePreview, setGoverningBodyImagePreview] = useState<string | null>(null)

  const [teamFormData, setTeamFormData] = useState({
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [teamImagePreview, setTeamImagePreview] = useState<string | null>(null)

  const [facultyProjectFormData, setFacultyProjectFormData] = useState({
    name: '',
    description: '',
  })

  const [facultyMemberFormData, setFacultyMemberFormData] = useState({
    projectId: '',
    name: '',
    image: null as File | null,
    linkedinUrl: '',
    description: '',
  })
  const [facultyImagePreview, setFacultyImagePreview] = useState<string | null>(null)

  const isSubmitting = isCreatingBoard || isCreatingAdvisor || isCreatingGoverningBody || isCreatingTeamMember || isCreatingProject || isCreatingFaculty

  const tabs = [
    { id: 'board-of-directors', label: 'Board of Directors', icon: 'fas fa-user-tie' },
    { id: 'advisors', label: 'Advisors', icon: 'fas fa-user-graduate' },
    { id: 'hub-governing-body', label: 'Hub Governing Body', icon: 'fas fa-users-cog' },
    { id: 'ihub-team', label: 'iHub Team', icon: 'fas fa-users' },
    { id: 'affiliated-faculty', label: 'Affiliated Faculty', icon: 'fas fa-chalkboard-teacher' },
  ]

  // Common handlers
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev: any) => ({
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  // Board of Directors handlers
  const handleBoardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = boardFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a name')
      return
    }
    
    try {
      let imageBase64 = null
      if (boardFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(boardFormData.image!)
        })
      }
      await createBoardMember({
        name: trimmedName,
        image: imageBase64 || undefined,
        linkedinUrl: boardFormData.linkedinUrl?.trim() || undefined,
        description: boardFormData.description?.trim() || undefined,
      }).unwrap()
      refetchBoard()
      handleCloseBoardModal()
      alert('Board member added successfully!')
    } catch (error: any) {
      console.error('Error adding board member:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add board member'
      alert(errorMessage)
    }
  }

  const handleCloseBoardModal = () => {
    setIsBoardModalOpen(false)
    setBoardFormData({ name: '', image: null, linkedinUrl: '', description: '' })
    setBoardImagePreview(null)
  }

  // Advisors handlers
  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = advisorFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a name')
      return
    }
    
    try {
      let imageBase64 = null
      if (advisorFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(advisorFormData.image!)
        })
      }
      await createAdvisor({
        name: trimmedName,
        image: imageBase64 || undefined,
        linkedinUrl: advisorFormData.linkedinUrl?.trim() || undefined,
        description: advisorFormData.description?.trim() || undefined,
      }).unwrap()
      refetchAdvisors()
      handleCloseAdvisorModal()
      alert('Advisor added successfully!')
    } catch (error: any) {
      console.error('Error adding advisor:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add advisor'
      alert(errorMessage)
    }
  }

  const handleCloseAdvisorModal = () => {
    setIsAdvisorModalOpen(false)
    setAdvisorFormData({ name: '', image: null, linkedinUrl: '', description: '' })
    setAdvisorImagePreview(null)
  }

  // Governing Body handlers
  const handleGoverningBodySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = governingBodyFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a name')
      return
    }
    
    try {
      let imageBase64 = null
      if (governingBodyFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(governingBodyFormData.image!)
        })
      }
      await createGoverningBodyMember({
        name: trimmedName,
        image: imageBase64 || undefined,
        linkedinUrl: governingBodyFormData.linkedinUrl?.trim() || undefined,
        description: governingBodyFormData.description?.trim() || undefined,
      }).unwrap()
      refetchGoverningBody()
      handleCloseGoverningBodyModal()
      alert('Member added successfully!')
    } catch (error: any) {
      console.error('Error adding member:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add member'
      alert(errorMessage)
    }
  }

  const handleCloseGoverningBodyModal = () => {
    setIsGoverningBodyModalOpen(false)
    setGoverningBodyFormData({ name: '', image: null, linkedinUrl: '', description: '' })
    setGoverningBodyImagePreview(null)
  }

  // Team handlers
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const trimmedName = teamFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a name')
      return
    }
    
    try {
      let imageBase64 = null
      if (teamFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(teamFormData.image!)
        })
      }
      await createTeamMember({
        name: trimmedName,
        image: imageBase64 || undefined,
        linkedinUrl: teamFormData.linkedinUrl?.trim() || undefined,
        description: teamFormData.description?.trim() || undefined,
      }).unwrap()
      refetchTeamMembers()
      handleCloseTeamModal()
      alert('Team member added successfully!')
    } catch (error: any) {
      console.error('Error adding team member:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add team member'
      alert(errorMessage)
    }
  }

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false)
    setTeamFormData({ name: '', image: null, linkedinUrl: '', description: '' })
    setTeamImagePreview(null)
  }

  // Faculty Project handlers
  const handleFacultyProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createFacultyProject({
        name: facultyProjectFormData.name,
        description: facultyProjectFormData.description,
      }).unwrap()
      refetchProjects()
      setFacultyProjectFormData({ name: '', description: '' })
      setIsFacultyProjectModalOpen(false)
      alert('Project added successfully!')
    } catch (error: any) {
      console.error('Error adding project:', error)
      alert(error?.data?.message || 'Failed to add project')
    }
  }

  // Faculty Member handlers
  const handleFacultyMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    if (!facultyMemberFormData.projectId) {
      alert('Please select a project')
      return
    }
    
    const trimmedName = facultyMemberFormData.name?.trim()
    if (!trimmedName) {
      alert('Please enter a name')
      return
    }
    
    try {
      let imageBase64 = null
      if (facultyMemberFormData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(facultyMemberFormData.image!)
        })
      }
      await createAffiliatedFaculty({
        projectId: facultyMemberFormData.projectId,
        name: trimmedName,
        image: imageBase64 || undefined,
        linkedinUrl: facultyMemberFormData.linkedinUrl?.trim() || undefined,
        description: facultyMemberFormData.description?.trim() || undefined,
      }).unwrap()
      refetchFaculty()
      handleCloseFacultyMemberModal()
      alert('Faculty member added successfully!')
    } catch (error: any) {
      console.error('Error adding faculty member:', error)
      const errorMessage = error?.data?.message || error?.message || 'Failed to add faculty member'
      alert(errorMessage)
    }
  }

  const handleCloseFacultyMemberModal = () => {
    setIsFacultyMemberModalOpen(false)
    setFacultyMemberFormData({ projectId: '', name: '', image: null, linkedinUrl: '', description: '' })
    setFacultyImagePreview(null)
  }

  // Delete handlers
  const handleDeleteBoard = async (id: string) => {
    if (confirm('Are you sure you want to delete this board member?')) {
      try {
        await deleteBoardMember(id).unwrap()
        refetchBoard()
        alert('Board member deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const handleDeleteAdvisor = async (id: string) => {
    if (confirm('Are you sure you want to delete this advisor?')) {
      try {
        await deleteAdvisor(id).unwrap()
        refetchAdvisors()
        alert('Advisor deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const handleDeleteGoverningBody = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteGoverningBodyMember(id).unwrap()
        refetchGoverningBody()
        alert('Member deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const handleDeleteTeam = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id).unwrap()
        refetchTeamMembers()
        alert('Team member deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteFacultyProject(id).unwrap()
        refetchProjects()
        alert('Project deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  const handleDeleteFaculty = async (id: string) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await deleteAffiliatedFaculty(id).unwrap()
        refetchFaculty()
        alert('Faculty member deleted successfully!')
      } catch (error: any) {
        alert(error?.data?.message || 'Failed to delete')
      }
    }
  }

  // Render member card component
  const renderMemberCard = (member: any, onDelete: () => void, type: string) => (
    <div key={member._id || member.id} className="glass-strong rounded-xl p-6 border-2 border-primary/10 hover:shadow-lg transition-all duration-300">
      {member.image && (
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="text-lg font-bold mb-2 text-primary text-center">{member.name}</h3>
      {member.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 text-center">{member.description}</p>
      )}
      {member.linkedinUrl && (
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-center mb-3"
        >
          <i className="fab fa-linkedin mr-2"></i>
          LinkedIn
        </a>
      )}
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
      >
        <i className="fas fa-trash mr-2"></i>
        Delete
      </button>
    </div>
  )

  // Render member modal
  const renderMemberModal = (
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    imagePreview: string | null,
    setFormData: React.Dispatch<React.SetStateAction<any>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
    title: string
  ) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900">Add {title}</h2>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange(e, setFormData)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFormData, setImagePreview)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-primary/20" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange(e, setFormData)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e, setFormData)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter description"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
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
    )
  }

  return (
    <div>
      {/* Main Tabs Navigation */}
      <div className="mb-6">
        <div 
          className="glass-strong rounded-xl p-2 border-2 border-primary/20 shadow-lg bg-gradient-to-br from-white via-primary/5 to-white"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(13, 86, 158, 0.05) 50%, rgba(255, 255, 255, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-5 py-2.5 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center gap-2 flex-1 min-w-[140px] ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white shadow-lg shadow-primary/30 border border-primary/30'
                    : 'bg-white/90 text-gray-700 hover:bg-white hover:text-primary border border-gray-300/50 hover:border-primary/40 hover:shadow-md'
                }`}
              >
                <div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <i className={`${tab.icon} ${activeTab === tab.id ? 'text-white' : 'text-primary group-hover:text-primary-dark'} text-sm transition-colors`}></i>
                </div>
                <span className="font-heading whitespace-nowrap">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-white rounded-full"></div>
                )}
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
        {/* Board of Directors Tab */}
        {activeTab === 'board-of-directors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-user-tie text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Board of Directors</h2>
              </div>
              <button
                onClick={() => setIsBoardModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Member
              </button>
            </div>

            {boardMembers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-users text-4xl mb-4"></i>
                <p>No board members added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boardMembers.map((member) =>
                  renderMemberCard(
                    member,
                    () => member._id && handleDeleteBoard(member._id),
                    'board member'
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Advisors Tab */}
        {activeTab === 'advisors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-user-graduate text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Advisors</h2>
              </div>
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Advisor
              </button>
            </div>

            {advisors.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-user-tie text-4xl mb-4"></i>
                <p>No advisors added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advisors.map((member) =>
                  renderMemberCard(
                    member,
                    () => member._id && handleDeleteAdvisor(member._id),
                    'advisor'
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Hub Governing Body Tab */}
        {activeTab === 'hub-governing-body' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-users-cog text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Hub Governing Body</h2>
              </div>
              <button
                onClick={() => setIsGoverningBodyModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Member
              </button>
            </div>

            {governingBodyMembers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-building text-4xl mb-4"></i>
                <p>No members added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {governingBodyMembers.map((member) =>
                  renderMemberCard(
                    member,
                    () => member._id && handleDeleteGoverningBody(member._id),
                    'member'
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* iHub Team Tab */}
        {activeTab === 'ihub-team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-users text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">iHub Team</h2>
              </div>
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Member
              </button>
            </div>

            {teamMembers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-users text-4xl mb-4"></i>
                <p>No team members added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) =>
                  renderMemberCard(
                    member,
                    () => member._id && handleDeleteTeam(member._id),
                    'team member'
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Affiliated Faculty Tab */}
        {activeTab === 'affiliated-faculty' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <i className="fas fa-chalkboard-teacher text-primary text-lg"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Affiliated Faculty</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFacultyProjectModalOpen(true)}
                  className="px-5 py-2.5 text-primary transition-all duration-300 border-2 border-primary rounded-xl hover:bg-primary/10 hover:shadow-md font-semibold"
                >
                  <i className="fas fa-folder-plus mr-2"></i>
                  Add Project
                </button>
                <button
                  onClick={() => setIsFacultyMemberModalOpen(true)}
                  className="px-5 py-2.5 text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Member
                </button>
              </div>
            </div>

            {projects.length === 0 && facultyMembers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-chalkboard-teacher text-4xl mb-4"></i>
                <p>No projects or faculty members added yet</p>
              </div>
            ) : (
              <div className="space-y-8">
                {projects.map((project) => {
                  const projectMembers = facultyMembers.filter(m => m.projectId?.toString() === project._id?.toString())
                  return (
                    <div key={project.id} className="glass-strong rounded-xl p-6 border-2 border-primary/10">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary">{project.name}</h3>
                          {project.description && (
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => project._id && handleDeleteProject(project._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Delete Project
                        </button>
                      </div>
                      {projectMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {projectMembers.map((member) =>
                            renderMemberCard(
                              member,
                              () => member._id && handleDeleteFaculty(member._id),
                              'faculty member'
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No members in this project</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {renderMemberModal(
        isBoardModalOpen,
        handleCloseBoardModal,
        handleBoardSubmit,
        boardFormData,
        boardImagePreview,
        setBoardFormData,
        setBoardImagePreview,
        'Board Member'
      )}

      {renderMemberModal(
        isAdvisorModalOpen,
        handleCloseAdvisorModal,
        handleAdvisorSubmit,
        advisorFormData,
        advisorImagePreview,
        setAdvisorFormData,
        setAdvisorImagePreview,
        'Advisor'
      )}

      {renderMemberModal(
        isGoverningBodyModalOpen,
        handleCloseGoverningBodyModal,
        handleGoverningBodySubmit,
        governingBodyFormData,
        governingBodyImagePreview,
        setGoverningBodyFormData,
        setGoverningBodyImagePreview,
        'Governing Body Member'
      )}

      {renderMemberModal(
        isTeamModalOpen,
        handleCloseTeamModal,
        handleTeamSubmit,
        teamFormData,
        teamImagePreview,
        setTeamFormData,
        setTeamImagePreview,
        'Team Member'
      )}

      {/* Faculty Project Modal */}
      {isFacultyProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
              <button
                onClick={() => setIsFacultyProjectModalOpen(false)}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleFacultyProjectSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={facultyProjectFormData.name}
                  onChange={(e) => handleInputChange(e, setFacultyProjectFormData)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={facultyProjectFormData.description}
                  onChange={(e) => handleInputChange(e, setFacultyProjectFormData)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter project description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFacultyProjectModalOpen(false)}
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

      {/* Faculty Member Modal */}
      {isFacultyMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Add Faculty Member</h2>
              <button
                onClick={handleCloseFacultyMemberModal}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleFacultyMemberSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectId"
                  required
                  value={facultyMemberFormData.projectId}
                  onChange={(e) => handleInputChange(e, setFacultyMemberFormData)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={facultyMemberFormData.name}
                  onChange={(e) => handleInputChange(e, setFacultyMemberFormData)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFacultyMemberFormData, setFacultyImagePreview)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {facultyImagePreview && (
                  <div className="mt-3">
                    <img src={facultyImagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover border-2 border-primary/20" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={facultyMemberFormData.linkedinUrl}
                  onChange={(e) => handleInputChange(e, setFacultyMemberFormData)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={facultyMemberFormData.description}
                  onChange={(e) => handleInputChange(e, setFacultyMemberFormData)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseFacultyMemberModal}
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

