'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page after 2 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary-dark">
      <div className="text-center px-4">
        <h1 className="text-9xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-white/80 mb-8 text-lg">
          The page you're looking for doesn't exist.
        </p>
        <p className="text-white/60 mb-6">
          Redirecting to home page in 2 seconds...
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          <i className="fas fa-home"></i>
          Go to Home
        </Link>
      </div>
    </div>
  )
}

