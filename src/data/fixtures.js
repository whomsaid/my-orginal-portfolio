/**
 * PORTFOLIO CONTENT FIXTURES
 * ---------------------------------------------------------------------------
 * The single source of portfolio content until the admin API exists
 * (see PLAN.md, milestones 2–4). Every component reads this through
 * `usePortfolio()` in ./usePortfolio.js. When the backend ships, the hook
 * fetches `/api/public/portfolio` and this file goes away.
 *
 * RULE: only real information supplied by Hakizimana Xavine lives here.
 * Unknown facts (email, GitHub, LinkedIn, education, certifications,
 * skills, screenshots, CV) stay empty, so the UI shows empty states
 * instead of invented content.
 *
 * Translatable strings use the shape { en, rw, fr }. Read them with
 * `pick(value, lang)` from ../i18n/I18nProvider.jsx.
 */

export const portfolio = {
  profile: {
    fullName: 'Hakizimana Xavine',
    monogram: 'HX',
    title: { en: 'Full-Stack Developer', rw: 'Umuhanga mu Ikoranabuhanga rya Full-Stack', fr: 'Développeur Full-Stack' },
    roles: [
      { en: 'Full-Stack Developer', rw: 'Umuhanga wa Full-Stack', fr: 'Développeur Full-Stack' },
      { en: 'Problem Solver', rw: 'Ukemura Ibibazo', fr: 'Résolveur de problèmes' },
      { en: 'Innovator', rw: 'Uhanga Udushya', fr: 'Innovateur' },
    ],
    tagline: {
      en: 'Building digital solutions. Solving real problems. Innovating for the future.',
      rw: "Kubaka ibisubizo by'ikoranabuhanga. Gukemura ibibazo nyabyo. Guhanga udushya tw'ejo hazaza.",
      fr: "Créer des solutions numériques. Résoudre de vrais problèmes. Innover pour l'avenir.",
    },
    location: { city: 'Kigali', country: 'Rwanda', timezone: 'Africa/Kigali' },
    photoUrl: null, // uploaded from the dashboard (Profile Management)
    cvUrl: null, // uploaded from the dashboard (CV Management) — Download CV shows only when set
    availability: {
      available: true,
      label: {
        en: 'Available for new projects',
        rw: 'Niteguye imishinga mishya',
        fr: 'Disponible pour de nouveaux projets',
      },
    },
  },

  identities: [
    {
      key: 'developer',
      icon: 'code',
      title: { en: 'Developer', rw: 'Umwubatsi wa Porogaramu', fr: 'Développeur' },
      description: {
        en: 'I design, develop, and maintain modern software applications using suitable technologies to create reliable digital solutions.',
        rw: "Ntegura, nkora kandi nkita ku porogaramu za mudasobwa zigezweho, nkoresheje ikoranabuhanga rikwiye kugira ngo nubake ibisubizo by'ikoranabuhanga byizewe.",
        fr: 'Je conçois, développe et maintiens des applications logicielles modernes avec les technologies adaptées pour créer des solutions numériques fiables.',
      },
    },
    {
      key: 'problem-solver',
      icon: 'puzzle',
      title: { en: 'Problem Solver', rw: 'Ukemura Ibibazo', fr: 'Résolveur de problèmes' },
      description: {
        en: 'I develop applications that address real-world problems, improve productivity, and make everyday activities easier.',
        rw: "Nkora porogaramu zikemura ibibazo byo mu buzima busanzwe, zongera umusaruro kandi zoroshya ibikorwa bya buri munsi.",
        fr: 'Je développe des applications qui répondent à des problèmes concrets, améliorent la productivité et facilitent les activités quotidiennes.',
      },
    },
    {
      key: 'innovator',
      icon: 'lightbulb',
      title: { en: 'Innovator', rw: 'Uhanga Udushya', fr: 'Innovateur' },
      description: {
        en: 'I explore emerging technologies and develop creative solutions that contribute to the future of technology.',
        rw: "Ngenzura ikoranabuhanga rishya kandi nkora ibisubizo bihanga udushya bigira uruhare mu hazaza h'ikoranabuhanga.",
        fr: "J'explore les technologies émergentes et développe des solutions créatives qui contribuent à l'avenir de la technologie.",
      },
    },
  ],

  about: {
    paragraphs: [
      {
        en: "I'm Hakizimana Xavine, a full-stack developer based in Kigali, Rwanda. I work as a developer, a problem solver and an innovator — three roles that shape how I approach every project.",
        rw: "Nitwa Hakizimana Xavine, umuhanga mu gukora porogaramu za full-stack utuye i Kigali, mu Rwanda. Nkora nk'umwubatsi wa porogaramu, ukemura ibibazo kandi uhanga udushya — inshingano eshatu ziyobora uburyo nkora buri mushinga.",
        fr: "Je suis Hakizimana Xavine, développeur full-stack basé à Kigali, au Rwanda. Je travaille en tant que développeur, résolveur de problèmes et innovateur — trois rôles qui guident ma façon d'aborder chaque projet.",
      },
      {
        en: 'My interests span software development, coding, research and technology: building complete applications from the interface to the database, and exploring how new tools can solve problems people actually face.',
        rw: "Nshishikajwe no gukora porogaramu, kwandika code, ubushakashatsi n'ikoranabuhanga: kubaka porogaramu zuzuye kuva ku isura kugeza ku bubiko bw'amakuru, no gusuzuma uko ibikoresho bishya byakemura ibibazo abantu bahura na byo.",
        fr: "Mes centres d'intérêt couvrent le développement logiciel, la programmation, la recherche et la technologie : construire des applications complètes, de l'interface à la base de données, et explorer comment de nouveaux outils peuvent résoudre des problèmes concrets.",
      },
    ],
    goals: {
      en: 'My goal is to keep building reliable digital products that make everyday work easier, and to contribute to the future of technology.',
      rw: "Intego yanjye ni ugukomeza kubaka ibikoresho by'ikoranabuhanga byizewe byoroshya akazi ka buri munsi, no kugira uruhare mu hazaza h'ikoranabuhanga.",
      fr: "Mon objectif est de continuer à créer des produits numériques fiables qui simplifient le travail quotidien, et de contribuer à l'avenir de la technologie.",
    },
    interests: [
      { icon: 'code', label: { en: 'Software development', rw: 'Gukora porogaramu', fr: 'Développement logiciel' } },
      { icon: 'terminal', label: { en: 'Coding', rw: 'Kwandika code', fr: 'Programmation' } },
      { icon: 'flask', label: { en: 'Research', rw: 'Ubushakashatsi', fr: 'Recherche' } },
      { icon: 'cpu', label: { en: 'Technology', rw: 'Ikoranabuhanga', fr: 'Technologie' } },
    ],
  },

  // Skills are added from the dashboard (name, icon, optional level/description).
  // Categories are fixed by the brief; `skills` stays empty until real entries exist.
  skillCategories: [
    { key: 'frontend', icon: 'monitor', name: { en: 'Frontend Development', rw: "Isura ya Porogaramu (Frontend)", fr: 'Développement Frontend' }, skills: [] },
    { key: 'backend', icon: 'server', name: { en: 'Backend Development', rw: 'Inyuma ya Porogaramu (Backend)', fr: 'Développement Backend' }, skills: [] },
    { key: 'database', icon: 'database', name: { en: 'Database Management', rw: "Gucunga Ububiko bw'Amakuru", fr: 'Gestion de bases de données' }, skills: [] },
    { key: 'languages', icon: 'terminal', name: { en: 'Programming Languages', rw: 'Indimi za Porogaramu', fr: 'Langages de programmation' }, skills: [] },
    { key: 'devops', icon: 'workflow', name: { en: 'DevOps and Tools', rw: 'DevOps n’Ibikoresho', fr: 'DevOps et outils' }, skills: [] },
    { key: 'design', icon: 'pen', name: { en: 'UI/UX and Design', rw: 'UI/UX n’Igishushanyo', fr: 'UI/UX et design' }, skills: [] },
    { key: 'emerging', icon: 'sparkles', name: { en: 'Emerging Technologies', rw: 'Ikoranabuhanga Rishya', fr: 'Technologies émergentes' }, skills: [] },
  ],

  projects: [
    {
      id: 'buildconnect-rwanda',
      name: 'BuildConnect Rwanda',
      category: { en: 'Construction marketplace', rw: "Isoko ry'ubwubatsi", fr: 'Marketplace de construction' },
      description: {
        en: 'A construction marketplace designed to connect customers with construction-related services, suppliers, materials, equipment, and professionals.',
        rw: "Isoko ry'ubwubatsi rigamije guhuza abakiriya na serivisi zijyanye n'ubwubatsi, abacuruzi, ibikoresho, imashini n'abanyamwuga.",
        fr: 'Une marketplace de construction conçue pour relier les clients aux services, fournisseurs, matériaux, équipements et professionnels du bâtiment.',
      },
      features: [],
      technologies: [],
      url: 'https://rwandabuildltd.vercel.app/',
      githubUrl: null,
      status: 'live', // manual status set in the dashboard — always wins over health checks
      featured: true,
      screenshots: [], // uploaded from the dashboard; first item is the main screenshot
      health: null, // { state: 'up' | 'down', checkedAt, lastUpAt } from the backend monitor
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 'biztradeafrica',
      name: 'BizTradeAfrica',
      category: { en: 'Business management platform', rw: "Urubuga rwo gucunga ubucuruzi", fr: 'Plateforme de gestion d’entreprise' },
      description: {
        en: 'A business management platform intended to help businesses manage their operations and activities.',
        rw: "Urubuga rwo gucunga ubucuruzi rugamije gufasha ibigo gucunga imikorere n'ibikorwa byabyo.",
        fr: 'Une plateforme de gestion destinée à aider les entreprises à piloter leurs opérations et leurs activités.',
      },
      features: [],
      technologies: [],
      url: 'https://biztradeafrica.ai.studio/',
      githubUrl: null,
      status: 'in_development',
      featured: true,
      screenshots: [],
      health: null,
      createdAt: null,
      updatedAt: null,
    },
  ],

  services: [
    {
      key: 'web',
      icon: 'globe',
      title: { en: 'Website Development', rw: "Gukora Imbuga za Interineti", fr: 'Développement de sites web' },
      description: {
        en: 'Fast, responsive websites that work on every screen, from landing pages to content-rich sites.',
        rw: "Imbuga zihuta kandi zikora neza kuri buri gikoresho, kuva ku mpapuro zo kwamamaza kugeza ku mbuga zifite ibirimo byinshi.",
        fr: 'Des sites rapides et responsives qui fonctionnent sur tous les écrans, de la landing page au site riche en contenu.',
      },
    },
    {
      key: 'fullstack',
      icon: 'layers',
      title: { en: 'Full-Stack Application Development', rw: 'Gukora Porogaramu za Full-Stack', fr: "Développement d'applications full-stack" },
      description: {
        en: 'Complete web applications — interface, server, database and deployment — built as one coherent product.',
        rw: "Porogaramu zuzuye — isura, seriveri, ububiko bw'amakuru no kuzishyira ku murongo — zubatswe nk'igicuruzwa kimwe gihuje.",
        fr: 'Des applications web complètes — interface, serveur, base de données et déploiement — conçues comme un produit cohérent.',
      },
    },
    {
      key: 'database',
      icon: 'database',
      title: { en: 'Database Design', rw: "Gutegura Ububiko bw'Amakuru", fr: 'Conception de bases de données' },
      description: {
        en: 'Normalized, indexed data models that keep information consistent and queries fast as the product grows.',
        rw: "Imiterere y'amakuru itunganye ituma amakuru ahora ari ukuri kandi ibibazo bigasubizwa vuba uko porogaramu ikura.",
        fr: 'Des modèles de données normalisés et indexés qui gardent l’information cohérente et les requêtes rapides.',
      },
    },
    {
      key: 'api',
      icon: 'plug',
      title: { en: 'API Development and Integration', rw: 'Gukora no Guhuza API', fr: "Développement et intégration d'API" },
      description: {
        en: 'Secure REST APIs and integrations that connect your application to payment, messaging and third-party services.',
        rw: "API zizewe no guhuza porogaramu yawe na serivisi zo kwishyura, ubutumwa n'izindi serivisi.",
        fr: 'Des API REST sécurisées et des intégrations qui relient votre application aux services de paiement, de messagerie et tiers.',
      },
    },
    {
      key: 'maintenance',
      icon: 'wrench',
      title: { en: 'Software Maintenance', rw: 'Kwita kuri Porogaramu', fr: 'Maintenance logicielle' },
      description: {
        en: 'Bug fixes, updates and performance improvements that keep existing software reliable over time.',
        rw: "Gukosora amakosa, kuvugurura no kunoza imikorere kugira ngo porogaramu zisanzwe zikomeze kwizerwa.",
        fr: 'Corrections, mises à jour et optimisations qui gardent vos logiciels fiables dans la durée.',
      },
    },
    {
      key: 'uiux',
      icon: 'pen',
      title: { en: 'UI/UX Implementation', rw: 'Gushyira mu Bikorwa UI/UX', fr: 'Intégration UI/UX' },
      description: {
        en: 'Turning designs into accessible, pixel-accurate interfaces with smooth, purposeful interactions.',
        rw: "Guhindura ibishushanyo isura igera kuri bose, isobanutse kandi ifite imikoranire yoroshye.",
        fr: 'Transformer des maquettes en interfaces accessibles et précises, avec des interactions fluides.',
      },
    },
    {
      key: 'consulting',
      icon: 'brain',
      title: { en: 'Technical Consulting', rw: "Inama mu by'Ikoranabuhanga", fr: 'Conseil technique' },
      description: {
        en: 'Guidance on architecture, technology choices and planning before you commit time and budget.',
        rw: "Inama ku miterere ya porogaramu, guhitamo ikoranabuhanga no gutegura mbere yo gushora igihe n'amafaranga.",
        fr: "Des conseils sur l'architecture, le choix des technologies et la planification avant d'engager temps et budget.",
      },
    },
  ],

  research: [], // { id, title, description, coverUrl, content, publishedAt, category }

  education: [], // { id, kind: 'education'|'certification'|'course'|'training'|'achievement', title, institution, startDate, endDate, description, credentialUrl }

  contact: {
    whatsapp: ['0792428612', '0722551600'],
    email: null,
  },

  socials: [], // { platform: 'github'|'linkedin'|'x'|'facebook'|'instagram'|'youtube'|'website', url }
}
