<response>
<reasoning>
The user wants to refactor the application to improve its structure, modularity, and maintainability, following best practices like Separation of Concerns (SoC).

My plan is as follows:

1.  **Separate Data from Presentation:** I will extract all the CV content currently hardcoded in `index.html` into a new structured JSON file: `src/data/cv-data.json`. This will make the CV content easy to update without touching the code.

2.  **Create a Modular `src` Directory:** All application source code will be moved into a `src` directory with a logical subdirectory structure (`components`, `services`, `data`, etc.) to organize the code by its responsibility.

3.  **Component-Based UI Rendering:** I will create separate modules for rendering the UI.
    -   `src/components/CvView.ts`: Will dynamically generate the CV HTML from `cv-data.json`.
    -   `src/components/LetterView.ts`: Will render the cover letter generator UI and handle its logic.

4.  **Isolate Business Logic:** The logic for interacting with the Google Gemini API will be moved to a dedicated service module, `src/services/GeminiService.ts`.

5.  **Application Orchestration:** A new `src/App.ts` module will manage the application state, including view switching (routing between CV and Letter views), and will be initialized by the main entry point, `src/main.ts`.

6.  **Clean up the Root Directory:**
    -   `index.html` will be simplified into a basic shell, loading the CSS and the main JavaScript module.
    -   All CSS styles will be moved from `index.html` into a separate `src/styles.css` file.
    -   The now-redundant `cv.html` and the monolithic `index.tsx` will be deleted.
    -   Configuration files (`vite.config.ts`, `tsconfig.json`) will be updated to reflect the new project structure.

7.  **Add Task Tracking:** I will create a `TASKS.md` file to track the completed refactoring task as requested.

