<response>
  <reasoning>
    My plan is to implement a CV template switcher. This will allow the user to select from different visual layouts for their CV.

    Here's a breakdown of the steps:

    1.  **Create a New `cv-templates` Directory:** I'll create a new directory at `src/components/cv-templates` to house the different template rendering functions. This keeps the templates modular and organized.

    2.  **Refactor the Existing CV View:** The current logic in `src/components/CvView.ts` will be moved into a new `ClassicTemplate.ts` file inside the `cv-templates` directory. This will become the default template.

    3.  **Create a New 'Modern' Template:** I will create a second template, `ModernTemplate.ts`, with a distinct single-column layout to demonstrate the switching capability.

    4.  **Update `CvView.ts` to be a Template Manager:** The `CvView.ts` component will be refactored to:
        *   Render a UI for selecting a template (e.g., "Classic" or "Modern").
        *   Manage the currently selected template state.
        *   Dynamically render the chosen template's HTML.
        *   Use `localStorage` to persist the user's template choice across sessions and different views.

    5.  **Update `LetterView.ts` for Printing:** The "Print CV & Letter" functionality in `LetterView.ts` needs to be aware of the selected CV template. It will now read the selected template from `localStorage` and use the corresponding template renderer to generate the correct CV layout for the combined print view.

    6.  **Update Styles:** I will add styles for the new template switcher UI in `styles.css`. I'll also scope the existing CV styles to the "Classic" template and add new styles for the "Modern" template to ensure they don't conflict.

    7.  **Update Task List:** I will add the new feature to `TASKS.md` and mark it as complete.
  </reasoning>
  <commands>
    <![CDATA[
mkdir -p "src/components/cv-templates"
]]>
  </commands>
  <modifications>
    <file path="TASKS.md">
      <![CDATA[
- [x] Add language switcher for the cv and letter cover.
- [x] Refactor AI prompt to use a single, standardized English version.
- [x] Implement selectable CV templates with a preview.
]]>
    </file>
    <file path="src/components/CvView.ts">
      <![CDATA[
import { CVData, LanguageCode } from '../types';
import { templates } from './cv-templates';

const translations = {
    fr: { print: 'Imprimer CV', templates: 'Modèles' },
    en: { print: 'Print CV', templates: 'Templates' },
    pl: { print: 'Drukuj CV', templates: 'Szablony' },
    de: { print: 'Lebenslauf drucken', templates: 'Vorlagen' }
};

export const renderCvView = (data: CVData, lang: LanguageCode): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';

  let selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;

  const render = () => {
    element.innerHTML = `
      <div class="view-controls">
        <div class="template-switcher">
          <span class="switcher-label">${translations[lang].templates}:</span>
          ${Object.entries(templates).map(([id, { name }]) => `
            <button class="template-btn ${id === selectedTemplateId ? 'active' : ''}" data-template-id="${id}">
              ${name}
            </button>
          `).join('')}
        </div>
        <button class="print-button" id="print-cv-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          ${translations[lang].print}
        </button>
      </div>
      <div id="cv-render-output" class="${selectedTemplateId}-template">
        ${templates[selectedTemplateId].render(data, lang)}
      </div>
    `;

    // Re-attach event listeners after every render
    attachListeners();
  };

  const attachListeners = () => {
    element.querySelector('#print-cv-btn')?.addEventListener('click', () => window.print());

    element.querySelectorAll('.template-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const newTemplateId = target.dataset.templateId as keyof typeof templates;
        if (newTemplateId && newTemplateId !== selectedTemplateId) {
          selectedTemplateId = newTemplateId;
          localStorage.setItem('selectedCvTemplate', newTemplateId);
          render(); // Re-render the whole view with the new template
        }
      });
    });
  };

  render();
  return element;
};
]]>
    </file>
    <file path="src/components/LetterView.ts">
      <![CDATA[
import { generateCoverLetter, getCVDataAsText } from '../services/GeminiService';
import { blobToBase64 } from '../helpers';
import { templates } from './cv-templates';
import { LanguageCode, MultilingualCVData } from '../types';

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
    const printableArea = document.createElement('div');
    printableArea.id = 'printable-area';
    
    // 1. Get CV content for the current language and selected template
    const selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;
    const cvDataForLang = allCvData[lang];
    const templateRenderer = templates[selectedTemplateId].render;
    const cvHtmlString = templateRenderer(cvDataForLang, lang);
    
    const cvPrintContainer = document.createElement('div');
    cvPrintContainer.className = `${selectedTemplateId}-template page-break`;
    cvPrintContainer.innerHTML = cvHtmlString;
    printableArea.appendChild(cvPrintContainer);
    
    // 2. Get Letter content
    const letterOutputClone = element.querySelector('#letter-output')?.cloneNode(true) as HTMLElement;
    if (letterOutputClone) {
        printableArea.appendChild(letterOutputClone);
    }

    // 3. Add to DOM and add class to body for print styles
    document.body.appendChild(printableArea);
    document.body.classList.add('printing-combined');
    
    // 4. Setup cleanup
    const cleanup = () => {
        document.body.classList.remove('printing-combined');
        if (document.body.contains(printableArea)) {
            document.body.removeChild(printableArea);
        }
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    // 5. Print
    window.print();
  };

  generateBtn.addEventListener('click', handleGenerate);
  printLetterBtn.addEventListener('click', () => window.print());
  combinePrintBtn.addEventListener('click', handleCombinePrint);

  return element;
};
]]>
    </file>
    <file path="src/components/cv-templates/ClassicTemplate.ts">
      <![CDATA[
import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

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

export const render = (data: CVData, lang: LanguageCode): string => {
  return `
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
};
]]>
    </file>
    <file path="src/components/cv-templates/ModernTemplate.ts">
      <![CDATA[
import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => `
  <div class="contact-item-modern">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.svgPath}</svg>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`}
  </div>
`;

const createSkillCategory = (category: SkillCategory) => `
  <div class="skill-category-modern">
    <h4 class="skill-title-modern">${category.title}</h4>
    <p>${category.skills.join(' &bull; ')}</p>
  </div>
`;

const createLanguageItem = (lang: Language) => `
  <span><strong>${lang.name}:</strong> ${lang.level}</span>
`;

const createExperienceItem = (job: Experience) => `
  <div class="job-modern">
    <div class="job-header-modern">
      <h4>${job.title}</h4>
      <p class="company-info-modern">${job.company} | ${job.period}</p>
    </div>
    <ul>
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="job-modern">
     <div class="job-header-modern">
        <h4><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a></h4>
     </div>
    <p>${project.description}</p>
    <p><strong>${project.stack_title}:</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job-modern">
    <h4>${edu.degree}</h4>
    <p class="company-info-modern">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const render = (data: CVData, lang: LanguageCode): string => {
  return `
    <div class="cv-container-modern">
      <header class="header-modern">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image-modern">
        <div class="header-text-modern">
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </div>
      </header>
      
      <section class="contact-modern">
        ${data.contact.map(createContactItem).join('')}
      </section>

      <div class="main-content-modern">
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
          <h2>${data.sections.skills}</h2>
          <div class="skills-grid-modern">
            ${data.skills.map(createSkillCategory).join('')}
          </div>
        </section>

        <section>
          <h2>${data.sections.education}</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>

        <section>
          <h2>${data.sections.languages}</h2>
          <div class="languages-modern">
            ${data.languages.map(createLanguageItem).join(' &bull; ')}
          </div>
        </section>

        <section>
          <h2>${data.sections.status}</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </div>
    </div>
  `;
};
]]>
    </file>
    <file path="src/components/cv-templates/index.ts">
      <![CDATA[
import { render as renderClassic } from './ClassicTemplate';
import { render as renderModern } from './ModernTemplate';

export const templates = {
  classic: {
    name: 'Classic',
    render: renderClassic
  },
  modern: {
    name: 'Modern',
    render: renderModern
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

.view-controls {
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.template-switcher {
  background-color: var(--cv-background);
  padding: 6px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 6px;
}
.switcher-label {
  font-size: 13px;
  font-weight: 500;
  margin-right: 4px;
}

.template-btn {
  background-color: transparent;
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.template-btn.active, .template-btn:hover {
  background-color: var(--link-color);
  color: white;
  border-color: var(--link-color);
}


.print-button {
  background-color: var(--link-color);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.print-button:hover {
  background-color: var(--button-hover-color);
  transform: translateY(-1px);
}

#app-container {
  padding-top: 1rem;
}


/* --- LETTER VIEW --- */
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

#letter-output-container .print-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

#letter-output-container #combine-print-btn {
  top: calc(1rem + 50px);
}

/* --- GLOBAL CV STYLES (SHARED) --- */
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

section {
  margin-bottom: 0.9rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

strong {
  font-weight: 700;
  color: var(--heading-color);
}

/* --- CLASSIC TEMPLATE STYLES --- */
.classic-template .cv-container {
  display: flex;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background-color: var(--cv-background);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.classic-template .left-column {
  width: 35%;
  background-color: var(--left-column-background);
  padding: 1.2rem;
  border-right: 1px solid var(--border-color);
}

.classic-template .right-column {
  width: 65%;
  padding: 1.2rem;
}

.classic-template .profile-image {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  border: 4px solid var(--cv-background);
  display: block;
  object-fit: cover;
}

.classic-template .right-column h3 {
  font-size: 0.95rem;
  color: var(--accent-color);
}

.classic-template .job h4 a {
  color: var(--link-color);
  text-decoration: none;
  border-bottom: 1.5px solid var(--link-color);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.classic-template .job h4 a:hover {
  color: var(--button-hover-color);
  border-bottom-color: var(--button-hover-color);
  background-color: rgba(43, 108, 176, 0.05);
}

.classic-template .left-column ul li {
  margin-bottom: 0.45rem;
  font-size: 0.85em;
}

.classic-template .left-column ul.contact-list li {
  display: flex;
  align-items: flex-start;
}

.classic-template .left-column ul.contact-list li svg {
  margin-right: 0.6rem;
  flex-shrink: 0;
  color: var(--accent-color);
  margin-top: 2px;
}

.classic-template .left-column h3 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--heading-color);
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
}

.classic-template .left-column p {
  font-size: 0.85em;
  line-height: 1.3;
}

.classic-template .job {
  margin-bottom: 0.8rem;
}

.classic-template .company-info {
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 0.3rem;
  font-size: 0.9em;
}

.classic-template .right-column ul {
  padding-left: 1.2rem;
}

.classic-template .right-column ul li {
  list-style-type: disc;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

/* --- MODERN TEMPLATE STYLES --- */
.modern-template .cv-container-modern {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background-color: var(--cv-background);
  box-shadow: 0 4px 12px var(--shadow-color);
  padding: 1.5rem;
}

.modern-template .header-modern {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 1rem;
}

.modern-template .profile-image-modern {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 1.5rem;
  object-fit: cover;
}

.modern-template .header-text-modern {
  flex-grow: 1;
}

.modern-template .contact-modern {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: center;
  padding: 0.75rem;
  background-color: var(--left-column-background);
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.modern-template .contact-item-modern {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9em;
}

.modern-template .contact-item-modern svg {
  color: var(--accent-color);
}

.modern-template .job-modern {
  margin-bottom: 1rem;
}
.modern-template .job-header-modern {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.2rem;
}
.modern-template .company-info-modern {
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9em;
}
.modern-template ul {
  padding-left: 1.2rem;
}
.modern-template ul li {
  list-style-type: disc;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

.modern-template .skills-grid-modern {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}
.modern-template .skill-title-modern {
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
}
.modern-template .languages-modern {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}


/* --- PRINT STYLES --- */
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
  
  .app-nav, .view-controls, #letter-view .generator-container, #letter-output-container .print-button {
    display: none !important;
  }
  
  #app-container {
    padding: 0;
  }
  
  .cv-container, .cv-container-modern, #letter-output {
    margin: 0;
    box-shadow: none;
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    max-height: 297mm;
  }
  
  .classic-template .left-column, .classic-template .right-column, .modern-template .cv-container-modern {
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
  </modifications>
</response>