'use client'

import { useState, useEffect } from 'react'
import SocialLinks from '@/components/SocialLinks'

export default function Footer() {
  const [copyright, setCopyright] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((s) => {
        if (s.copyright_text) {
          setCopyright(s.copyright_text.replace('{year}', String(new Date().getFullYear())))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="border-t py-6">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          {copyright || `© ${new Date().getFullYear()} AraZhar. All rights reserved.`}
        </p>
        <SocialLinks />
      </div>
    </footer>
  )
}
