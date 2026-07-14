'use client'

import { useState, useEffect } from 'react'

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
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          {copyright || `© ${new Date().getFullYear()} AraZhar. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