This refactoring will result in a more professional, scalable, and maintainable codebase that adheres to modern web development standards.
</reasoning>
<commands>
<![CDATA[
rm "cv.html"
rm "index.tsx"
mkdir -p "src/components"
mkdir -p "src/data"
mkdir -p "src/services"
]]>
</commands>
<modifications>
<file path=".gitignore">
<![CDATA[
node_modules
repomix-output.xml
.env
.env.local
.DS_Store
package-lock.json
dist
]]>
</file>
<file path="index.html">
<![CDATA[
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV & Lettre de Motivation - Mikita Kavaliou</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles.css">
</head>
<body>

  <nav class="app-nav">
    <a href="#cv" id="nav-cv" class="nav-link">CV</a>
    <a href="#letter" id="nav-letter" class="nav-link">Lettre de Motivation</a>
  </nav>
  
  <main id="app-container"></main>
  
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
]]>
</file>
<file path="README.md">
<![CDATA[
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CV & AI Cover Letter Generator

This project contains a personal CV and an AI-powered cover letter generator.

View your app in AI Studio: https://ai.studio/apps/bundled/blank

## Run Locally

**Prerequisites:**  Node.js

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:3000`.
]]>
</file>
<file path="TASKS.md">
<![CDATA[
- [x] Perform refactor to use SoC and all best practices in development, highly modular, detach data to a separate json data to be able to change it.
]]>
</file>
<file path="src/App.ts">
<![CDATA[
import { renderCvView } from './components/CvView';
import { renderLetterView } from './components/LetterView';
import cvData from './data/cv-data.json';
import { CVData } from './types';

export class App {
  private container: HTMLElement;
  private navCV: HTMLElement | null;
  private navLetter: HTMLElement | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.navCV = document.getElementById('nav-cv');
    this.navLetter = document.getElementById('nav-letter');

    this.initRouter();
    this.handleNavigation(); // Initial render
  }

  private initRouter() {
    window.addEventListener('hashchange', this.handleNavigation.bind(this));
    // Ensure clicking nav links updates the view correctly
    this.navCV?.addEventListener('click', () => window.location.hash = 'cv');
    this.navLetter?.addEventListener('click', () => window.location.hash = 'letter');
  }

  private handleNavigation() {
    const hash = window.location.hash || '#cv';
    this.container.innerHTML = ''; // Clear container

    if (hash === '#cv') {
      this.container.appendChild(renderCvView(cvData as CVData));
      this.navCV?.classList.add('active');
      this.navLetter?.classList.remove('active');
    } else if (hash === '#letter') {
      this.container.appendChild(renderLetterView());
      this.navLetter?.classList.add('active');
      this.navCV?.classList.remove('active');
    }
  }
}
]]>
</file>
<file path="src/components/CvView.ts">
<![CDATA[
import { CVData, Contact, SkillCategory, Language, Experience, Project, Education } from '../types';

const createContactItem = (item: Contact) => `
  <li>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.svgPath}</svg>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`}
  </li>
`;

const createSkillCategory = (category: SkillCategory) => `
  <h3>${category.title}</h3>
  <p>${category.skills.join(', ')}</p>
`;

const createLanguageItem = (lang: Language) => `
  <li><strong>${lang.name}:</strong> ${lang.level}</li>
`;

const createExperienceItem = (job: Experience) => `
  <div class="job">
    <h4>${job.title}</h4>
    <p class="company-info">${job.company} | ${job.period}</p>
    <ul>
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="job">
    <h4><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a></h4>
    <p>${project.description}</p>
    <p><strong>Stack Technique :</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job">
    <h4>${edu.degree}</h4>
    <p class="company-info">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const renderCvView = (data: CVData): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';
  element.innerHTML = `
    <button class="print-button" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      Imprimer CV
    </button>
    <div class="cv-container">
      <aside class="left-column">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image">
        
        <section>
          <h2>CONTACT</h2>
          <ul class="contact-list">
            ${data.contact.map(createContactItem).join('')}
          </ul>
        </section>

        <section>
          <h2>COMPÉTENCES TECHNIQUES</h2>
          ${data.skills.map(createSkillCategory).join('')}
        </section>

        <section>
          <h2>LANGUES</h2>
          <ul>
            ${data.languages.map(createLanguageItem).join('')}
          </ul>
        </section>

        <section>
          <h2>STATUT</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </aside>

      <main class="right-column">
        <header>
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </header>

        <section>
          <h2>OBJECTIF PROFESSIONNEL</h2>
          <p>${data.personalInfo.professionalObjective}</p>
        </section>

        <section>
          <h2>EXPÉRIENCE PROFESSIONNELLE</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section>
          <h2>PROJETS SIGNIFICATIFS</h2>
          ${data.projects.map(createProjectItem).join('')}
        </section>

        <section>
          <h2>FORMATION</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>
      </main>
    </div>
  `;
  return element;
};
]]>
</file>
<file path="src/components/LetterView.ts">
<![CDATA[
import { generateCoverLetter, getCVDataFromDOM } from '../services/GeminiService';
import { blobToBase64 } from '../helpers';

export const renderLetterView = (): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'letter-view';
  element.innerHTML = `
    <div class="generator-container">
        <h1 class="generator-title">Générateur de Lettre de Motivation</h1>
        <p class="generator-subtitle">Générez une lettre de motivation personnalisée en utilisant les informations de votre CV and de l'offre d'emploi.</p>

        <div class="form-group">
            <label for="job-description">Collez la description du poste ou les détails de l'entreprise ici</label>
            <textarea id="job-description" name="job-description" rows="8" placeholder="Ex: 'Nous recherchons un développeur Full Stack expérimenté avec une expertise en React et Node.js...'"></textarea>
        </div>
        
        <div class="separator">OU</div>

        <div class="form-group">
            <label for="job-screenshot">Téléchargez une capture d'écran de l'offre d'emploi</label>
            <input type="file" id="job-screenshot" name="job-screenshot" accept="image/*">
        </div>

        <button class="generate-button" id="generate-btn">
            <span id="generate-btn-text">Générer la lettre</span>
            <div id="generate-btn-spinner" class="spinner" style="display: none;"></div>
        </button>
    </div>

    <hr />

    <div id="letter-output-container">
        <button class="print-button" id="print-letter-btn" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Imprimer Lettre
        </button>
        <div id="letter-output" contenteditable="true">
            <p style="color: #666;">Votre lettre de motivation apparaîtra ici...</p>
        </div>
    </div>
  `;

  // Attach event listeners
  const generateBtn = element.querySelector('#generate-btn') as HTMLButtonElement;
  const jobDescriptionInput = element.querySelector('#job-description') as HTMLTextAreaElement;
  const jobScreenshotInput = element.querySelector('#job-screenshot') as HTMLInputElement;
  const letterOutput = element.querySelector('#letter-output') as HTMLDivElement;
  const printLetterBtn = element.querySelector('#print-letter-btn') as HTMLButtonElement;
  const generateBtnText = element.querySelector('#generate-btn-text') as HTMLSpanElement;
  const generateBtnSpinner = element.querySelector('#generate-btn-spinner') as HTMLDivElement;

  const setGeneratingState = (isGenerating: boolean) => {
    if (isGenerating) {
        generateBtn.setAttribute('disabled', 'true');
        generateBtnText.textContent = 'Génération en cours...';
        generateBtnSpinner.style.display = 'block';
    } else {
        generateBtn.removeAttribute('disabled');
        generateBtnText.textContent = 'Générer la lettre';
        generateBtnSpinner.style.display = 'none';
    }
  };

  const handleGenerate = async () => {
    const jobDescription = jobDescriptionInput.value;
    const imageFile = jobScreenshotInput.files?.[0];

    if (!jobDescription && !imageFile) {
      alert("Veuillez fournir une description de poste ou une capture d'écran.");
      return;
    }
    
    setGeneratingState(true);
    letterOutput.innerHTML = '<p style="color: #666;">Génération de votre lettre de motivation, veuillez patienter...</p>';
    printLetterBtn.style.display = 'none';

    try {
      const cvData = getCVDataFromDOM();
      
      let imagePart = null;
      if (imageFile) {
        const base64Data = await blobToBase64(imageFile);
        imagePart = {
          inlineData: {
            mimeType: imageFile.type,
            data: base64Data
          }
        };
      }
      
      const result = await generateCoverLetter(cvData, jobDescription, imagePart);
      
      letterOutput.textContent = result;
      printLetterBtn.style.display = 'flex';

    } catch (error) {
        console.error("Error generating letter:", error);
        letterOutput.innerHTML = `<p style="color: red;">Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer.</p>`;
    } finally {
        setGeneratingState(false);
    }
  };

  generateBtn.addEventListener('click', handleGenerate);
  printLetterBtn.addEventListener('click', () => window.print());

  return element;
};
]]>
</file>
<file path="src/data/cv-data.json">
<![CDATA[
{
  "personalInfo": {
    "name": "MIKITA KAVALIOU",
    "title": "Développeur Full Stack | Spécialiste TypeScript, React & Node.js",
    "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
    "professionalObjective": "Développeur Full Stack avec 2 ans d'expérience dans la conception d'applications web performantes. Je cherche à rejoindre une équipe dynamique pour construire des produits innovants. Désireux de mettre mes compétences en pratique dans un environnement francophone, je suis passionné par la résolution de problèmes complexes et la création d'expériences utilisateur de haute qualité.",
    "status": "Éligible à un visa de travail en France."
  },
  "contact": [
    {
      "text": "+48 664 431 074",
      "svgPath": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>"
    },
    {
      "text": "kawaliou.mikita@gmail.com",
      "svgPath": "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>"
    },
    {
      "text": "Cracovie, Pologne",
      "svgPath": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>"
    },
    {
      "text": "mikita-kavaliou.online",
      "url": "https://mikita-kavaliou.online",
      "svgPath": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72\"></path>"
    },
    {
      "text": "linkedin.com/in/mikita-kavaliou",
      "url": "https://linkedin.com/in/mikita-kavaliou-390b62236",
      "svgPath": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>"
    },
    {
      "text": "github.com/NikKowPHP",
      "url": "https://github.com/NikKowPHP",
      "svgPath": "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>"
    }
  ],
  "skills": [
    {
      "title": "Langages",
      "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"]
    },
    {
      "title": "Frontend",
      "skills": ["React", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"]
    },
    {
      "title": "Backend",
      "skills": ["Node.js", "Nest.js", "Express", "Laravel", "Symfony"]
    },
    {
      "title": "Bases de Données",
      "skills": ["PostgreSQL", "MySQL", "MongoDB"]
    },
    {
      "title": "Cloud & DevOps",
      "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"]
    }
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
    {
      "title": "Développeur Web Full Stack",
      "company": "Basesystem",
      "period": "Février 2024 - Présent",
      "responsibilities": [
        "En collaboration avec l'équipe Produit, conception et déploiement de 3 fonctionnalités majeures pour une plateforme e-commerce, résultant en une <strong>augmentation de 15%</strong> de l'engagement client.",
        "Optimisation du backend (<strong>Laravel, MySQL</strong>) pour réduire le temps de réponse moyen des API de <strong>30%</strong>, améliorant ainsi l'expérience sur le frontend <strong>React</strong>.",
        "Intégration de l'API de paiement <strong>Stripe</strong>, sécurisant le flux de transactions et augmentant le taux de conversion de <strong>5%</strong>."
      ]
    },
    {
      "title": "Développeur Web Full Stack (Freelance)",
      "company": "",
      "period": "Janvier 2024 - Présent",
      "responsibilities": [
        "Gestion de projet et développement de A à Z pour 4 applications web, en <strong>communication directe avec les clients</strong> pour définir les besoins et livrer des solutions sur-mesure.",
        "Mise en place d'architectures backend robustes avec <strong>Node.js</strong> et <strong>Nest.js</strong>, en suivant les principes de clean architecture."
      ]
    }
  ],
  "projects": [
    {
      "name": "Lexity : AI Language Learning PWA",
      "url": "https://lexity.app",
      "description": "Création d'une PWA visant à <strong>réduire le temps d'apprentissage de 30%</strong> en forçant la pratique active via des retours IA.",
      "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>"
    },
    {
      "name": "Interly : AI Interview Prep Platform",
      "url": "https://interly.app",
      "description": "Développement d'une plateforme visant à <strong>augmenter la confiance des candidats</strong> et leurs performances en entretien grâce à des simulations IA.",
      "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>"
    },
    {
      "name": "ZIRO.FIT : Fitness Trainer Platform",
      "url": "https://ziro.fit",
      "description": "Plateforme permettant aux coachs sportifs de <strong>créer des pages personnalisées</strong> pour présenter leur travail et gérer leur activité.",
      "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>"
    }
  ],
  "education": [
    {
      "degree": "Diplôme de Technicien en Radio-électronique (équivalent Bac+4)",
      "institution": "Collège d'État Supérieur de Radiotechnique de Minsk",
      "period": "2015 - 2019"
    }
  ]
}
]]>
</file>
<file path="src/helpers.ts">
<![CDATA[
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // remove the "data:mime/type;base64," prefix
      resolve(base64data.substr(base64data.indexOf(',') + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
]]>
</file>
<file path="src/main.ts">
<![CDATA[
import { App } from './App';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    new App(appContainer);
  } else {
    console.error('App container not found!');
  }
});
]]>
</file>
<file path="src/services/GeminiService.ts">
<![CDATA[
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export const getCVDataFromDOM = (): string => {
    // Re-render the CV in a hidden element to extract its text content,
    // ensuring we get data from the single source of truth (cv-data.json).
    const cvContainer = document.querySelector('.cv-container');
    if (!cvContainer) return "CV data not found.";
    
    let cvText = "";
    const name = cvContainer.querySelector('h1')?.textContent?.trim() || '';
    const title = cvContainer.querySelector('header h3')?.textContent?.trim() || '';
    cvText += `Nom: ${name}\nTitre: ${title}\n\n`;

    const sections = cvContainer.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2')?.textContent?.trim();
        if (sectionTitle) {
            cvText += `## ${sectionTitle}\n`;
            const content = Array.from(section.querySelectorAll('p, ul, .job')).map(el => (el as HTMLElement).innerText.replace(/\s\s+/g, ' ').trim()).join('\n');
            cvText += `${content}\n\n`;
        }
    });

    return cvText;
};

