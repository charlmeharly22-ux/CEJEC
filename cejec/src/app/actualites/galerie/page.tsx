// src/app/actualites/galerie/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Galerie photo et vidéo de CEJEC.',
}

// Placeholder gallery items - in production fetched from DB/Cloudinary
const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `Photo ${i + 1}`,
  category: i % 3 === 0 ? 'Événements' : i % 3 === 1 ? 'Vie Étudiante' : 'Cérémonies',
  type: 'IMAGE',
  url: `https://images.unsplash.com/photo-${[
    '1523050854058-8df90110c9f1',
    '1541339907198-e08756dedf3f',
    '1571260899304-425eee4c7efd',
    '1540575467063-178a50c2df87',
    '1529156069898-49953e39b3ac',
    '1459257831348-f0cdd359235f',
    '1531545514256-b1400bc00f31',
    '1523580494863-6f3031224c2b',
    '1434030216411-0b793f4b4173',
    '1513258496099-48168024aec0',
    '1504384308090-c894fdcc538d',
    '1488190211105-8b0e65b80b4e',
  ][i % 12]}?w=600&q=80`,
}))

const categories = ['Tout', 'Événements', 'Vie Étudiante', 'Cérémonies']

export default function GalleriePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Galerie</h1>
          <p className="text-lg text-white/70">Photos et vidéos de la vie à CEJEC.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button key={cat}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: cat === 'Tout' ? 'linear-gradient(135deg, #1a2980, #26d0ce)' : 'var(--color-surface-2)',
                color: cat === 'Tout' ? '#fff' : 'var(--color-text-muted)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div key={item.id}
              className="break-inside-avoid card overflow-hidden cursor-pointer group mb-4">
              <div className="relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(10,13,26,0.85), transparent)' }}>
                  <p className="text-white text-xs font-medium">{item.title}</p>
                  <span className="text-white/60 text-xs">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
