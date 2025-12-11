'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProgramAdmin() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to first tab by default
    router.push('/admin/program/skill-development')
  }, [router])

  return (
    <div className="text-center py-12 text-gray-500">
      <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
      <p>Redirecting...</p>
    </div>
  )
}

