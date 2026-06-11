// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding CEJEC database...')

  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@2024!', 12)
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@cejec.edu.ht' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@cejec.edu.ht',
      password: hashedPassword,
      name: 'Administrateur CEJEC',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Stats
  await prisma.stat.createMany({
    skipDuplicates: true,
    data: [
      { label: 'Étudiants formés', value: '2500+', icon: 'GraduationCap', order: 1 },
      { label: 'Programmes offerts', value: '15+', icon: 'BookOpen', order: 2 },
      { label: 'Années d\'expérience', value: '20+', icon: 'Calendar', order: 3 },
      { label: 'Partenaires', value: '30+', icon: 'Handshake', order: 4 },
    ],
  })
  console.log('✅ Stats seeded')

  // Programs
  await prisma.program.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Licence en Administration des Affaires',
        code: 'LAA',
        description: 'Formation complète en gestion et administration des entreprises pour les futurs leaders du monde des affaires haïtien.',
        duration: '4 ans',
        level: 'Licence',
        diploma: 'Licence en Administration des Affaires (LAA)',
        requirements: ['Baccalauréat ou équivalent', 'Test d\'admission', 'Dossier complet'],
      },
      {
        name: 'Licence en Comptabilité',
        code: 'LCO',
        description: 'Programme rigoureux en comptabilité, finance et fiscalité, préparant des professionnels compétents pour le marché haïtien.',
        duration: '4 ans',
        level: 'Licence',
        diploma: 'Licence en Comptabilité (LCO)',
        requirements: ['Baccalauréat ou équivalent', 'Test d\'admission', 'Dossier complet'],
      },
      {
        name: 'Licence en Informatique de Gestion',
        code: 'LIG',
        description: 'Alliance entre les technologies de l\'information et la gestion d\'entreprise pour les professionnels du numérique.',
        duration: '4 ans',
        level: 'Licence',
        diploma: 'Licence en Informatique de Gestion (LIG)',
        requirements: ['Baccalauréat ou équivalent', 'Test d\'admission', 'Bases en mathématiques'],
      },
      {
        name: 'Certificat en Gestion de Projet',
        code: 'CGP',
        description: 'Formation pratique et intensive en gestion de projets selon les standards internationaux (PMI, Agile).',
        duration: '6 mois',
        level: 'Certificat',
        diploma: 'Certificat en Gestion de Projet',
        requirements: ['Diplôme d\'études secondaires', 'Expérience professionnelle appréciée'],
      },
    ],
  })
  console.log('✅ Programs seeded')

  // Partners
  await prisma.partner.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Ministère de l\'Éducation Nationale', logo: '/images/partners/men.png', order: 1 },
      { name: 'Université d\'État d\'Haïti', logo: '/images/partners/ueh.png', order: 2 },
      { name: 'Banque de la République d\'Haïti', logo: '/images/partners/brh.png', order: 3 },
    ],
  })
  console.log('✅ Partners seeded')

  // Testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Marie-Josée Pierre',
        role: 'Diplômée en Administration des Affaires, Promotion 2022',
        content: 'CEJEC m\'a donné les outils nécessaires pour réussir dans le monde des affaires. Les professeurs sont dévoués et l\'environnement d\'apprentissage est exceptionnel.',
        rating: 5,
      },
      {
        name: 'Jean-Baptiste Dupont',
        role: 'Étudiant en Comptabilité, 3ème année',
        content: 'La qualité de l\'enseignement ici est remarquable. Le curriculum est moderne et adapté aux réalités du marché haïtien. Je recommande vivement CEJEC.',
        rating: 5,
      },
      {
        name: 'Claudette Morales',
        role: 'Diplômée en Informatique de Gestion, Promotion 2021',
        content: 'Grâce à CEJEC, j\'ai pu intégrer une grande entreprise de télécommunications. La formation pratique et les stages ont été déterminants pour ma carrière.',
        rating: 5,
      },
    ],
  })
  console.log('✅ Testimonials seeded')

  // Sample news posts
  await prisma.post.create({
    data: {
      title: 'CEJEC lance son programme de formation continue pour 2024',
      slug: 'cejec-programme-formation-continue-2024',
      excerpt: 'CEJEC est fier d\'annoncer le lancement de nouveaux programmes de formation continue destinés aux professionnels en activité.',
      content: '<p>CEJEC est heureux d\'annoncer le lancement de son nouveau programme de formation continue pour l\'année académique 2024-2025. Ces programmes sont spécialement conçus pour les professionnels souhaitant améliorer leurs compétences...</p>',
      category: 'NEWS',
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
      tags: ['Formation', 'Annonce', '2024'],
    },
  })
  console.log('✅ Sample post created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
