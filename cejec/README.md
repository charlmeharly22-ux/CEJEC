# 🎓 CEJEC — Site Web Institutionnel

**Centre d'Excellence pour la Jeunesse et l'Éducation en Haïti**

Site web complet Next.js 14 avec backend intégré, tableau de bord administrateur, gestion des candidatures, galerie média et bien plus.

---

## 🛠️ Stack Technologique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) |
| Styles | Tailwind CSS |
| Animations | Framer Motion |
| Base de données | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (JWT) |
| Uploads | Cloudinary |
| Email | Nodemailer (SMTP/Gmail) |
| Forms | React Hook Form + Zod |
| Toast | React Hot Toast |

---

## 📁 Structure du Projet

```
cejec/
├── prisma/
│   ├── schema.prisma        # Schéma complet de la BDD
│   └── seed.js              # Données initiales
├── src/
│   ├── app/                 # Pages (App Router)
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── about/           # À Propos
│   │   ├── governance/      # Gouvernance
│   │   ├── etudes/          # Études & Formation
│   │   │   ├── formation/   # Offre de formation
│   │   │   ├── admission/   # Formulaire candidature
│   │   │   └── resultats/   # Résultats académiques
│   │   ├── actualites/      # Actualités & Galerie
│   │   ├── contact/         # Page contact
│   │   ├── admin/           # Dashboard admin (protégé)
│   │   │   ├── page.tsx     # Vue d'ensemble
│   │   │   ├── admissions/  # Gestion candidatures
│   │   │   ├── messages/    # Messages de contact
│   │   │   ├── posts/       # Publications
│   │   │   ├── gallery/     # Galerie média
│   │   │   └── results/     # Résultats étudiants
│   │   └── api/             # API Routes
│   │       ├── auth/        # NextAuth
│   │       ├── contact/     # Contact form
│   │       ├── admissions/  # Candidatures
│   │       ├── news/        # Publications
│   │       ├── results/     # Résultats
│   │       ├── gallery/     # Upload média
│   │       └── newsletter/  # Abonnements
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Sections de page
│   │   ├── ui/              # Composants UI
│   │   └── admin/           # Composants admin
│   └── lib/
│       ├── prisma.ts        # Client Prisma
│       ├── auth.ts          # NextAuth config
│       └── email.ts         # Nodemailer helper
├── .env.example             # Template variables d'env
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🚀 Installation & Démarrage Local

### Prérequis

- Node.js 18+ et npm
- PostgreSQL 14+ (ou compte Supabase/Neon gratuit)
- Compte Cloudinary (gratuit)
- Compte Gmail avec mot de passe d'application

### 1. Cloner et installer

```bash
git clone https://github.com/votre-org/cejec-website.git
cd cejec-website
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Remplissez `.env.local` avec vos valeurs :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/cejec_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-cle-secrete-au-moins-32-chars"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"

# Email (Gmail)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="votre@gmail.com"
EMAIL_PASS="votre-app-password"
EMAIL_FROM="CEJEC <noreply@cejec.edu.ht>"
EMAIL_TO="admin@cejec.edu.ht"

# Admin par défaut
ADMIN_EMAIL="admin@cejec.edu.ht"
ADMIN_PASSWORD="MotDePasseSecurise@2024"
```

### 3. Configurer la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# Insérer les données initiales
npm run db:seed
```

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

**Admin dashboard :** [http://localhost:3000/admin](http://localhost:3000/admin)
- Email : `admin@cejec.edu.ht`
- Mot de passe : `MotDePasseSecurise@2024` *(changez après connexion !)*

---

## 🗄️ Base de Données

### Explorer avec Prisma Studio

```bash
npm run db:studio
# Ouvre http://localhost:5555
```

### Réinitialiser la BDD

```bash
npx prisma db push --force-reset
npm run db:seed
```

---

## 📧 Configuration Email Gmail

1. Activez la validation en 2 étapes sur votre compte Gmail
2. Allez dans **Paramètres → Sécurité → Mots de passe des applications**
3. Générez un mot de passe d'application pour "Mail"
4. Utilisez ce mot de passe dans `EMAIL_PASS`

---

## ☁️ Déploiement

### Option A — Vercel (Recommandé)

```bash
npm install -g vercel
vercel --prod
```

Configurez les variables d'environnement dans le dashboard Vercel.

**Base de données :** Utilisez [Neon](https://neon.tech) ou [Supabase](https://supabase.com) (PostgreSQL gratuit compatible Prisma).

### Option B — VPS / Self-hosted

```bash
# Build
npm run build

# Lancer en production
npm start
# ou avec PM2
pm2 start npm --name "cejec" -- start

# Nginx reverse proxy
# Pointez vers http://localhost:3000
```

### Option C — Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔐 Sécurité en Production

1. **Changez NEXTAUTH_SECRET** avec une clé aléatoire forte :
   ```bash
   openssl rand -base64 32
   ```
2. **Changez le mot de passe admin** après la première connexion
3. **HTTPS obligatoire** — utilisez Vercel ou configurez Let's Encrypt
4. **Rate limiting** — ajoutez `next-rate-limit` sur les routes API publiques
5. **CORS** — configurez dans `next.config.js` si nécessaire

---

## ✨ Fonctionnalités Implémentées

### Frontend
- [x] Page d'accueil avec hero animé, stats, programmes, témoignages
- [x] Section À Propos avec timeline historique
- [x] Page Gouvernance (Direction, Coordination, Comité, Règlement)
- [x] Offre de Formation (4 programmes détaillés)
- [x] Formulaire d'admission multi-étapes avec validation
- [x] Consultation des résultats académiques
- [x] Actualités, Communiqués, Activités
- [x] Galerie photo avec masonry grid
- [x] Page Contact avec carte et horaires
- [x] Mode sombre/clair
- [x] Fully responsive (mobile/tablet/desktop)
- [x] Animations Framer Motion

### Backend / API
- [x] REST API complète (Contact, Admissions, News, Gallery, Results, Newsletter)
- [x] Authentification JWT (NextAuth)
- [x] Upload Cloudinary
- [x] Emails automatiques (Nodemailer)
- [x] Validation Zod sur toutes les routes

### Admin Dashboard
- [x] Tableau de bord avec statistiques en temps réel
- [x] Gestion des candidatures (CRUD + statuts)
- [x] Consultation et réponse aux messages
- [x] Gestion de la galerie (upload/suppression)
- [x] Accès protégé par authentification

---

## 🎨 Design System

**Palette de couleurs :**
- Bleu principal : `#1a2980`
- Cyan accent : `#26d0ce`
- Or accent : `#ffc61a`

**Typographie :**
- Titres : Playfair Display (serif)
- Corps : DM Sans (sans-serif)
- Code : DM Mono

---

## 📞 Support

Pour toute question sur l'installation ou le déploiement :
- Email : dev@cejec.edu.ht
- Documentation : Ce README + commentaires dans le code

---

*Développé avec ❤️ pour CEJEC — Haïti*
