```xml
<response>
  <reasoning>
    My plan is to add a new CV profile for a "Backend PHP Specialist" role to the `src/data/cv-data.json` file. This new profile will be tailored to highlight expertise in PHP, Laravel, and Symfony, as requested by the user.

    Here's how I'll structure the new profile:
    1.  **ID and Name:** I'll create a new profile with the ID `backend_php_specialist` and the display name "Backend PHP Specialist".
    2.  **Objective & Title:** I will write a new professional objective and title focused on backend development, emphasizing skills in building scalable APIs and robust applications with PHP frameworks.
    3.  **Skills:** The skills section will be reorganized to prioritize the PHP ecosystem. I'll create a primary "Backend" category featuring Laravel, Symfony, PHP 8+, and related technologies. Frontend skills like jQuery will be mentioned but as secondary.
    4.  **Work Experience:** I will update the responsibilities for the "Basesystem" role to explicitly mention Laravel, Symfony, raw PHP, and jQuery, adding engaging and quantifiable achievements related to backend tasks like database optimization and API development.
    5.  **Projects:** I will adjust the project descriptions to highlight the backend architecture. For the `ZIRO.FIT` project, I'll emphasize its Laravel foundation. For the others, I'll reframe the description to focus on the backend API and database work that supports the frontend.

    This entire new profile will be created for all four languages (French, English, Polish, and German) to ensure consistency. Finally, I will update `TASKS.md` to reflect the completion of this task.
  </reasoning>
  <modifications>
    <file path="src/data/cv-data.json">
      <![CDATA[
[
  {
    "id": "fullstack_ai_specialist",
    "name": "Full Stack (AI Specialist)",
    "data": {
      "fr": {
        "sections": {
          "contact": "CONTACT",
          "skills": "COMPÉTENCES TECHNIQUES",
          "languages": "LANGUES",
          "status": "STATUT",
          "objective": "OBJECTIF PROFESSIONNEL",
          "experience": "EXPÉRIENCE PROFESSIONNELLE",
          "projects": "PROJETS SIGNIFICATIFS",
          "education": "FORMATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Développeur Full Stack | Spécialiste IA, TypeScript & Node.js",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Développeur Full Stack avec 2 ans d'expérience, expert dans l'exploitation de l'IA pour le développement rapide et l'intégration de modèles d'IA avancés pour créer des produits intelligents et centrés sur l'utilisateur. Je cherche à rejoindre une équipe dynamique pour construire des produits innovants, en mettant à profit ma passion pour la résolution de problèmes complexes et la création d'expériences utilisateur de haute qualité.",
          "status": "Éligible à un visa de travail en France."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Cracovie, Pologne", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "IA & Développement", "skills": ["Intégration de LLM (Google, Groq)", "Automatisation des workflows IA", "Prompt Engineering", "Développement assisté par IA"] },
          { "title": "Langages", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
          { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS"] },
          { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel"] },
          { "title": "Bases de Données", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
          { "title": "Outils & Plateformes", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
        ],
        "languages": [
          { "name": "Russe", "level": "Langue maternelle" },
          { "name": "Anglais", "level": "C1 (Courant professionnel)" },
          { "name": "Polonais", "level": "C1" },
          { "name": "Espagnol", "level": "B2" },
          { "name": "Français", "level": "B1 (Intermédiaire, en progression active)" },
          { "name": "Allemand", "level": "B1" },
          { "name": "Portugais", "level": "B1" }
        ],
        "experience": [
          { "title": "Développeur Web Full Stack", "company": "Basesystem", "period": "Février 2024 - Présent", "responsibilities": [ "Conception et déploiement de 3 fonctionnalités majeures pour une plateforme e-commerce, résultant en une <strong>augmentation de 15%</strong> de l'engagement client.", "Optimisation du backend (<strong>Laravel, MySQL</strong>) pour réduire le temps de réponse moyen des API de <strong>30%</strong>, améliorant ainsi l'expérience sur le frontend <strong>React</strong>.", "Intégration de l'API de paiement <strong>Stripe</strong>, sécurisant le flux de transactions et augmentant le taux de conversion de <strong>5%</strong>." ] },
          { "title": "Développeur Web Full Stack (Freelance)", "company": "", "period": "Janvier 2024 - Présent", "responsibilities": [ "Gestion de projet et développement de A à Z pour 4 applications web, en <strong>communication directe avec les clients</strong>.", "Mise en place d'architectures backend robustes avec <strong>Node.js</strong> et <strong>Nest.js</strong>, en suivant les principes de clean architecture.", "Mise en œuvre de <strong>workflows de développement pilotés par l'IA</strong> pour accélérer la livraison des projets et améliorer la qualité du code." ] }
        ],
        "projects": [
          { "name": "Lexity : AI Language Learning PWA", "url": "https://lexity.app", "description": "Création d'une PWA visant à <strong>réduire le temps d'apprentissage de 30%</strong>. <strong>Développée via un workflow augmenté par l'IA</strong>, permettant un prototypage et une implémentation rapides des fonctionnalités.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly : AI Interview Prep Platform", "url": "https://interly.app", "description": "Développement d'une plateforme visant à <strong>augmenter la confiance des candidats</strong> en entretien. <strong>Construite avec un processus fortement assisté par l'IA</strong>, démontrant une exécution efficace du concept au déploiement.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" },
          { "name": "ZIRO.FIT : AI Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Développement d'une plateforme pour coachs sportifs, dotée d'un <strong>assistant IA pour générer automatiquement des plans d'exercices personnalisés</strong>, optimisant la création et la gestion des entraînements.", "stack_title": "Stack Technique", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
        ],
        "education": [
          { "degree": "Diplôme de Technicien en Radio-électronique (équivalent Bac+4)", "institution": "Collège d'État Supérieur de Radiotechnique de Minsk", "period": "2015 - 2019" }
        ]
      },
      "en": {
        "sections": {
          "contact": "CONTACT",
          "skills": "TECHNICAL SKILLS",
          "languages": "LANGUAGES",
          "status": "STATUS",
          "objective": "PROFESSIONAL OBJECTIVE",
          "experience": "PROFESSIONAL EXPERIENCE",
          "projects": "SIGNIFICANT PROJECTS",
          "education": "EDUCATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Full Stack Developer | AI Specialist, TypeScript & Node.js",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Full Stack Developer with 2 years of experience, expert in leveraging AI for rapid development and integrating advanced AI models to create intelligent, user-centric products. I am looking to join a dynamic team to build innovative products, leveraging a passion for solving complex problems and creating high-quality user experiences.",
          "status": "Eligible for a work visa in the EU."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakow, Poland", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "AI & Development", "skills": ["LLM Integration (Google, Groq)", "AI-driven Workflow Automation", "Prompt Engineering", "AI-assisted Development"] },
          { "title": "Languages", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
          { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS"] },
          { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel"] },
          { "title": "Databases", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
          { "title": "Tools & Platforms", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
        ],
        "languages": [
          { "name": "Russian", "level": "Native" },
          { "name": "English", "level": "C1 (Professional proficiency)" },
          { "name": "Polish", "level": "C1" },
          { "name": "Spanish", "level": "B2" },
          { "name": "French", "level": "B1 (Intermediate, actively improving)" },
          { "name": "German", "level": "B1" },
          { "name": "Portuguese", "level": "B1" }
        ],
        "experience": [
          { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "February 2024 - Present", "responsibilities": [ "Designed and deployed 3 major features for an e-commerce platform, resulting in a <strong>15% increase</strong> in customer engagement.", "Optimized the backend (<strong>Laravel, MySQL</strong>) to reduce average API response time by <strong>30%</strong>, improving the frontend <strong>React</strong> experience.", "Integrated the <strong>Stripe</strong> payment API, securing the transaction flow and increasing the conversion rate by <strong>5%</strong>." ] },
          { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "January 2024 - Present", "responsibilities": [ "End-to-end project management and development for 4 web applications in <strong>direct communication with clients</strong>.", "Implemented robust backend architectures with <strong>Node.js</strong> and <strong>Nest.js</strong>, following clean architecture principles.", "Leveraged <strong>AI-driven development workflows</strong> to accelerate project delivery and enhance code quality." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Creation of a PWA aiming to <strong>reduce learning time by 30%</strong>. <strong>Developed using an AI-augmented workflow</strong>, enabling rapid prototyping and feature implementation.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-AI Architecture (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Development of a platform to <strong>increase candidate confidence</strong> in interviews. <strong>Built with a heavily AI-assisted process</strong>, demonstrating efficient execution from concept to deployment.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-AI Architecture (Google, Groq, Cerebras).</strong>" },
          { "name": "ZIRO.FIT: AI Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Developed a platform for fitness trainers featuring an <strong>AI-powered assistant to automatically generate personalized exercise plans</strong>, streamlining workout creation and management.", "stack_title": "Tech Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
        ],
        "education": [
          { "degree": "Diploma of Technician in Radio-electronics (equivalent to Bachelor's degree)", "institution": "Minsk State Higher College of Radiotechnics", "period": "2015 - 2019" }
        ]
      },
      "pl": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "UMIEJĘTNOŚCI TECHNICZNE",
          "languages": "JĘZYKI",
          "status": "STATUS",
          "objective": "CEL ZAWODOWY",
          "experience": "DOŚWIADCZENIE ZAWODOWE",
          "projects": "WAŻNIEJSZE PROJEKTY",
          "education": "EDUKACJA"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Full Stack Developer | Specjalista AI, TypeScript i Node.js",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Full Stack Developer z 2-letnim doświadczeniem, ekspert w wykorzystaniu AI do szybkiego rozwoju i integracji zaawansowanych modeli AI w celu tworzenia inteligentnych produktów zorientowanych na użytkownika. Chcę dołączyć do dynamicznego zespołu, aby budować innowacyjne produkty, wykorzystując pasję do rozwiązywania złożonych problemów i tworzenia wysokiej jakości doświadczeń użytkownika.",
          "status": "Posiadam kartę pobytu czasowego w Polsce."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Kraków, Polska", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "AI i Rozwój Oprogramowania", "skills": ["Integracja LLM (Google, Groq)", "Automatyzacja przepływu pracy AI", "Prompt Engineering", "Rozwój wspomagany przez AI"] },
          { "title": "Języki programowania", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
          { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS"] },
          { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel"] },
          { "title": "Bazy danych", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
          { "title": "Narzędzia i Platformy", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
        ],
        "languages": [
          { "name": "Rosyjski", "level": "Język ojczysty" },
          { "name": "Angielski", "level": "C1 (Biegłość zawodowa)" },
          { "name": "Polski", "level": "C1" },
          { "name": "Hiszpański", "level": "B2" },
          { "name": "Francuski", "level": "B1 (Średnio zaawansowany, w trakcie nauki)" },
          { "name": "Niemiecki", "level": "B1" },
          { "name": "Portugalski", "level": "B1" }
        ],
        "experience": [
          { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "Luty 2024 - Obecnie", "responsibilities": [ "Projektowanie i wdrażanie 3 głównych funkcji dla platformy e-commerce, co zaowocowało <strong>15% wzrostem</strong> zaangażowania klientów.", "Optymalizacja backendu (<strong>Laravel, MySQL</strong>) w celu skrócenia średniego czasu odpowiedzi API o <strong>30%</strong>, co poprawiło doświadczenie na frontendzie <strong>React</strong>.", "Integracja API płatności <strong>Stripe</strong>, zabezpieczająca przepływ transakcji i zwiększająca współczynnik konwersji o <strong>5%</strong>." ] },
          { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "Styczeń 2024 - Obecnie", "responsibilities": [ "Zarządzanie projektami i rozwój od A do Z dla 4 aplikacji internetowych w <strong>bezpośredniej komunikacji z klientami</strong>.", "Wdrażanie solidnych architektur backendowych z <strong>Node.js</strong> i <strong>Nest.js</strong>, zgodnie z zasadami czystej architektury.", "Wykorzystanie <strong>procesów deweloperskich opartych na AI</strong> w celu przyspieszenia realizacji projektów i podniesienia jakości kodu." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Stworzenie PWA mającego na celu <strong>skrócenie czasu nauki o 30%</strong>. <strong>Opracowana przy użyciu przepływu pracy wspomaganego przez AI</strong>, co umożliwiło szybkie prototypowanie i wdrażanie funkcji.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Rozwój platformy mającej na celu <strong>zwiększenie pewności siebie kandydatów</strong> na rozmowach. <strong>Zbudowana w procesie silnie wspomaganym przez AI</strong>, co pokazuje efektywną realizację od koncepcji do wdrożenia.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" },
          { "name": "ZIRO.FIT: AI Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Rozwój platformy dla trenerów fitness, wyposażonej w <strong>asystenta AI do automatycznego generowania spersonalizowanych planów ćwiczeń</strong>, usprawniającego tworzenie i zarządzanie treningami.", "stack_title": "Stos technologiczny", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
        ],
        "education": [
          { "degree": "Dyplom Technika Radioelektroniki (odpowiednik licencjatu)", "institution": "Mińskie Państwowe Wyższe Kolegium Radiotechniczne", "period": "2015 - 2019" }
        ]
      },
      "de": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "TECHNISCHE FÄHIGKEITEN",
          "languages": "SPRACHEN",
          "status": "STATUS",
          "objective": "BERUFLICHES ZIEL",
          "experience": "BERUFSERFAHRUNG",
          "projects": "WICHTIGE PROJEKTE",
          "education": "AUSBILDUNG"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Full-Stack-Entwickler | KI-Spezialist, TypeScript & Node.js",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Full-Stack-Entwickler mit 2 Jahren Erfahrung, Experte in der Nutzung von KI für schnelle Entwicklung und Integration fortschrittlicher KI-Modelle, um intelligente, benutzerzentrierte Produkte zu schaffen. Ich möchte einem dynamischen Team beitreten, um innovative Produkte zu entwickeln, und dabei meine Leidenschaft für die Lösung komplexer Probleme und die Schaffung hochwertiger Benutzererfahrungen einsetzen.",
          "status": "Berechtigt für ein Arbeitsvisum in Deutschland."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakau, Polen", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "KI & Entwicklung", "skills": ["LLM-Integration (Google, Groq)", "KI-gesteuerte Workflow-Automatisierung", "Prompt Engineering", "KI-gestützte Entwicklung"] },
          { "title": "Sprachen", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
          { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS"] },
          { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel"] },
          { "title": "Datenbanken", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
          { "title": "Tools & Plattformen", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
        ],
        "languages": [
          { "name": "Russisch", "level": "Muttersprache" },
          { "name": "Englisch", "level": "C1 (Verhandlungssicher)" },
          { "name": "Polnisch", "level": "C1" },
          { "name": "Spanisch", "level": "B2" },
          { "name": "Französisch", "level": "B1 (Mittelstufe, aktiv lernend)" },
          { "name": "Deutsch", "level": "B1" },
          { "name": "Portugiesisch", "level": "B1" }
        ],
        "experience": [
          { "title": "Full-Stack-Webentwickler", "company": "Basesystem", "period": "Februar 2024 - Heute", "responsibilities": [ "Konzeption und Bereitstellung von 3 Hauptfunktionen für eine E-Commerce-Plattform, was zu einer <strong>15%igen Steigerung</strong> des Kundenengagements führte.", "Optimierung des Backends (<strong>Laravel, MySQL</strong>), um die durchschnittliche API-Antwortzeit um <strong>30%</strong> zu reduzieren, was das Frontend-Erlebnis mit <strong>React</strong> verbesserte.", "Integration der <strong>Stripe</strong>-Zahlungs-API, um den Transaktionsfluss zu sichern und die Konversionsrate um <strong>5%</strong> zu erhöhen." ] },
          { "title": "Full-Stack-Webentwickler (Freiberufler)", "company": "", "period": "Januar 2024 - Heute", "responsibilities": [ "End-to-End-Projektmanagement und -Entwicklung für 4 Webanwendungen in <strong>direkter Kommunikation mit Kunden</strong>.", "Implementierung robuster Backend-Architekturen mit <strong>Node.js</strong> und <strong>Nest.js</strong> nach den Prinzipien der Clean Architecture.", "Einsatz von <strong>KI-gesteuerten Entwicklungsworkflows</strong> zur Beschleunigung der Projektabwicklung und Verbesserung der Codequalität." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Erstellung einer PWA mit dem Ziel, die <strong>Lernzeit um 30% zu reduzieren</strong>. <strong>Entwickelt mit einem KI-erweiterten Workflow</strong>, der schnelles Prototyping und die Implementierung von Funktionen ermöglicht.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Entwicklung einer Plattform zur <strong>Steigerung des Selbstvertrauens von Bewerbern</strong>. <strong>Erstellt mit einem stark KI-gestützten Prozess</strong>, der eine effiziente Umsetzung vom Konzept bis zur Bereitstellung demonstriert.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" },
          { "name": "ZIRO.FIT: AI Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Entwicklung einer Plattform für Fitnesstrainer mit einem <strong>KI-gestützten Assistenten zur automatischen Erstellung personalisierter Trainingspläne</strong>, der die Erstellung und Verwaltung von Workouts optimiert.", "stack_title": "Technologie-Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
        ],
        "education": [
          { "degree": "Diplom als Techniker für Radioelektronik (entspricht Bachelor-Abschluss)", "institution": "Staatliches Höheres Kolleg für Radiotechnik Minsk", "period": "2015 - 2019" }
        ]
      }
    }
  },
  {
    "id": "frontend_specialist",
    "name": "Frontend Specialist",
    "data": {
      "fr": {
        "sections": {
          "contact": "CONTACT",
          "skills": "COMPÉTENCES TECHNIQUES",
          "languages": "LANGUES",
          "status": "STATUT",
          "objective": "OBJECTIF PROFESSIONNEL",
          "experience": "EXPÉRIENCE PROFESSIONNELLE",
          "projects": "PROJETS SIGNIFICATIFS",
          "education": "FORMATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Développeur Frontend | Spécialiste React & TypeScript",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Développeur Frontend passionné avec 2 ans d'expérience, spécialisé dans la création d'interfaces utilisateur réactives et performantes avec React et TypeScript. Je cherche à rejoindre une équipe innovante pour contribuer à des projets ambitieux, en utilisant mon expertise pour construire des expériences web intuitives et esthétiques.",
          "status": "Éligible à un visa de travail en France."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Cracovie, Pologne", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Frontend", "skills": ["React", "Next.js", "TypeScript", "Svelte", "Tailwind CSS", "State Management (Redux, Zustand)"] },
          { "title": "Langages", "skills": ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/SASS"] },
          { "title": "Backend", "skills": ["Node.js", "Express", "Nest.js (Notions)"] },
          { "title": "Outils & Plateformes", "skills": ["Vite", "Webpack", "Figma", "Git", "CI/CD (GitHub Actions)", "Supabase"] }
        ],
        "languages": [
          { "name": "Russe", "level": "Langue maternelle" },
          { "name": "Anglais", "level": "C1 (Courant professionnel)" },
          { "name": "Polonais", "level": "C1" },
          { "name": "Espagnol", "level": "B2" },
          { "name": "Français", "level": "B1 (Intermédiaire, en progression active)" },
          { "name": "Allemand", "level": "B1" },
          { "name": "Portugais", "level": "B1" }
        ],
        "experience": [
          { "title": "Développeur Web Full Stack", "company": "Basesystem", "period": "Février 2024 - Présent", "responsibilities": [ "Conception et déploiement de 3 fonctionnalités majeures pour une plateforme e-commerce, résultant en une <strong>augmentation de 15%</strong> de l'engagement client.", "Optimisation du backend (<strong>Laravel, MySQL</strong>) pour réduire le temps de réponse moyen des API de <strong>30%</strong>, améliorant ainsi l'expérience sur le frontend <strong>React</strong>.", "Intégration de l'API de paiement <strong>Stripe</strong>, sécurisant le flux de transactions et augmentant le taux de conversion de <strong>5%</strong>." ] },
          { "title": "Développeur Web Full Stack (Freelance)", "company": "", "period": "Janvier 2024 - Présent", "responsibilities": [ "Gestion de projet et développement de A à Z pour 4 applications web, en <strong>communication directe avec les clients</strong>.", "Mise en place d'architectures backend robustes avec <strong>Node.js</strong> et <strong>Nest.js</strong>, en suivant les principes de clean architecture.", "Mise en œuvre de <strong>workflows de développement pilotés par l'IA</strong> pour accélérer la livraison des projets et améliorer la qualité du code." ] }
        ],
        "projects": [
          { "name": "Lexity : AI Language Learning PWA", "url": "https://lexity.app", "description": "Création d'une PWA visant à <strong>réduire le temps d'apprentissage de 30%</strong>. <strong>Développée via un workflow augmenté par l'IA</strong>, permettant un prototypage et une implémentation rapides des fonctionnalités.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly : AI Interview Prep Platform", "url": "https://interly.app", "description": "Développement d'une plateforme visant à <strong>augmenter la confiance des candidats</strong> en entretien. <strong>Construite avec un processus fortement assisté par l'IA</strong>, démontrant une exécution efficace du concept au déploiement.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" }
        ],
        "education": [
          { "degree": "Diplôme de Technicien en Radio-électronique (équivalent Bac+4)", "institution": "Collège d'État Supérieur de Radiotechnique de Minsk", "period": "2015 - 2019" }
        ]
      },
      "en": {
        "sections": {
          "contact": "CONTACT",
          "skills": "TECHNICAL SKILLS",
          "languages": "LANGUAGES",
          "status": "STATUS",
          "objective": "PROFESSIONAL OBJECTIVE",
          "experience": "PROFESSIONAL EXPERIENCE",
          "projects": "SIGNIFICANT PROJECTS",
          "education": "EDUCATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Frontend Developer | React & TypeScript Specialist",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Passionate Frontend Developer with 2 years of experience, specializing in creating responsive and high-performance user interfaces with React and TypeScript. I am looking to join an innovative team to contribute to ambitious projects, using my expertise to build intuitive and beautiful web experiences.",
          "status": "Eligible for a work visa in the EU."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakow, Poland", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Frontend", "skills": ["React", "Next.js", "TypeScript", "Svelte", "Tailwind CSS", "State Management (Redux, Zustand)"] },
          { "title": "Languages", "skills": ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/SASS"] },
          { "title": "Backend", "skills": ["Node.js", "Express", "Nest.js (Basics)"] },
          { "title": "Tools & Platforms", "skills": ["Vite", "Webpack", "Figma", "Git", "CI/CD (GitHub Actions)", "Supabase"] }
        ],
        "languages": [
          { "name": "Russian", "level": "Native" },
          { "name": "English", "level": "C1 (Professional proficiency)" },
          { "name": "Polish", "level": "C1" },
          { "name": "Spanish", "level": "B2" },
          { "name": "French", "level": "B1 (Intermediate, actively improving)" },
          { "name": "German", "level": "B1" },
          { "name": "Portuguese", "level": "B1" }
        ],
        "experience": [
          { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "February 2024 - Present", "responsibilities": [ "Designed and deployed 3 major features for an e-commerce platform, resulting in a <strong>15% increase</strong> in customer engagement.", "Optimized the backend (<strong>Laravel, MySQL</strong>) to reduce average API response time by <strong>30%</strong>, improving the frontend <strong>React</strong> experience.", "Integrated the <strong>Stripe</strong> payment API, securing the transaction flow and increasing the conversion rate by <strong>5%</strong>." ] },
          { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "January 2024 - Present", "responsibilities": [ "End-to-end project management and development for 4 web applications in <strong>direct communication with clients</strong>.", "Implemented robust backend architectures with <strong>Node.js</strong> and <strong>Nest.js</strong>, following clean architecture principles.", "Leveraged <strong>AI-driven development workflows</strong> to accelerate project delivery and enhance code quality." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Creation of a PWA aiming to <strong>reduce learning time by 30%</strong>. <strong>Developed using an AI-augmented workflow</strong>, enabling rapid prototyping and feature implementation.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-AI Architecture (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Development of a platform to <strong>increase candidate confidence</strong> in interviews. <strong>Built with a heavily AI-assisted process</strong>, demonstrating efficient execution from concept to deployment.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-AI Architecture (Google, Groq, Cerebras).</strong>" }
        ],
        "education": [
          { "degree": "Diploma of Technician in Radio-electronics (equivalent to Bachelor's degree)", "institution": "Minsk State Higher College of Radiotechnics", "period": "2015 - 2019" }
        ]
      },
      "pl": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "UMIEJĘTNOŚCI TECHNICZNE",
          "languages": "JĘZYKI",
          "status": "STATUS",
          "objective": "CEL ZAWODOWY",
          "experience": "DOŚWIADCZENIE ZAWODOWE",
          "projects": "WAŻNIEJSZE PROJEKTY",
          "education": "EDUKACJA"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Frontend Developer | Specjalista React i TypeScript",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Pasjonat Frontend Developer z 2-letnim doświadczeniem, specjalizujący się w tworzeniu responsywnych i wydajnych interfejsów użytkownika za pomocą React i TypeScript. Chcę dołączyć do innowacyjnego zespołu, aby wnosić wkład w ambitne projekty, wykorzystując swoją wiedzę do budowania intuicyjnych i pięknych doświadczeń internetowych.",
          "status": "Posiadam kartę pobytu czasowego w Polsce."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Kraków, Polska", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Frontend", "skills": ["React", "Next.js", "TypeScript", "Svelte", "Tailwind CSS", "Zarządzanie stanem (Redux, Zustand)"] },
          { "title": "Języki programowania", "skills": ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/SASS"] },
          { "title": "Backend", "skills": ["Node.js", "Express", "Nest.js (Podstawy)"] },
          { "title": "Narzędzia i Platformy", "skills": ["Vite", "Webpack", "Figma", "Git", "CI/CD (GitHub Actions)", "Supabase"] }
        ],
        "languages": [
          { "name": "Rosyjski", "level": "Język ojczysty" },
          { "name": "Angielski", "level": "C1 (Biegłość zawodowa)" },
          { "name": "Polski", "level": "C1" },
          { "name": "Hiszpański", "level": "B2" },
          { "name": "Francuski", "level": "B1 (Średnio zaawansowany, w trakcie nauki)" },
          { "name": "Niemiecki", "level": "B1" },
          { "name": "Portugalski", "level": "B1" }
        ],
        "experience": [
          { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "Luty 2024 - Obecnie", "responsibilities": [ "Projektowanie i wdrażanie 3 głównych funkcji dla platformy e-commerce, co zaowocowało <strong>15% wzrostem</strong> zaangażowania klientów.", "Optymalizacja backendu (<strong>Laravel, MySQL</strong>) w celu skrócenia średniego czasu odpowiedzi API o <strong>30%</strong>, co poprawiło doświadczenie na frontendzie <strong>React</strong>.", "Integracja API płatności <strong>Stripe</strong>, zabezpieczająca przepływ transakcji i zwiększająca współczynnik konwersji o <strong>5%</strong>." ] },
          { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "Styczeń 2024 - Obecnie", "responsibilities": [ "Zarządzanie projektami i rozwój od A do Z dla 4 aplikacji internetowych w <strong>bezpośredniej komunikacji z klientami</strong>.", "Wdrażanie solidnych architektur backendowych z <strong>Node.js</strong> i <strong>Nest.js</strong>, zgodnie z zasadami czystej architektury.", "Wykorzystanie <strong>procesów deweloperskich opartych na AI</strong> w celu przyspieszenia realizacji projektów i podniesienia jakości kodu." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Stworzenie PWA mającego na celu <strong>skrócenie czasu nauki o 30%</strong>. <strong>Opracowana przy użyciu przepływu pracy wspomaganego przez AI</strong>, co umożliwiło szybkie prototypowanie i wdrażanie funkcji.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Rozwój platformy mającej na celu <strong>zwiększenie pewności siebie kandydatów</strong> na rozmowach. <strong>Zbudowana w procesie silnie wspomaganym przez AI</strong>, co pokazuje efektywną realizację od koncepcji do wdrożenia.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" }
        ],
        "education": [
          { "degree": "Dyplom Technika Radioelektroniki (odpowiednik licencjatu)", "institution": "Mińskie Państwowe Wyższe Kolegium Radiotechniczne", "period": "2015 - 2019" }
        ]
      },
      "de": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "TECHNISCHE FÄHIGKEITEN",
          "languages": "SPRACHEN",
          "status": "STATUS",
          "objective": "BERUFLICHES ZIEL",
          "experience": "BERUFSERFAHRUNG",
          "projects": "WICHTIGE PROJEKTE",
          "education": "AUSBILDUNG"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Frontend-Entwickler | React & TypeScript-Spezialist",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Leidenschaftlicher Frontend-Entwickler mit 2 Jahren Erfahrung, spezialisiert auf die Erstellung reaktionsschneller und leistungsstarker Benutzeroberflächen mit React und TypeScript. Ich möchte einem innovativen Team beitreten, um zu ehrgeizigen Projekten beizutragen und meine Expertise zum Aufbau intuitiver und schöner Weberlebnisse einzusetzen.",
          "status": "Berechtigt für ein Arbeitsvisum in Deutschland."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakau, Polen", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Frontend", "skills": ["React", "Next.js", "TypeScript", "Svelte", "Tailwind CSS", "State Management (Redux, Zustand)"] },
          { "title": "Sprachen", "skills": ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/SASS"] },
          { "title": "Backend", "skills": ["Node.js", "Express", "Nest.js (Grundlagen)"] },
          { "title": "Tools & Plattformen", "skills": ["Vite", "Webpack", "Figma", "Git", "CI/CD (GitHub Actions)", "Supabase"] }
        ],
        "languages": [
          { "name": "Russisch", "level": "Muttersprache" },
          { "name": "Englisch", "level": "C1 (Verhandlungssicher)" },
          { "name": "Polnisch", "level": "C1" },
          { "name": "Spanisch", "level": "B2" },
          { "name": "Französisch", "level": "B1 (Mittelstufe, aktiv lernend)" },
          { "name": "Deutsch", "level": "B1" },
          { "name": "Portugiesisch", "level": "B1" }
        ],
        "experience": [
          { "title": "Full-Stack-Webentwickler", "company": "Basesystem", "period": "Februar 2024 - Heute", "responsibilities": [ "Konzeption und Bereitstellung von 3 Hauptfunktionen für eine E-Commerce-Plattform, was zu einer <strong>15%igen Steigerung</strong> des Kundenengagements führte.", "Optimierung des Backends (<strong>Laravel, MySQL</strong>), um die durchschnittliche API-Antwortzeit um <strong>30%</strong> zu reduzieren, was das Frontend-Erlebnis mit <strong>React</strong> verbesserte.", "Integration der <strong>Stripe</strong>-Zahlungs-API, um den Transaktionsfluss zu sichern und die Konversionsrate um <strong>5%</strong> zu erhöhen." ] },
          { "title": "Full-Stack-Webentwickler (Freiberufler)", "company": "", "period": "Januar 2024 - Heute", "responsibilities": [ "End-to-End-Projektmanagement und -Entwicklung für 4 Webanwendungen in <strong>direkter Kommunikation mit Kunden</strong>.", "Implementierung robuster Backend-Architekturen mit <strong>Node.js</strong> und <strong>Nest.js</strong> nach den Prinzipien der Clean Architecture.", "Einsatz von <strong>KI-gesteuerten Entwicklungsworkflows</strong> zur Beschleunigung der Projektabwicklung und Verbesserung der Codequalität." ] }
        ],
        "projects": [
          { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Erstellung einer PWA mit dem Ziel, die <strong>Lernzeit um 30% zu reduzieren</strong>. <strong>Entwickelt mit einem KI-erweiterten Workflow</strong>, der schnelles Prototyping und die Implementierung von Funktionen ermöglicht.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" },
          { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Entwicklung einer Plattform zur <strong>Steigerung des Selbstvertrauens von Bewerbern</strong>. <strong>Erstellt mit einem stark KI-gestützten Prozess</strong>, der eine effiziente Umsetzung vom Konzept bis zur Bereitstellung demonstriert.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" }
        ],
        "education": [
          { "degree": "Diplom als Techniker für Radioelektronik (entspricht Bachelor-Abschluss)", "institution": "Staatliches Höheres Kolleg für Radiotechnik Minsk", "period": "2015 - 2019" }
        ]
      }
    }
  },
  {
    "id": "backend_php_specialist",
    "name": "Backend PHP Specialist",
    "data": {
      "fr": {
        "sections": {
          "contact": "CONTACT",
          "skills": "COMPÉTENCES TECHNIQUES",
          "languages": "LANGUES",
          "status": "STATUT",
          "objective": "OBJECTIF PROFESSIONNEL",
          "experience": "EXPÉRIENCE PROFESSIONNELLE",
          "projects": "PROJETS SIGNIFICATIFS",
          "education": "FORMATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Développeur Backend PHP | Spécialiste Laravel & Symfony",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Développeur Backend PHP très motivé avec 2 ans d'expérience, spécialisé dans la création et la maintenance d'applications web scalables et performantes avec Laravel et Symfony. Passionné par le code propre, l'architecture robuste et l'optimisation des bases de données. Je cherche à mettre à profit mon expertise dans l'écosystème PHP pour contribuer à un projet stimulant au sein d'une équipe axée sur la croissance.",
          "status": "Éligible à un visa de travail en France."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Cracovie, Pologne", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Backend (Écosystème PHP)", "skills": ["PHP (8+)", "Laravel", "Symfony", "Doctrine", "PHPUnit", "Composer"] },
          { "title": "Bases de Données", "skills": ["PostgreSQL", "MySQL", "Conception & Optimisation de BDD"] },
          { "title": "Frontend (Connaissances)", "skills": ["JavaScript", "jQuery", "React", "HTML5", "CSS3"] },
          { "title": "Outils & Plateformes", "skills": ["Docker", "Git", "CI/CD (GitHub Actions)", "API RESTful", "Supabase"] }
        ],
        "languages": [
          { "name": "Russe", "level": "Langue maternelle" },
          { "name": "Anglais", "level": "C1 (Courant professionnel)" },
          { "name": "Polonais", "level": "C1" },
          { "name": "Espagnol", "level": "B2" },
          { "name": "Français", "level": "B1 (Intermédiaire, en progression active)" },
          { "name": "Allemand", "level": "B1" },
          { "name": "Portugais", "level": "B1" }
        ],
        "experience": [
          { "title": "Développeur Web Backend", "company": "Basesystem", "period": "Février 2024 - Présent", "responsibilities": [ "Conception et maintenance d'applications web complexes avec <strong>Laravel</strong> et <strong>Symfony</strong>, tout en gérant avec succès des bases de code héritées en <strong>PHP natif (versions 7 à 8+).</strong>", "Optimisation des performances de la base de données (<strong>MySQL</strong>) par la refactorisation de requêtes complexes et des stratégies d'indexation, entraînant une <strong>réduction de 25%</strong> des temps de chargement.", "Développement d'API RESTful robustes pour soutenir les applications frontend construites avec <strong>jQuery</strong> et <strong>React</strong>, garantissant un flux de données fluide." ] }
        ],
        "projects": [
          { "name": "ZIRO.FIT : Plateforme pour Coachs Sportifs", "url": "https://ziro.fit", "description": "Développement de l'intégralité de la plateforme backend avec <strong>Laravel</strong>, incluant l'architecture de la base de données <strong>PostgreSQL</strong>, la logique métier complexe et un assistant IA pour générer des plans d'exercices.", "stack_title": "Stack Technique", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" },
          { "name": "Backend pour PWA Éducatives", "url": "https://lexity.app", "description": "Conception et implémentation de l'architecture backend et des API RESTful avec <strong>Supabase (PostgreSQL)</strong> pour alimenter une PWA <strong>Next.js</strong>, en se concentrant sur la modélisation des données, l'authentification et les fonctions serverless.", "stack_title": "Stack Technique", "stack": "<strong>Supabase, PostgreSQL, TypeScript (Edge Functions), Next.js.</strong>" }
        ],
        "education": [
          { "degree": "Diplôme de Technicien en Radio-électronique (équivalent Bac+4)", "institution": "Collège d'État Supérieur de Radiotechnique de Minsk", "period": "2015 - 2019" }
        ]
      },
      "en": {
        "sections": {
          "contact": "CONTACT",
          "skills": "TECHNICAL SKILLS",
          "languages": "LANGUAGES",
          "status": "STATUS",
          "objective": "PROFESSIONAL OBJECTIVE",
          "experience": "PROFESSIONAL EXPERIENCE",
          "projects": "SIGNIFICANT PROJECTS",
          "education": "EDUCATION"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Backend PHP Developer | Laravel & Symfony Specialist",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Highly motivated Backend PHP Developer with 2 years of experience specializing in building and maintaining scalable, high-performance web applications using Laravel and Symfony. Passionate about clean code, robust architecture, and database optimization. Seeking to leverage my expertise in the PHP ecosystem to contribute to a challenging project and a growth-oriented team.",
          "status": "Eligible for a work visa in the EU."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakow, Poland", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Backend (PHP Ecosystem)", "skills": ["PHP (8+)", "Laravel", "Symfony", "Doctrine", "PHPUnit", "Composer"] },
          { "title": "Databases", "skills": ["PostgreSQL", "MySQL", "Database Design & Optimization"] },
          { "title": "Frontend (Working Knowledge)", "skills": ["JavaScript", "jQuery", "React", "HTML5", "CSS3"] },
          { "title": "Tools & Platforms", "skills": ["Docker", "Git", "CI/CD (GitHub Actions)", "RESTful APIs", "Supabase"] }
        ],
        "languages": [
          { "name": "Russian", "level": "Native" },
          { "name": "English", "level": "C1 (Professional proficiency)" },
          { "name": "Polish", "level": "C1" },
          { "name": "Spanish", "level": "B2" },
          { "name": "French", "level": "B1 (Intermediate, actively improving)" },
          { "name": "German", "level": "B1" },
          { "name": "Portuguese", "level": "B1" }
        ],
        "experience": [
          { "title": "Backend Web Developer", "company": "Basesystem", "period": "February 2024 - Present", "responsibilities": [ "Engineered and maintained complex web applications using <strong>Laravel</strong> and <strong>Symfony</strong>, successfully managing legacy codebases in <strong>native PHP (versions 7 to 8+).</strong>", "Optimized database performance (<strong>MySQL</strong>) by refactoring complex queries and indexing strategies, resulting in a <strong>25% reduction</strong> in page load times.", "Developed robust RESTful APIs to support frontend applications built with <strong>jQuery</strong> and <strong>React</strong>, ensuring seamless data flow and integration." ] }
        ],
        "projects": [
          { "name": "ZIRO.FIT: AI Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Developed the entire backend platform using <strong>Laravel</strong>, including database architecture in <strong>PostgreSQL</strong>, complex business logic for workout management, and an AI assistant for generating personalized exercise plans.", "stack_title": "Tech Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" },
          { "name": "Backend for Educational PWAs", "url": "https://lexity.app", "description": "Designed and implemented the backend architecture and RESTful APIs using <strong>Supabase (PostgreSQL)</strong> to power a <strong>Next.js</strong> PWA, focusing on data modeling, authentication, and serverless functions for a scalable experience.", "stack_title": "Tech Stack", "stack": "<strong>Supabase, PostgreSQL, TypeScript (Edge Functions), Next.js.</strong>" }
        ],
        "education": [
          { "degree": "Diploma of Technician in Radio-electronics (equivalent to Bachelor's degree)", "institution": "Minsk State Higher College of Radiotechnics", "period": "2015 - 2019" }
        ]
      },
      "pl": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "UMIEJĘTNOŚCI TECHNICZNE",
          "languages": "JĘZYKI",
          "status": "STATUS",
          "objective": "CEL ZAWODOWY",
          "experience": "DOŚWIADCZENIE ZAWODOWE",
          "projects": "WAŻNIEJSZE PROJEKTY",
          "education": "EDUKACJA"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Backend PHP Developer | Specjalista Laravel i Symfony",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Wysoce zmotywowany Backend PHP Developer z 2-letnim doświadczeniem, specjalizujący się w budowaniu i utrzymywaniu skalowalnych, wysokowydajnych aplikacji internetowych przy użyciu Laravel i Symfony. Pasjonat czystego kodu, solidnej architektury i optymalizacji baz danych. Chcę wykorzystać swoją wiedzę w ekosystemie PHP, aby wnieść wkład w ambitny projekt i zespół zorientowany na rozwój.",
          "status": "Posiadam kartę pobytu czasowego w Polsce."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Kraków, Polska", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Backend (Ekosystem PHP)", "skills": ["PHP (8+)", "Laravel", "Symfony", "Doctrine", "PHPUnit", "Composer"] },
          { "title": "Bazy Danych", "skills": ["PostgreSQL", "MySQL", "Projektowanie i Optymalizacja Baz Danych"] },
          { "title": "Frontend (Wiedza praktyczna)", "skills": ["JavaScript", "jQuery", "React", "HTML5", "CSS3"] },
          { "title": "Narzędzia i Platformy", "skills": ["Docker", "Git", "CI/CD (GitHub Actions)", "RESTful APIs", "Supabase"] }
        ],
        "languages": [
          { "name": "Rosyjski", "level": "Język ojczysty" },
          { "name": "Angielski", "level": "C1 (Biegłość zawodowa)" },
          { "name": "Polski", "level": "C1" },
          { "name": "Hiszpański", "level": "B2" },
          { "name": "Francuski", "level": "B1 (Średnio zaawansowany, w trakcie nauki)" },
          { "name": "Niemiecki", "level": "B1" },
          { "name": "Portugalski", "level": "B1" }
        ],
        "experience": [
          { "title": "Backend Web Developer", "company": "Basesystem", "period": "Luty 2024 - Obecnie", "responsibilities": [ "Tworzenie i utrzymywanie złożonych aplikacji internetowych przy użyciu <strong>Laravel</strong> i <strong>Symfony</strong>, z powodzeniem zarządzając starszymi bazami kodu w <strong>natywnym PHP (wersje 7 do 8+).</strong>", "Optymalizacja wydajności bazy danych (<strong>MySQL</strong>) poprzez refaktoryzację złożonych zapytań i strategii indeksowania, co przyniosło <strong>25% redukcję</strong> czasu ładowania stron.", "Rozwój solidnych interfejsów API RESTful w celu wsparcia aplikacji frontendowych zbudowanych w <strong>jQuery</strong> i <strong>React</strong>, zapewniając płynny przepływ danych." ] }
        ],
        "projects": [
          { "name": "ZIRO.FIT: Platforma dla Trenerów Fitness", "url": "https://ziro.fit", "description": "Rozwój całej platformy backendowej przy użyciu <strong>Laravel</strong>, w tym architektury bazy danych w <strong>PostgreSQL</strong>, złożonej logiki biznesowej do zarządzania treningami oraz asystenta AI.", "stack_title": "Stos Technologiczny", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" },
          { "name": "Backend dla Edukacyjnych PWA", "url": "https://lexity.app", "description": "Zaprojektowanie i wdrożenie architektury backendu oraz API RESTful przy użyciu <strong>Supabase (PostgreSQL)</strong> do zasilania PWA <strong>Next.js</strong>, koncentrując się na modelowaniu danych, uwierzytelnianiu i funkcjach serverless.", "stack_title": "Stos Technologiczny", "stack": "<strong>Supabase, PostgreSQL, TypeScript (Edge Functions), Next.js.</strong>" }
        ],
        "education": [
          { "degree": "Dyplom Technika Radioelektroniki (odpowiednik licencjatu)", "institution": "Mińskie Państwowe Wyższe Kolegium Radiotechniczne", "period": "2015 - 2019" }
        ]
      },
      "de": {
        "sections": {
          "contact": "KONTAKT",
          "skills": "TECHNISCHE FÄHIGKEITEN",
          "languages": "SPRACHEN",
          "status": "STATUS",
          "objective": "BERUFLICHES ZIEL",
          "experience": "BERUFSERFAHRUNG",
          "projects": "WICHTIGE PROJEKTE",
          "education": "AUSBILDUNG"
        },
        "personalInfo": {
          "name": "MIKITA KAVALIOU",
          "title": "Backend-PHP-Entwickler | Laravel- & Symfony-Spezialist",
          "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
          "professionalObjective": "Hochmotivierter Backend-PHP-Entwickler mit 2 Jahren Erfahrung, spezialisiert auf die Erstellung und Wartung skalierbarer, hochleistungsfähiger Webanwendungen mit Laravel und Symfony. Leidenschaft für sauberen Code, robuste Architektur und Datenbankoptimierung. Ich möchte meine Expertise im PHP-Ökosystem nutzen, um zu einem herausfordernden Projekt und einem wachstumsorientierten Team beizutragen.",
          "status": "Berechtigt für ein Arbeitsvisum in Deutschland."
        },
        "contact": [
          { "text": "+48 664 431 074", "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>" },
          { "text": "kawaliou.mikita@gmail.com", "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>" },
          { "text": "Krakau, Polen", "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>" },
          { "text": "mikita-kavaliou.online", "url": "https://mikita-kavaliou.online", "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>" },
          { "text": "linkedin.com/in/mikita-kavaliou", "url": "https://linkedin.com/in/mikita-kavaliou-390b62236", "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>" },
          { "text": "github.com/NikKowPHP", "url": "https://github.com/NikKowPHP", "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>" }
        ],
        "skills": [
          { "title": "Backend (PHP-Ökosystem)", "skills": ["PHP (8+)", "Laravel", "Symfony", "Doctrine", "PHPUnit", "Composer"] },
          { "title": "Datenbanken", "skills": ["PostgreSQL", "MySQL", "Datenbankdesign & -optimierung"] },
          { "title": "Frontend (Grundkenntnisse)", "skills": ["JavaScript", "jQuery", "React", "HTML5", "CSS3"] },
          { "title": "Tools & Plattformen", "skills": ["Docker", "Git", "CI/CD (GitHub Actions)", "RESTful APIs", "Supabase"] }
        ],
        "languages": [
          { "name": "Russisch", "level": "Muttersprache" },
          { "name": "Englisch", "level": "C1 (Verhandlungssicher)" },
          { "name": "Polnisch", "level": "C1" },
          { "name": "Spanisch", "level": "B2" },
          { "name": "Französisch", "level": "B1 (Mittelstufe, aktiv lernend)" },
          { "name": "Deutsch", "level": "B1" },
          { "name": "Portugiesisch", "level": "B1" }
        ],
        "experience": [
          { "title": "Backend-Webentwickler", "company": "Basesystem", "period": "Februar 2024 - Heute", "responsibilities": [ "Entwicklung und Wartung komplexer Webanwendungen mit <strong>Laravel</strong> und <strong>Symfony</strong> sowie erfolgreiche Verwaltung von Legacy-Codebasen in <strong>nativem PHP (Versionen 7 bis 8+).</strong>", "Optimierung der Datenbankleistung (<strong>MySQL</strong>) durch Refactoring komplexer Abfragen und Indexierungsstrategien, was zu einer <strong>Reduzierung der Ladezeiten um 25%</strong> führte.", "Entwicklung robuster RESTful-APIs zur Unterstützung von Frontend-Anwendungen, die mit <strong>jQuery</strong> und <strong>React</strong> erstellt wurden, um einen nahtlosen Datenfluss zu gewährleisten." ] }
        ],
        "projects": [
          { "name": "ZIRO.FIT: Plattform für Fitnesstrainer", "url": "https://ziro.fit", "description": "Entwicklung der gesamten Backend-Plattform mit <strong>Laravel</strong>, einschließlich Datenbankarchitektur in <strong>PostgreSQL</strong>, komplexer Geschäftslogik für das Workout-Management und einem KI-Assistenten.", "stack_title": "Technologie-Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" },
          { "name": "Backend für Bildungs-PWAs", "url": "https://lexity.app", "description": "Entwurf und Implementierung der Backend-Architektur und RESTful-APIs mit <strong>Supabase (PostgreSQL)</strong>, um eine <strong>Next.js</strong>-PWA zu betreiben, mit Fokus auf Datenmodellierung, Authentifizierung und Serverless-Funktionen.", "stack_title": "Technologie-Stack", "stack": "<strong>Supabase, PostgreSQL, TypeScript (Edge Functions), Next.js.</strong>" }
        ],
        "education": [
          { "degree": "Diplom als Techniker für Radioelektronik (entspricht Bachelor-Abschluss)", "institution": "Staatliches Höheres Kolleg für Radiotechnik Minsk", "period": "2015 - 2019" }
        ]
      }
    }
  }
]
      ]]>
    </file>
    <file path="TASKS.md">
      <![CDATA[
- [x] Fix "Maximum call stack size exceeded" error on app load.
- [x] Make the application responsive on mobile devices.
- [x] Update document title for printing/saving to include name, language, title, and document type.
- [x] Add a new CV profile for a Backend PHP (Laravel/Symfony) role.
      ]]>
    </file>
  </modifications>
</response>
```