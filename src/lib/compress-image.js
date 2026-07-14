/**
 * Client-side image compression before upload
 * Compresses if file > MAX_BYTES before upload to CF Workers (max 10MB)
 */
const MAX_BYTES = 2 * 1024 * 1024  // 2MB — compress if bigger
const MAX_DIM = 2048               // max width/height

export function needsCompress(file) {
  return file.size > MAX_BYTES && file.type.startsWith('image/') && file.type !== 'image/gif'
}

export function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!needsCompress(file)) return resolve(file)

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.src = url
    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img
      // Downscale if too big
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Determine output format — prefer WebP (smaller), fallback to JPEG
      const type = file.type === 'image/png' ? 'image/webp' : (file.type === 'image/avif' ? 'image/webp' : 'image/jpeg')
      const quality = file.size > 5 * 1024 * 1024 ? 0.6 : 0.8

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Compression failed'))
          const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type })
          resolve(compressedFile)
        },
        type,
        quality
      )
    }
    img.onerror = () => reject(new Error('Failed to load image'))
  })
}
