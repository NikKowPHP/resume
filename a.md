<response>
  <reasoning>
    My plan is to refactor the Cover Letter page to have a modern, dashboard-like layout, as requested. This will improve the user experience by placing the controls and the output side-by-side, avoiding the need to scroll between them.

    Here's my approach:
    1.  **Restructure the Layout (`LetterView.ts`):** I will remove the horizontal rule (`<hr />`) that separates the form from the output. The existing HTML structure, with the `generator-container` and `letter-output-container` as siblings, is already perfect for a flexbox-based two-column layout.

    2.  **Update Styles (`base.css`):**
        *   I will modify the styles for the main `#letter-view` container, changing it from a single-column block to a flexbox container. This will arrange its children (the form and the output) into columns.
        *   I will then apply panel-like styling (background, padding, shadow) to both the `.generator-container` (left column) and `#letter-output-container` (right column) to visually separate them.
        *   To enhance usability, I'll make the `.generator-container` sticky, so the controls remain visible even if the generated letter on the right is long enough to scroll.

    3.  **Update Task List:** I will add a new task to `TASKS.md` to document this layout update and mark it as complete.
  </reasoning>
  <modifications>
    <file path="TASKS.md">
      <![CDATA[
- [x] Add language switcher for the cv and letter cover.
- [x] Refactor AI prompt to use a single, standardized English version.
- [x] Implement selectable CV templates with a preview.
- [x] Add more CV templates ('Compact' and 'Corporate').
- [x] Refactor CSS into template-specific files.
- [x] Update Cover Letter page to a dashboard-style layout.
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
    <file path="src/styles/base.css">
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

/* --- NAVIGATION & CONTROLS --- */
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
.nav-link:hover { color: var(--heading-color); }
.nav-link.active { color: var(--link-color); border-bottom-color: var(--link-color); }

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
.lang-switch:hover { background-color: #f0f2f5; }
.lang-switch.active { background-color: var(--link-color); color: white; border-color: var(--link-color); }

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
.switcher-label { font-size: 13px; font-weight: 500; margin-right: 4px; }

.template-btn {
  background-color: transparent;
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.template-btn.active, .template-btn:hover { background-color: var(--link-color); color: white; border-color: var(--link-color); }

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
.print-button:hover { background-color: var(--button-hover-color); transform: translateY(-1px); }

#app-container {
  padding-top: 1rem;
}


/* --- LETTER VIEW --- */
#letter-view {
    display: flex;
    gap: 2rem;
    max-width: 1400px;
    margin: 1rem auto;
    align-items: flex-start;
}

.generator-container {
    flex: 1;
    max-width: 450px;
    background-color: var(--cv-background);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-color);
    position: sticky;
    top: 80px;
}

#letter-output-container {
    flex: 1.5;
    background-color: var(--cv-background);
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-color);
    position: relative;
}

.generator-title { font-size: 1.75rem; font-weight: 700; color: var(--heading-color); margin-bottom: 0.5rem; text-align: center; }
.generator-subtitle { text-align: center; margin-bottom: 2rem; color: var(--accent-color); font-size: 1rem; }

.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--heading-color); }
.form-group textarea { width: 100%; min-height: 150px; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 0.9rem; resize: vertical; }
.form-group input[type="file"] { font-size: 0.9rem; }

.separator { text-align: center; margin: 1.5rem 0; color: var(--accent-color); font-weight: 500; }

.generate-button { display: flex; justify-content: center; align-items: center; gap: 0.75rem; width: 100%; padding: 0.8rem 1rem; font-size: 1rem; font-weight: 500; color: #fff; background-color: var(--link-color); border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.2s ease; }
.generate-button:hover { background-color: var(--button-hover-color); }
.generate-button:disabled { background-color: var(--accent-color); cursor: not-allowed; }

.spinner { width: 18px; height: 18px; border: 2px solid var(--spinner-color); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

#letter-output { background-color: #fff; border: 1px solid var(--border-color); padding: 2rem; border-radius: 6px; min-height: 297mm; line-height: 1.5; font-size: 10pt; white-space: pre-wrap; }
#letter-output-container .print-button { position: absolute; right: 1rem; top: 1rem; }
#letter-output-container #combine-print-btn { top: calc(1rem + 50px); }

/* --- GLOBAL TYPOGRAPHY & SHARED STYLES --- */
h1 { font-size: 1.75rem; font-weight: 700; color: var(--heading-color); margin-bottom: 0.2rem; letter-spacing: 1px; }
h2 { font-size: 0.8rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.5rem; padding-bottom: 0.3rem; border-bottom: 2px solid var(--border-color); }
h3 { font-size: 0.9rem; font-weight: 500; color: var(--heading-color); margin-bottom: 0.5rem; }
h4 { font-size: 0.9rem; font-weight: 700; color: var(--heading-color); margin-bottom: 0.2rem; }
p { margin-bottom: 0.4rem; }
a { color: var(--link-color); text-decoration: none; transition: color 0.2s ease-in-out; word-break: break-word; }
a:hover { color: var(--button-hover-color); text-decoration: underline; }
section { margin-bottom: 0.9rem; }
ul { list-style: none; padding-left: 0; }
strong { font-weight: 700; color: var(--heading-color); }

/* --- PRINT STYLES --- */
#printable-area { display: none; }

@media print {
  @page { size: A4; margin: 0; }
  
  body { background-color: #fff; margin: 0; padding: 0; font-size: 9pt; }
  
  .app-nav, .view-controls, #letter-view .generator-container, #letter-output-container .print-button { display: none !important; }
  
  #app-container { padding: 0; }
  
  .cv-container, .cv-container-modern, .cv-container-compact, .cv-container-corporate, #letter-output {
    margin: 0; box-shadow: none; width: 210mm; height: 297mm; min-height: 297mm; max-height: 297mm;
  }
  
  #letter-view { padding: 0; box-shadow: none; background-color: transparent; }
  #letter-output { border: none; padding: 1rem; font-size: 9pt; }
  .page-break { page-break-after: always; }
  body.printing-combined > *:not(#printable-area) { display: none !important; }
  body.printing-combined #printable-area { display: block !important; }
}
]]>
    </file>
  </modifications>
</response>