export const generateCoverLetter = async (cvData: string, jobInfo: string, imagePart: any | null): Promise<string> => {
    const prompt = `
Vous êtes un coach carrière expert, spécialisé dans le marché du travail français. Votre mission est de rédiger une lettre de motivation exceptionnelle, prête à l'emploi.

**Informations sur le candidat (extrait du CV) :**
---
${cvData}
---

**Informations sur le poste/l'entreprise :**
---
${jobInfo || "Veuillez analyser l'image ci-jointe pour la description du poste et les informations sur l'entreprise."}
---

**Instructions de rédaction :**

Rédigez une lettre de motivation complète et professionnelle en **français uniquement**. La lettre doit être structurée comme suit, sans utiliser de placeholders comme "[Vos Coordonnées]" ou "[Coordonnées de l'entreprise]".

1.  **En-tête de l'expéditeur :** Intégrez directement les informations de contact du candidat (Nom, Titre, Téléphone, Email, etc.) de manière claire et professionnelle en haut à gauche.
2.  **Destinataire :** Si le nom d'un contact ou de l'entreprise est disponible dans la description, adressez-lui la lettre. Sinon, utilisez une formule générique comme "À l'attention du Service Recrutement". Incluez la ville si possible.
3.  **Date et Lieu :** Ajoutez le lieu de résidence du candidat et la date actuelle (ex: "Cracovie, le [Date actuelle]").
4.  **Objet :** Créez un objet de lettre clair et concis. Par exemple : "Objet : Candidature au poste de [Intitulé du poste]".
5.  **Corps de la lettre :**
    *   Rédigez une introduction percutante qui mentionne le poste visé.
    *   Développez 2-3 paragraphes qui mettent en évidence la correspondance entre les compétences et expériences du candidat (présentes dans le CV) et les exigences du poste. Utilisez des exemples concrets du CV.
    *   Montrez un intérêt sincère pour l'entreprise.
    *   Concluez avec un appel à l'action clair, en proposant un entretien.
6.  **Formule de politesse et Signature :** Terminez par une formule de politesse professionnelle (ex: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.") suivie du nom complet du candidat.

**Ton et Style :**
*   Le ton doit être professionnel, confiant et enthousiaste.
*   La lettre doit être concise, percutante et sans fautes.
*   Utilisez des sauts de ligne pour aérer le texte et séparer distinctement les paragraphes.

Générez uniquement le texte complet de la lettre, en commençant par le nom du candidat.
`;

    const parts: any[] = [{ text: prompt }];
    if (imagePart) {
        parts.push(imagePart);
    }

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    return result.response.text();
};
]]>
</file>
<file path="src/styles.css">
<![CDATA[
:root {
  --page-background: #f0f2f5;
  --cv-background: #ffffff;
  --left-column-background: #f8f9fa;
  --text-color: #333;
  --heading-color: #1a202c;
  --accent-color: #4a5568;
  --link-color: #2b6cb0;
  --border-color: #e2e8f0;
  --button-hover-color: #2c5282;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --spinner-color: #fff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--page-background);
  color: var(--text-color);
  line-height: 1.35;
  font-size: 8.5pt;
}

.app-nav {
  background-color: var(--cv-background);
  padding: 0 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1001;
}

.nav-link {
  padding: 1rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--accent-color);
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--heading-color);
}

