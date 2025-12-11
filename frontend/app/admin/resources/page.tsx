'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResourcesAdmin() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to first tab by default
    router.push('/admin/resources/newsletter')
  }, [router])

  return (
    <div className="text-center py-12 text-gray-500">
      <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
      <p>Redirecting...</p>
    </div>
  )
}

