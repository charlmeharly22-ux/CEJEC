// src/app/actualites/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Newspaper, Video, Image, Megaphone, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Toutes les actualités, communiqués, activités et médias de CEJEC.',
}

const categories = [
  { label: 'Tout', value: 'all', icon: Newspaper },
  { label: 'Actualités', value: 'news', icon: Newspaper },
  { label: 'Communiqués', value: 'press', icon: Megaphone },
  { label: 'Activités', value: 'activity', icon: Activity },
  { label: 'Vidéos', value: 'video', icon: Video },
  { label: 'Galerie', value: 'gallery', icon: Image },
]

// Static sample posts - in production these come from DB
const posts = [
  {
    id: '1', slug: 'cejec-formation-continue-2024',
    title: 'CEJEC lance son programme de formation continue pour 2024-2025',
    excerpt: 'De nouveaux programmes flexibles destinés aux professionnels en activité souhaitant améliorer leurs compétences sans quitter leur emploi.',
    date: '2024-06-01', category: 'NEWS', readTime: '3 min',
    image: null, featured: true,
  },
  {
    id: '2', slug: 'ceremonie-remise-diplomes-2024',
    title: 'Cérémonie de remise de diplômes : Promotion 2024',
    excerpt: 'Plus de 150 nouveaux diplômés ont reçu leurs parchemins lors d\'une cérémonie solennelle en présence des autorités académiques et des familles.',
    date: '2024-05-20', category: 'ACTIVITY', readTime: '5 min',
    image: null, featured: true,
  },
  {
    id: '3', slug: 'partenariat-ccih',
    title: 'Nouveau partenariat avec la Chambre de Commerce et d\'Industrie d\'Haïti',
    excerpt: 'Ce partenariat stratégique permettra d\'offrir des stages et opportunités d\'emploi à nos étudiants dans les meilleures entreprises haïtiennes.',
    date: '2024-05-10', category: 'NEWS', readTime: '4 min',
    image: null, featured: false,
  },
  {
    id: '4', slug: 'ouverture-inscriptions',
    title: 'Ouverture des inscriptions pour l\'année académique 2024-2025',
    excerpt: 'CEJEC annonce l\'ouverture des inscriptions pour la nouvelle année académique avec de nouveaux programmes et des bourses disponibles.',
    date: '2024-04-15', category: 'PRESS_RELEASE', readTime: '2 min',
    image: null, featured: false,
  },
  {
    id: '5', slug: 'conference-entrepreneuriat',
    title: 'Conférence sur l\'entrepreneuriat en Haïti : Bilan et Perspectives',
    excerpt: 'CEJEC a organisé une conférence internationale réunissant entrepreneurs, académiques et décideurs autour des enjeux de l\'économie haïtienne.',
    date: '2024-04-02', category: 'ACTIVITY', readTime: '6 min',
    image: null, featured: false,
  },
  {
    id: '6', slug: 'resultats-session-janvier-2024',
    title: 'Publication des résultats — Session de Janvier 2024',
    excerpt: 'Les résultats de la session de janvier 2024 sont désormais disponibles. Consultez votre espace étudiant pour accéder à vos notes.',
    date: '2024-03-20', category: 'NEWS', readTime: '1 min',
    image: null, featured: false,
  },
]

const categoryColors: Record<string, string> = {
  NEWS: '#1a2980',
  PRESS_RELEASE: '#26d0ce',
  ACTIVITY: '#ffc61a',
  MEDIA: '#9c27b0',
  BLOG: '#00bcd4',
}

const categoryLabels: Record<string, string> = {
  NEWS: 'Actualité',
  PRESS_RELEASE: 'Communiqué',
  ACTIVITY: 'Activité',
  MEDIA: 'Média',
  BLOG: 'Blog',
}

export default function ActualitesPage() {
  const featured = posts.filter((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a2980, #0f1354)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Actualités</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Restez informé des dernières nouvelles, activités et annonces de CEJEC.
          </p>
        </div>
      </div>

      {/* Category quick links */}
      <div className="border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {categories.map(({ label, value, icon: Icon }) => (
              <Link key={value} href={value === 'all' ? '/actualites' : `/actualites/${value}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26,41,128,0.08)'
                  e.currentTarget.style.color = '#1a2980'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = ''
                  e.currentTarget.style.color = ''
                }}>
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured posts */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-display mb-6" style={{ color: 'var(--color-text)' }}>
              À la une
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <Link key={post.id} href={`/actualites/${post.slug}`}
                  className="card p-8 block group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge text-xs font-semibold px-3 py-1"
                      style={{ background: `${categoryColors[post.category]}12`, color: categoryColors[post.category] }}>
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {new Date(post.date).toLocaleDateString('fr-HT', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary-600 transition-colors leading-snug"
                    style={{ color: 'var(--color-text)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-muted)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:gap-3 transition-all">
                    Lire la suite <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All posts grid */}
        <div>
          <h2 className="text-2xl font-bold font-display mb-6" style={{ color: 'var(--color-text)' }}>
            Toutes les actualités
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/actualites/${post.slug}`}
                className="card p-6 block group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge text-xs px-2 py-1"
                    style={{ background: `${categoryColors[post.category]}12`, color: categoryColors[post.category] }}>
                    {categoryLabels[post.category]}
                  </span>
                </div>
                <h3 className="font-bold font-display leading-snug mb-2 group-hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--color-text)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('fr-HT', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