.nav-link.active {
  color: var(--link-color);
  border-bottom-color: var(--link-color);
}

.print-button {
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: var(--link-color);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease, transform 0.1s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
}

.print-button:hover {
  background-color: var(--button-hover-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.print-button:active {
  transform: translateY(0);
}

#app-container {
  padding-top: 1rem;
}

.cv-container {
  display: flex;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background-color: var(--cv-background);
  box-shadow: 0 4px 12px var(--shadow-color);
}

#letter-view {
    max-width: 900px;
    margin: 1rem auto;
    padding: 2rem;
    background-color: var(--cv-background);
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-color);
}

.generator-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 0.5rem;
    text-align: center;
}

.generator-subtitle {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--accent-color);
    font-size: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--heading-color);
}

.form-group textarea {
    width: 100%;
    min-height: 150px;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    resize: vertical;
}

.form-group input[type="file"] {
    font-size: 0.9rem;
}

.separator {
    text-align: center;
    margin: 1.5rem 0;
    color: var(--accent-color);
    font-weight: 500;
}

.generate-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    background-color: var(--link-color);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.generate-button:hover {
    background-color: var(--button-hover-color);
}

.generate-button:disabled {
    background-color: var(--accent-color);
    cursor: not-allowed;
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid var(--spinner-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 2rem 0;
}

#letter-output-container {
  position: relative;
}

