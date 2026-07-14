'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CVCard from '@/components/CVCard'

export default function CVPage() {
  const { slug } = useParams()
  const [cv, setCV] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/api/cv')
      .then((r) => r.json())
      .then((list) => {
        const found = list.find((item) => item.slug === slug)
        if (found) setCV(found)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">CV tidak ditemukan</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-black underline">
          Kembali ke beranda
        </Link>
      </div>
    )
  }

  if (!cv) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center text-gray-400">Memuat...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-black mb-6 transition"
      >
        <ArrowLeft size={14} />
        Kembali ke beranda
      </Link>
      <CVCard cv={cv} />
    </div>
  )
}
