// src/app/admin/gallery/page.tsx
'use client'

import { useState, useRef } from 'react'
import { Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface GalleryItem {
  id: string
  title: string
  url: string
  type: string
  category: string
  createdAt: string
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Général')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title || file.name)
    formData.append('category', category)

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData })
      if (res.ok) {
        const item = await res.json()
        setItems((prev) => [item, ...prev])
        setTitle('')
        if (fileRef.current) fileRef.current.value = ''
        toast.success('Fichier uploadé avec succès !')
      } else {
        toast.error('Erreur lors de l\'upload.')
      }
    } catch {
      toast.error('Erreur de connexion.')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet élément ?')) return
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast.success('Élément supprimé.')
    } else {
      toast.error('Erreur lors de la suppression.')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--color-text)' }}>
          Galerie
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Gérez les photos et vidéos de CEJEC.
        </p>
      </div>

      {/* Upload form */}
      <div className="card p-6 mb-8">
        <h2 className="font-bold font-display mb-4" style={{ color: 'var(--color-text)' }}>
          Ajouter un fichier
        </h2>
        <form onSubmit={handleUpload} className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Titre</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'image" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
              {['Général', 'Événements', 'Vie Étudiante', 'Cérémonies', 'Campus'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Fichier *</label>
            <input ref={fileRef} type="file" accept="image/*,video/*" required
              className="input-field text-sm py-2" />
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={uploading} className="btn-primary disabled:opacity-60">
              {uploading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Upload en cours...</>
                : <><Upload className="w-4 h-4" /> Uploader</>}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery grid */}
      {items.length === 0 ? (
        <div className="card p-16 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: 'var(--color-text-muted)' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>
            Aucun fichier dans la galerie. Commencez par uploader une image.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="card overflow-hidden group relative">
              <img src={item.url} alt={item.title}
                className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleDelete(item.id)}
                  className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
