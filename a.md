<response>
  <reasoning>
    My plan is to implement a language switcher that allows the user to view the CV and generate the Cover Letter in French, English, Polish, or German.

    Here's my breakdown of the required changes:

    1.  **Data Restructuring (`cv-data.json`, `types.ts`):** I will restructure `cv-data.json` to hold data for all four languages under keys like `fr`, `en`, `pl`, and `de`. To make the components fully data-driven, I'll add a `sections` object to the data structure, containing translated titles for CV sections. The TypeScript types in `types.ts` will be updated to reflect this new multilingual structure.

    2.  **UI for Language Switching (`index.html`, `styles.css`):** I will add a language switcher with buttons for each language to the main navigation bar in `index.html` and style it in `styles.css`.

    3.  **State Management and Orchestration (`App.ts`):** The main `App` class will manage the currently selected language. It will handle clicks on the language switcher, update its internal state, and re-render the appropriate view (`CvView` or `LetterView`) with the data corresponding to the selected language. It will also update the UI text for the main navigation links.

    4.  **Component Updates (`CvView.ts`, `LetterView.ts`):**
        *   `CvView.ts` will be modified to use the new `sections` object from the CV data for its headers, making it fully translatable. It will also receive the current language to translate the "Print CV" button.
        *   `LetterView.ts` will be updated to render its UI text (labels, buttons) in the selected language. It will also pass the correct language to the `GeminiService` when generating a cover letter and to `CvView` when printing the combined document.

    5.  **Service Layer Update (`GeminiService.ts`):**
        *   `getCVDataFromDOM` will be renamed to `getCVDataAsText` and will now process a `CVData` object passed as an argument, making it stateless.
        *   `generateCoverLetter` will accept a language parameter to instruct the AI to generate the letter in the correct language.

    Finally, I will create a `TASKS.md` file to track this new feature and mark it as complete.
  </reasoning>
  <modifications>
    <file path="TASKS.md">
      <![CDATA[
- [x] Add language switcher for the cv and letter cover.
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
    <div class="nav-links">
      <a href="#cv" id="nav-cv" class="nav-link">CV</a>
      <a href="#letter" id="nav-letter" class="nav-link">Lettre de Motivation</a>
    </div>
    <div class="lang-switcher">
      <button class="lang-switch active" data-lang="fr">FR</button>
      <button class="lang-switch" data-lang="en">EN</button>
      <button class="lang-switch" data-lang="pl">PL</button>
      <button class="lang-switch" data-lang="de">DE</button>
    </div>
  </nav>
  
  <main id="app-container"></main>
  
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
]]>
    </file>
    <file path="src/App.ts">
      <![CDATA[
import { renderCvView } from './components/CvView';
import { renderLetterView } from './components/LetterView';
import cvDataJson from './data/cv-data.json';
import { CVData, MultilingualCVData, LanguageCode } from './types';

const uiTranslations = {
  fr: { cv: 'CV', letter: 'Lettre de Motivation' },
  en: { cv: 'CV', letter: 'Cover Letter' },
  pl: { cv: 'CV', letter: 'List Motywacyjny' },
  de: { cv: 'Lebenslauf', letter: 'Anschreiben' },
};

export class App {
  private container: HTMLElement;
  private navCV: HTMLElement | null;
  private navLetter: HTMLElement | null;
  private cvData: MultilingualCVData = cvDataJson as MultilingualCVData;
  private currentLanguage: LanguageCode = 'fr';

  constructor(container: HTMLElement) {
    this.container = container;
    this.navCV = document.getElementById('nav-cv');
    this.navLetter = document.getElementById('nav-letter');

    this.initRouter();
    this.initLanguageSwitcher();
    this.handleNavigation(); // Initial render
  }

  private initRouter() {
    window.addEventListener('hashchange', this.handleNavigation.bind(this));
    this.navCV?.addEventListener('click', () => window.location.hash = 'cv');
    this.navLetter?.addEventListener('click', () => window.location.hash = 'letter');
  }
  
  private initLanguageSwitcher() {
    const switcher = document.querySelector('.lang-switcher');
    switcher?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.lang-switch')) {
        const lang = target.dataset.lang as LanguageCode;
        if (lang) {
          this.setLanguage(lang);
        }
      }
    });
  }

  private setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-switch').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Re-render view with new language
    this.handleNavigation();
  }

  private updateNavText() {
    if (this.navCV) this.navCV.textContent = uiTranslations[this.currentLanguage].cv;
    if (this.navLetter) this.navLetter.textContent = uiTranslations[this.currentLanguage].letter;
  }

  private handleNavigation() {
    const hash = window.location.hash || '#cv';
    this.container.innerHTML = ''; // Clear container
    this.updateNavText();

    const currentCvData = this.cvData[this.currentLanguage];

    if (hash === '#cv') {
      this.container.appendChild(renderCvView(currentCvData, this.currentLanguage));
      this.navCV?.classList.add('active');
      this.navLetter?.classList.remove('active');
    } else if (hash === '#letter') {
      this.container.appendChild(renderLetterView(this.currentLanguage, this.cvData));
      this.navLetter?.classList.add('active');
      this.navCV?.classList.remove('active');
    }
  }
}
]]>
    </file>
    <file path="src/components/CvView.ts">
      <![CDATA[
import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../types';

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
    <p><strong>${project.stack_title} :</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job">
    <h4>${edu.degree}</h4>
    <p class="company-info">${edu.institution} | ${edu.period}</p>
  </div>
`;

const translations = {
    fr: { print: 'Imprimer CV' },
    en: { print: 'Print CV' },
    pl: { print: 'Drukuj CV' },
    de: { print: 'Lebenslauf drucken' }
};

export const renderCvView = (data: CVData, lang: LanguageCode): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';
  element.innerHTML = `
    <button class="print-button" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      ${translations[lang].print}
    </button>
    <div class="cv-container">
      <aside class="left-column">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image">
        
        <section>
          <h2>${data.sections.contact}</h2>
          <ul class="contact-list">
            ${data.contact.map(createContactItem).join('')}
          </ul>
        </section>

        <section>
          <h2>${data.sections.skills}</h2>
          ${data.skills.map(createSkillCategory).join('')}
        </section>

        <section>
          <h2>${data.sections.languages}</h2>
          <ul>
            ${data.languages.map(createLanguageItem).join('')}
          </ul>
        </section>

        <section>
          <h2>${data.sections.status}</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </aside>

      <main class="right-column">
        <header>
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </header>

        <section>
          <h2>${data.sections.objective}</h2>
          <p>${data.personalInfo.professionalObjective}</p>
        </section>

        <section>
          <h2>${data.sections.experience}</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section>
          <h2>${data.sections.projects}</h2>
          ${data.projects.map(createProjectItem).join('')}
        </section>

        <section>
          <h2>${data.sections.education}</h2>
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
import { generateCoverLetter, getCVDataAsText } from '../services/GeminiService';
import { blobToBase64 } from '../helpers';
import { renderCvView } from './CvView';
import { CVData, LanguageCode, MultilingualCVData } from '../types';

const translations = {
  fr: {
    title: "Générateur de Lettre de Motivation",
    subtitle: "Générez une lettre de motivation personnalisée en utilisant les informations de votre CV et de l'offre d'emploi.",
    jobDescriptionLabel: "Collez la description du poste ou les détails de l'entreprise ici",
    jobDescriptionPlaceholder: "Ex: 'Nous recherchons un développeur Full Stack expérimenté avec une expertise en React et Node.js...'",
    separator: "OU",
    screenshotLabel: "Téléchargez une capture d'écran de l'offre d'emploi",
    generateButton: "Générer la lettre",
    generatingButton: "Génération en cours...",
    printLetter: "Imprimer Lettre",
    printCombined: "Imprimer CV & Lettre",
    initialOutput: "Votre lettre de motivation apparaîtra ici...",
    generatingOutput: "Génération de votre lettre de motivation, veuillez patienter...",
    alert: "Veuillez fournir une description de poste ou une capture d'écran.",
    error: "Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer."
  },
  en: {
    title: "Cover Letter Generator",
    subtitle: "Generate a personalized cover letter using information from your CV and the job offer.",
    jobDescriptionLabel: "Paste the job description or company details here",
    jobDescriptionPlaceholder: "E.g., 'We are looking for an experienced Full Stack developer with expertise in React and Node.js...'",
    separator: "OR",
    screenshotLabel: "Upload a screenshot of the job offer",
    generateButton: "Generate Letter",
    generatingButton: "Generating...",
    printLetter: "Print Letter",
    printCombined: "Print CV & Letter",
    initialOutput: "Your cover letter will appear here...",
    generatingOutput: "Generating your cover letter, please wait...",
    alert: "Please provide a job description or a screenshot.",
    error: "An error occurred while generating the letter. Please try again."
  },
  pl: {
    title: "Generator Listu Motywacyjnego",
    subtitle: "Wygeneruj spersonalizowany list motywacyjny na podstawie informacji z Twojego CV i oferty pracy.",
    jobDescriptionLabel: "Wklej tutaj opis stanowiska lub szczegóły dotyczące firmy",
    jobDescriptionPlaceholder: "Np. 'Poszukujemy doświadczonego programisty Full Stack z doświadczeniem w React i Node.js...'",
    separator: "LUB",
    screenshotLabel: "Prześlij zrzut ekranu z ofertą pracy",
    generateButton: "Generuj List",
    generatingButton: "Generowanie...",
    printLetter: "Drukuj List",
    printCombined: "Drukuj CV i List",
    initialOutput: "Twój list motywacyjny pojawi się tutaj...",
    generatingOutput: "Generowanie listu motywacyjnego, proszę czekać...",
    alert: "Proszę podać opis stanowiska lub zrzut ekranu.",
    error: "Wystąpił błąd podczas generowania listu. Proszę spróbować ponownie."
  },
  de: {
    title: "Anschreiben-Generator",
    subtitle: "Erstellen Sie ein personalisiertes Anschreiben mit Informationen aus Ihrem Lebenslauf und dem Stellenangebot.",
    jobDescriptionLabel: "Fügen Sie hier die Stellenbeschreibung oder Firmendetails ein",
    jobDescriptionPlaceholder: "Z.B. 'Wir suchen einen erfahrenen Full-Stack-Entwickler mit Fachkenntnissen in React und Node.js...'",
    separator: "ODER",
    screenshotLabel: "Laden Sie einen Screenshot des Stellenangebots hoch",
    generateButton: "Anschreiben erstellen",
    generatingButton: "Wird erstellt...",
    printLetter: "Anschreiben drucken",
    printCombined: "CV & Anschreiben drucken",
    initialOutput: "Ihr Anschreiben wird hier erscheinen...",
    generatingOutput: "Ihr Anschreiben wird erstellt, bitte warten...",
    alert: "Bitte geben Sie eine Stellenbeschreibung oder einen Screenshot an.",
    error: "Beim Erstellen des Anschreibens ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
  }
};


export const renderLetterView = (lang: LanguageCode, allCvData: MultilingualCVData): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'letter-view';
  const t = translations[lang];

  element.innerHTML = `
    <div class="generator-container">
        <h1 class="generator-title">${t.title}</h1>
        <p class="generator-subtitle">${t.subtitle}</p>

        <div class="form-group">
            <label for="job-description">${t.jobDescriptionLabel}</label>
            <textarea id="job-description" name="job-description" rows="8" placeholder="${t.jobDescriptionPlaceholder}"></textarea>
        </div>
        
        <div class="separator">${t.separator}</div>

        <div class="form-group">
            <label for="job-screenshot">${t.screenshotLabel}</label>
            <input type="file" id="job-screenshot" name="job-screenshot" accept="image/*">
        </div>

        <button class="generate-button" id="generate-btn">
            <span id="generate-btn-text">${t.generateButton}</span>
            <div id="generate-btn-spinner" class="spinner" style="display: none;"></div>
        </button>
    </div>

    <hr />

    <div id="letter-output-container">
        <button class="print-button" id="print-letter-btn" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            ${t.printLetter}
        </button>
        <button class="print-button" id="combine-print-btn" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            ${t.printCombined}
        </button>
        <div id="letter-output" contenteditable="true">
            <p style="color: #666;">${t.initialOutput}</p>
        </div>
    </div>
  `;

  // Attach event listeners
  const generateBtn = element.querySelector('#generate-btn') as HTMLButtonElement;
  const jobDescriptionInput = element.querySelector('#job-description') as HTMLTextAreaElement;
  const jobScreenshotInput = element.querySelector('#job-screenshot') as HTMLInputElement;
  const letterOutput = element.querySelector('#letter-output') as HTMLDivElement;
  const printLetterBtn = element.querySelector('#print-letter-btn') as HTMLButtonElement;
  const combinePrintBtn = element.querySelector('#combine-print-btn') as HTMLButtonElement;
  const generateBtnText = element.querySelector('#generate-btn-text') as HTMLSpanElement;
  const generateBtnSpinner = element.querySelector('#generate-btn-spinner') as HTMLDivElement;

  const setGeneratingState = (isGenerating: boolean) => {
    if (isGenerating) {
        generateBtn.setAttribute('disabled', 'true');
        generateBtnText.textContent = t.generatingButton;
        generateBtnSpinner.style.display = 'block';
    } else {
        generateBtn.removeAttribute('disabled');
        generateBtnText.textContent = t.generateButton;
        generateBtnSpinner.style.display = 'none';
    }
  };

  const handleGenerate = async () => {
    const jobDescription = jobDescriptionInput.value;
    const imageFile = jobScreenshotInput.files?.[0];

    if (!jobDescription && !imageFile) {
      alert(t.alert);
      return;
    }
    
    setGeneratingState(true);
    letterOutput.innerHTML = `<p style="color: #666;">${t.generatingOutput}</p>`;
    printLetterBtn.style.display = 'none';
    combinePrintBtn.style.display = 'none';

    try {
      const cvDataForLang = allCvData[lang];
      const cvDataString = getCVDataAsText(cvDataForLang);
      
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
      
      const result = await generateCoverLetter(cvDataString, jobDescription, imagePart, lang);
      
      letterOutput.textContent = result;
      printLetterBtn.style.display = 'flex';
      combinePrintBtn.style.display = 'flex';

    } catch (error) {
        console.error("Error generating letter:", error);
        letterOutput.innerHTML = `<p style="color: red;">${t.error}</p>`;
    } finally {
        setGeneratingState(false);
    }
  };

  const handleCombinePrint = () => {
    // 1. Create a container for printing
    const printableArea = document.createElement('div');
    printableArea.id = 'printable-area';

    // 2. Get CV content for the current language
    const cvView = renderCvView(allCvData[lang], lang);
    const cvContainer = cvView.querySelector('.cv-container');
    if (cvContainer) {
      cvContainer.classList.add('page-break');
      printableArea.appendChild(cvContainer);
    }
    
    // 3. Get Letter content
    const letterOutputClone = element.querySelector('#letter-output')?.cloneNode(true) as HTMLElement;
    if (letterOutputClone) {
        printableArea.appendChild(letterOutputClone);
    }

    // 4. Add to DOM and add class to body for print styles
    document.body.appendChild(printableArea);
    document.body.classList.add('printing-combined');
    
    // 5. Setup cleanup
    const cleanup = () => {
        document.body.classList.remove('printing-combined');
        if (document.body.contains(printableArea)) {
            document.body.removeChild(printableArea);
        }
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    // 6. Print
    window.print();
  };

  generateBtn.addEventListener('click', handleGenerate);
  printLetterBtn.addEventListener('click', () => window.print());
  combinePrintBtn.addEventListener('click', handleCombinePrint);

  return element;
};
]]>
    </file>
    <file path="src/data/cv-data.json">
      <![CDATA[
{
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
      "title": "Développeur Full Stack | Spécialiste TypeScript, React & Node.js",
      "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
      "professionalObjective": "Développeur Full Stack avec 2 ans d'expérience dans la conception d'applications web performantes. Je cherche à rejoindre une équipe dynamique pour construire des produits innovants. Désireux de mettre mes compétences en pratique dans un environnement francophone, je suis passionné par la résolution de problèmes complexes et la création d'expériences utilisateur de haute qualité.",
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
      { "title": "Langages", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
      { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"] },
      { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel", "Symfony"] },
      { "title": "Bases de Données", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
      { "title": "Cloud & DevOps", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
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
      { "title": "Développeur Web Full Stack", "company": "Basesystem", "period": "Février 2024 - Présent", "responsibilities": [ "En collaboration avec l'équipe Produit, conception et déploiement de 3 fonctionnalités majeures pour une plateforme e-commerce, résultant en une <strong>augmentation de 15%</strong> de l'engagement client.", "Optimisation du backend (<strong>Laravel, MySQL</strong>) pour réduire le temps de réponse moyen des API de <strong>30%</strong>, améliorant ainsi l'expérience sur le frontend <strong>React</strong>.", "Intégration de l'API de paiement <strong>Stripe</strong>, sécurisant le flux de transactions et augmentant le taux de conversion de <strong>5%</strong>." ] },
      { "title": "Développeur Web Full Stack (Freelance)", "company": "", "period": "Janvier 2024 - Présent", "responsibilities": [ "Gestion de projet et développement de A à Z pour 4 applications web, en <strong>communication directe avec les clients</strong> pour définir les besoins et livrer des solutions sur-mesure.", "Mise en place d'architectures backend robustes avec <strong>Node.js</strong> et <strong>Nest.js</strong>, en suivant les principes de clean architecture." ] }
    ],
    "projects": [
      { "name": "Lexity : AI Language Learning PWA", "url": "https://lexity.app", "description": "Création d'une PWA visant à <strong>réduire le temps d'apprentissage de 30%</strong> en forçant la pratique active via des retours IA.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" },
      { "name": "Interly : AI Interview Prep Platform", "url": "https://interly.app", "description": "Développement d'une plateforme visant à <strong>augmenter la confiance des candidats</strong> et leurs performances en entretien grâce à des simulations IA.", "stack_title": "Stack Technique", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architecture multi-IA (Google, Groq, Cerebras).</strong>" },
      { "name": "ZIRO.FIT : Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Plateforme permettant aux coachs sportifs de <strong>créer des pages personnalisées</strong> pour présenter leur travail et gérer leur activité.", "stack_title": "Stack Technique", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
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
      "title": "Full Stack Developer | TypeScript, React & Node.js Specialist",
      "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
      "professionalObjective": "Full Stack Developer with 2 years of experience in designing high-performance web applications. I am looking to join a dynamic team to build innovative products. Eager to apply my skills in a French-speaking environment, I am passionate about solving complex problems and creating high-quality user experiences.",
      "status": "Eligible for a work visa in France."
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
      { "title": "Languages", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
      { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"] },
      { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel", "Symfony"] },
      { "title": "Databases", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
      { "title": "Cloud & DevOps", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
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
      { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "February 2024 - Present", "responsibilities": [ "In collaboration with the Product team, designed and deployed 3 major features for an e-commerce platform, resulting in a <strong>15% increase</strong> in customer engagement.", "Optimized the backend (<strong>Laravel, MySQL</strong>) to reduce average API response time by <strong>30%</strong>, thereby improving the frontend <strong>React</strong> experience.", "Integrated the <strong>Stripe</strong> payment API, securing the transaction flow and increasing the conversion rate by <strong>5%</strong>." ] },
      { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "January 2024 - Present", "responsibilities": [ "End-to-end project management and development for 4 web applications, in <strong>direct communication with clients</strong> to define needs and deliver custom solutions.", "Implemented robust backend architectures with <strong>Node.js</strong> and <strong>Nest.js</strong>, following clean architecture principles." ] }
    ],
    "projects": [
      { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Creation of a PWA aiming to <strong>reduce learning time by 30%</strong> by forcing active practice through AI feedback.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-IA Architecture (Google, Groq, Cerebras).</strong>" },
      { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Development of a platform aimed at <strong>increasing candidate confidence</strong> and interview performance through AI simulations.", "stack_title": "Tech Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-IA Architecture (Google, Groq, Cerebras).</strong>" },
      { "name": "ZIRO.FIT: Fitness Trainer Platform", "url": "https://ziro.fit", "description": "A platform allowing fitness trainers to <strong>create personalized pages</strong> to showcase their work and manage their business.", "stack_title": "Tech Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
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
      "title": "Full Stack Developer | Specjalista TypeScript, React i Node.js",
      "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
      "professionalObjective": "Full Stack Developer z 2-letnim doświadczeniem w projektowaniu wydajnych aplikacji internetowych. Chcę dołączyć do dynamicznego zespołu, aby tworzyć innowacyjne produkty. Chętny do wykorzystania moich umiejętności w środowisku francuskojęzycznym, pasjonuję się rozwiązywaniem złożonych problemów i tworzeniem wysokiej jakości doświadczeń użytkownika.",
      "status": "Uprawniony do wizy pracowniczej we Francji."
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
      { "title": "Języki programowania", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
      { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"] },
      { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel", "Symfony"] },
      { "title": "Bazy danych", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
      { "title": "Cloud & DevOps", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
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
      { "title": "Full Stack Web Developer", "company": "Basesystem", "period": "Luty 2024 - Obecnie", "responsibilities": [ "We współpracy z zespołem produktowym, projektowanie i wdrażanie 3 głównych funkcji dla platformy e-commerce, co zaowocowało <strong>15% wzrostem</strong> zaangażowania klientów.", "Optymalizacja backendu (<strong>Laravel, MySQL</strong>) w celu skrócenia średniego czasu odpowiedzi API o <strong>30%</strong>, co poprawiło doświadczenie na frontendzie <strong>React</strong>.", "Integracja API płatności <strong>Stripe</strong>, zabezpieczająca przepływ transakcji i zwiększająca współczynnik konwersji o <strong>5%</strong>." ] },
      { "title": "Full Stack Web Developer (Freelance)", "company": "", "period": "Styczeń 2024 - Obecnie", "responsibilities": [ "Zarządzanie projektami i rozwój od A do Z dla 4 aplikacji internetowych, w <strong>bezpośredniej komunikacji z klientami</strong> w celu zdefiniowania potrzeb i dostarczenia niestandardowych rozwiązań.", "Wdrażanie solidnych architektur backendowych z <strong>Node.js</strong> i <strong>Nest.js</strong>, zgodnie z zasadami czystej architektury." ] }
    ],
    "projects": [
      { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Stworzenie PWA mającego na celu <strong>skrócenie czasu nauki o 30%</strong> poprzez wymuszanie aktywnej praktyki za pomocą informacji zwrotnej od AI.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" },
      { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Rozwój platformy mającej na celu <strong>zwiększenie pewności siebie kandydatów</strong> i ich wyników na rozmowach kwalifikacyjnych dzięki symulacjom AI.", "stack_title": "Stos technologiczny", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Architektura multi-AI (Google, Groq, Cerebras).</strong>" },
      { "name": "ZIRO.FIT: Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Platforma umożliwiająca trenerom fitness <strong>tworzenie spersonalizowanych stron</strong> w celu prezentacji swojej pracy i zarządzania działalnością.", "stack_title": "Stos technologiczny", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
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
      "title": "Full-Stack-Entwickler | Spezialist für TypeScript, React & Node.js",
      "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/122200152-YhxIS7i2EtNGRFTwhs3Z9fnxfJwHBP.jpeg",
      "professionalObjective": "Full-Stack-Entwickler mit 2 Jahren Erfahrung in der Konzeption von leistungsstarken Webanwendungen. Ich möchte einem dynamischen Team beitreten, um innovative Produkte zu entwickeln. Ich bin bestrebt, meine Fähigkeiten in einem französischsprachigen Umfeld einzusetzen, und begeistere mich für die Lösung komplexer Probleme und die Schaffung hochwertiger Benutzererfahrungen.",
      "status": "Berechtigt für ein Arbeitsvisum in Frankreich."
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
      { "title": "Sprachen", "skills": ["TypeScript", "JavaScript (ES6+)", "PHP", "SQL"] },
      { "title": "Frontend", "skills": ["React", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"] },
      { "title": "Backend", "skills": ["Node.js", "Nest.js", "Express", "Laravel", "Symfony"] },
      { "title": "Datenbanken", "skills": ["PostgreSQL", "MySQL", "MongoDB"] },
      { "title": "Cloud & DevOps", "skills": ["Supabase", "Google Cloud", "Docker", "Git", "CI/CD (GitHub Actions)"] }
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
      { "title": "Full-Stack-Webentwickler", "company": "Basesystem", "period": "Februar 2024 - Heute", "responsibilities": [ "In Zusammenarbeit mit dem Produktteam Konzeption und Bereitstellung von 3 Hauptfunktionen für eine E-Commerce-Plattform, was zu einer <strong>15%igen Steigerung</strong> des Kundenengagements führte.", "Optimierung des Backends (<strong>Laravel, MySQL</strong>), um die durchschnittliche API-Antwortzeit um <strong>30%</strong> zu reduzieren und so das Frontend-Erlebnis mit <strong>React</strong> zu verbessern.", "Integration der <strong>Stripe</strong>-Zahlungs-API, um den Transaktionsfluss zu sichern und die Konversionsrate um <strong>5%</strong> zu erhöhen." ] },
      { "title": "Full-Stack-Webentwickler (Freiberufler)", "company": "", "period": "Januar 2024 - Heute", "responsibilities": [ "End-to-End-Projektmanagement und -Entwicklung für 4 Webanwendungen in <strong>direkter Kommunikation mit Kunden</strong>, um Bedürfnisse zu definieren und maßgeschneiderte Lösungen zu liefern.", "Implementierung robuster Backend-Architekturen mit <strong>Node.js</strong> und <strong>Nest.js</strong> nach den Prinzipien der Clean Architecture." ] }
    ],
    "projects": [
      { "name": "Lexity: AI Language Learning PWA", "url": "https://lexity.app", "description": "Erstellung einer PWA mit dem Ziel, die <strong>Lernzeit um 30% zu reduzieren</strong>, indem aktives Üben durch KI-Feedback erzwungen wird.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" },
      { "name": "Interly: AI Interview Prep Platform", "url": "https://interly.app", "description": "Entwicklung einer Plattform zur <strong>Steigerung des Selbstvertrauens von Bewerbern</strong> und ihrer Leistung in Vorstellungsgesprächen durch KI-Simulationen.", "stack_title": "Technologie-Stack", "stack": "<strong>Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Multi-KI-Architektur (Google, Groq, Cerebras).</strong>" },
      { "name": "ZIRO.FIT: Fitness Trainer Platform", "url": "https://ziro.fit", "description": "Eine Plattform, die es Fitnesstrainern ermöglicht, <strong>personalisierte Seiten zu erstellen</strong>, um ihre Arbeit zu präsentieren und ihr Geschäft zu verwalten.", "stack_title": "Technologie-Stack", "stack": "<strong>Laravel, Livewire, Alpine.js, Tailwind CSS, PostgreSQL, AWS.</strong>" }
    ],
    "education": [
      { "degree": "Diplom als Techniker für Radioelektronik (entspricht Bachelor-Abschluss)", "institution": "Staatliches Höheres Kolleg für Radiotechnik Minsk", "period": "2015 - 2019" }
    ]
  }
}
]]>
    </file>
    <file path="src/services/GeminiService.ts">
      <![CDATA[
import axios from 'axios';
import { CVData, LanguageCode } from '../types';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const MODEL_NAME = "gemini-flash-latest";
const API_URL = `/api/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

type HarmCategory =
  | "HARM_CATEGORY_HARASSMENT"
  | "HARM_CATEGORY_HATE_SPEECH"
  | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
  | "HARM_CATEGORY_DANGEROUS_CONTENT";

type HarmBlockThreshold = "BLOCK_MEDIUM_AND_ABOVE";

const safetySettings: { category: HarmCategory; threshold: HarmBlockThreshold }[] = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
];

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

export const getCVDataAsText = (data: CVData): string => {
    let cvText = "";

    const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

    cvText += `Name: ${data.personalInfo.name}\n`;
    cvText += `Title: ${data.personalInfo.title}\n\n`;
    cvText += `## ${data.sections.objective}\n${data.personalInfo.professionalObjective}\n\n`;

    cvText += `## ${data.sections.experience}\n`;
    data.experience.forEach(job => {
        cvText += `${job.title}\n`;
        if (job.company) cvText += `${job.company} | `;
        cvText += `${job.period}\n`;
        job.responsibilities.forEach(res => {
            cvText += `- ${stripHtml(res)}\n`;
        });
        cvText += '\n';
    });

    cvText += `## ${data.sections.projects}\n`;
    data.projects.forEach(project => {
        cvText += `${project.name} (${project.url})\n`;
        cvText += `${stripHtml(project.description)}\n`;
        cvText += `${project.stack_title} : ${stripHtml(project.stack)}\n\n`;
    });

    cvText += `## ${data.sections.skills}\n`;
    data.skills.forEach(category => {
        cvText += `${category.title}: ${category.skills.join(', ')}\n`;
    });
    cvText += '\n';

    cvText += `## ${data.sections.education}\n`;
    data.education.forEach(edu => {
        cvText += `${edu.degree}\n`;
        cvText += `${edu.institution} | ${edu.period}\n\n`;
    });
    
    cvText += `## ${data.sections.languages}\n`;
    data.languages.forEach(lang => {
        cvText += `${lang.name}: ${lang.level}\n`;
    });
    cvText += '\n';
    
    cvText += `## ${data.sections.contact}\n`;
    data.contact.forEach(c => {
        cvText += `${c.text}${c.url ? ` (${c.url})` : ''}\n`;
    });
    cvText += '\n';

    return cvText.trim();
};

const promptInstructions: Record<LanguageCode, string> = {
  fr: `Vous êtes un coach carrière expert, spécialisé dans le marché du travail français. Votre mission est de rédiger une lettre de motivation exceptionnelle, prête à l'emploi.
**Instructions de rédaction :** Rédigez une lettre de motivation complète et professionnelle en **français uniquement**.`,
  en: `You are an expert career coach specializing in the French job market. Your mission is to write an outstanding, ready-to-use cover letter.
**Writing Instructions:** Write a complete and professional cover letter in **English only**.`,
  pl: `Jesteś ekspertem ds. kariery, specjalizującym się we francuskim rynku pracy. Twoim zadaniem jest napisanie wyjątkowego, gotowego do użycia listu motywacyjnego.
**Instrukcje pisania:** Napisz kompletny i profesjonalny list motywacyjny **wyłącznie w języku polskim**.`,
  de: `Sie sind ein erfahrener Karrierecoach, der auf den französischen Arbeitsmarkt spezialisiert ist. Ihre Aufgabe ist es, ein herausragendes, gebrauchsfertiges Anschreiben zu verfassen.
**Schreibanweisungen:** Verfassen Sie ein vollständiges und professionelles Anschreiben **nur auf Deutsch**.`,
};

const getBasePrompt = (lang: LanguageCode) => `
${promptInstructions[lang]}

La lettre doit être structurée comme suit, sans utiliser de placeholders comme "[Vos Coordonnées]" ou "[Coordonnées de l'entreprise]".

1.  **En-tête de l'expéditeur :** Intégrez directement les informations de contact du candidat (Nom, Titre, Téléphone, Email, etc.) de manière claire et professionnelle en haut à gauche.
2.  **Destinataire :** Si le nom d'un contact ou de l'entreprise est disponible dans la description, adressez-lui la lettre. Sinon, utilisez une formule générique comme "À l'attention du Service Recrutement". Incluez la ville si possible.
3.  **Lieu :** Ajoutez uniquement le lieu de résidence du candidat (par exemple : "Cracovie,"). **N'incluez PAS la date.**
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
*   **FORMATAGE :** La sortie doit être du **texte brut (plain text) uniquement**. N'utilisez AUCUN formatage Markdown (pas de **, *, #, listes, etc.).

Générez uniquement le texte brut et complet de la lettre, en commençant par le nom du candidat.
`;

export const generateCoverLetter = async (cvData: string, jobInfo: string, imagePart: any | null, lang: LanguageCode): Promise<string> => {
    const prompt = `
${getBasePrompt(lang)}

**Informations sur le candidat (extrait du CV) :**
---
${cvData}
---

**Informations sur le poste/l'entreprise :**
---
${jobInfo || "Veuillez analyser l'image ci-jointe pour la description du poste et les informations sur l'entreprise."}
---
`;

    const parts: any[] = [{ text: prompt }];
    if (imagePart) {
        parts.push(imagePart);
    }

    const payload = {
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    };

    try {
        const response = await axios.post(API_URL, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            console.error("Invalid response structure from Gemini API:", response.data);
            throw new Error("Empty or invalid response from Gemini API");
        }
        return text.trim();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data?.error;
            console.error("Axios error calling Gemini API:", errorData || error.message);
            const errorMessage = errorData ? `${errorData.message} (Code: ${errorData.code})` : error.message;
            throw new Error(`API call failed: ${errorMessage}`);
        }
        console.error("Unknown error calling Gemini API:", error);
        throw error;
    }
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
  position: sticky;
  top: 0;
  z-index: 1001;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
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

.lang-switcher {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;
}

.lang-switch {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent-color);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.lang-switch:hover {
  background-color: #f0f2f5;
}

.lang-switch.active {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
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

#letter-output-container #print-letter-btn,
#letter-output-container #combine-print-btn {
  position: absolute;
  right: 1rem;
  z-index: 10;
}

#letter-output-container #print-letter-btn {
  top: 1rem;
}

#letter-output-container #combine-print-btn {
  top: calc(1rem + 48px);
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

#printable-area {
  display: none;
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
  
  .app-nav, .print-button, #letter-view .generator-container, #print-letter-btn, #combine-print-btn {
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

  .page-break {
    page-break-after: always;
  }

  body.printing-combined > *:not(#printable-area) {
    display: none !important;
  }

  body.printing-combined #printable-area {
    display: block !important;
  }
}
]]>
    </file>
    <file path="src/types.ts">
      <![CDATA[
export type LanguageCode = 'fr' | 'en' | 'pl' | 'de';

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
  stack_title: string;
  stack: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  sections: {
    contact: string;
    skills: string;
    languages: string;
    status: string;
    objective: string;
    experience: string;
    projects: string;
    education: string;
  };
  personalInfo: PersonalInfo;
  contact: Contact[];
  skills: SkillCategory[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export type MultilingualCVData = Record<LanguageCode, CVData>;
]]>
    </file>
  </modifications>
</response>