#letter-output {
  background-color: #fff;
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 6px;
  min-height: 297mm;
  line-height: 1.5;
  font-size: 10pt;
  white-space: pre-wrap;
}

#print-letter-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.left-column {
  width: 35%;
  background-color: var(--left-column-background);
  padding: 1.2rem;
  border-right: 1px solid var(--border-color);
}

.right-column {
  width: 65%;
  padding: 1.2rem;
}

.profile-image {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  border: 4px solid var(--cv-background);
  display: block;
  object-fit: cover;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

h2 {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--border-color);
}

h3 {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--heading-color);
  margin-bottom: 0.5rem;
}

.right-column h3 {
  font-size: 0.95rem;
  color: var(--accent-color);
}

h4 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 0.2rem;
}

p {
  margin-bottom: 0.4rem;
}

a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  word-break: break-word;
}

a:hover {
  color: var(--button-hover-color);
  text-decoration: underline;
}

.job h4 a {
  color: var(--link-color);
  text-decoration: none;
  border-bottom: 1.5px solid var(--link-color);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.job h4 a:hover {
  color: var(--button-hover-color);
  border-bottom-color: var(--button-hover-color);
  background-color: rgba(43, 108, 176, 0.05);
}

section {
  margin-bottom: 0.9rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

.left-column ul li {
  margin-bottom: 0.45rem;
  font-size: 0.85em;
}

.left-column ul.contact-list li {
  display: flex;
  align-items: flex-start;
}

.left-column ul.contact-list li svg {
  margin-right: 0.6rem;
  flex-shrink: 0;
  color: var(--accent-color);
  margin-top: 2px;
}

.left-column h3 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--heading-color);
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
}

.left-column p {
  font-size: 0.85em;
  line-height: 1.3;
}

.job {
  margin-bottom: 0.8rem;
}

.company-info {
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 0.3rem;
  font-size: 0.9em;
}

.right-column ul {
  padding-left: 1.2rem;
}

.right-column ul li {
  list-style-type: disc;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

strong {
  font-weight: 700;
  color: var(--heading-color);
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }
  
  body {
    background-color: #fff;
    margin: 0;
    padding: 0;
    font-size: 9pt;
  }
  
  .app-nav, .print-button, #letter-view .generator-container, #print-letter-btn {
    display: none !important;
  }
  
  #app-container {
    padding: 0;
  }
  
  .cv-container, #letter-output {
    margin: 0;
    box-shadow: none;
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    max-height: 297mm;
  }
  
  .left-column,
  .right-column {
    padding: 1rem;
  }
  
  #letter-view {
    padding: 0;
    box-shadow: none;
    background-color: transparent;
  }

  #letter-output {
    border: none;
    padding: 1rem;
    font-size: 9pt;
  }
}
]]>
</file>
<file path="src/types.ts">
<![CDATA[
export interface PersonalInfo {
  name: string;
  title: string;
  image: string;
  professionalObjective: string;
  status: string;
}

export interface Contact {
  text: string;
  url?: string;
  svgPath: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  url: string;
  description: string;
  stack: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contact: Contact[];
  skills: SkillCategory[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}
]]>
</file>
<file path="tsconfig.json">
<![CDATA[
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "types": [
      "node"
    ],
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
]]>
</file>
<file path="vite.config.ts">
<![CDATA[
import path from 'path';
import { defineConfig, loadEnv } from 'vite';


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
]]>
</file>
</modifications>
</response>