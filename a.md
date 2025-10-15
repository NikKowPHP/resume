```xml
<response>
  <reasoning>
    My plan is to update the document title dynamically when the user initiates a print action. This will ensure the saved PDF file has a descriptive name as requested. I will modify the print event handlers in `CvView.ts` and `LetterView.ts`.

    1.  **`src/components/CvView.ts`**: I will intercept the click on the "Print CV" button. Before calling `window.print()`, I will construct a new title string with the format: `[Full Name] - [Language] - [CV Title] - CV`. I'll also add an `afterprint` event listener to restore the original document title after the print dialog is closed.

    2.  **`src/components/LetterView.ts`**: This file has two print buttons ("Print Letter" and "Print CV & Letter"). I will apply similar logic to both.
        -   For "Print Letter", the title will be `... - [Cover Letter]`.
        -   For "Print CV & Letter", the title will be `... - [CV & Cover Letter]`.
        The document type part of the title will be correctly translated based on the selected language.

    3.  **`TASKS.md`**: I will add a new task for this feature and mark it as complete.
  </reasoning>
  <modifications>
    <file path="src/components/CvView.ts">
      <![CDATA[
import { CVData, LanguageCode } from '../types';
import { templates } from './cv-templates';
import { reviewCv, improveCv } from '../services/GeminiService';

const translations = {
    fr: { print: 'Imprimer CV', templates: 'Modèles', review: 'Analyser CV', modalTitle: 'Suggestions d\'Amélioration', apply: 'Appliquer', applying: 'Application...', cancel: 'Annuler', reviewError: 'Erreur lors de l\'analyse.', applyError: 'Erreur lors de l\'application.' },
    en: { print: 'Print CV', templates: 'Templates', review: 'Review CV', modalTitle: 'Improvement Suggestions', apply: 'Apply', applying: 'Applying...', cancel: 'Cancel', reviewError: 'Error during review.', applyError: 'Error during application.' },
    pl: { print: 'Drukuj CV', templates: 'Szablony', review: 'Przejrzyj CV', modalTitle: 'Sugestie Poprawek', apply: 'Zastosuj', applying: 'Stosowanie...', cancel: 'Anuluj', reviewError: 'Błąd podczas przeglądu.', applyError: 'Błąd podczas stosowania.' },
    de: { print: 'Lebenslauf drucken', templates: 'Vorlagen', review: 'Lebenslauf prüfen', modalTitle: 'Verbesserungsvorschläge', apply: 'Anwenden', applying: 'Anwenden...', cancel: 'Abbrechen', reviewError: 'Fehler bei der Überprüfung.', applyError: 'Fehler beim Anwenden.' }
};

export const renderCvView = (data: CVData, lang: LanguageCode, onUpdate: (newCvData: CVData) => void): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';
  const t = translations[lang];
  let currentSuggestions = '';

  let selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;

  const render = () => {
    element.innerHTML = `
      <div id="review-modal" class="modal-overlay hidden">
        <div class="modal-content">
          <h2 class="modal-title">${t.modalTitle}</h2>
          <div id="review-output" class="modal-body"></div>
          <div class="modal-footer">
            <button id="modal-cancel-btn" class="modal-button secondary">${t.cancel}</button>
            <button id="modal-apply-btn" class="modal-button primary">
              <span id="apply-btn-text">${t.apply}</span>
              <div id="apply-btn-spinner" class="spinner" style="display: none;"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="view-controls">
        <button class="review-button" id="review-cv-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 2.22 2-2 2 2"/><path d="M14.94 21.78 13 24l-2-2.22"/><path d="M6.24 6.55 3.5 9.27l2.78 2.73"/><path d="m17.71 17.45 2.73-2.73-2.73-2.73"/><path d="m12 17.75.78.78.78-.78"/><path d="m12 6.25-.78-.78-.78.78"/><path d="M7.03 12.5h9.94"/><path d="M12.5 7.03v9.94"/></svg>
          <span id="review-btn-text">${t.review}</span>
          <div id="review-btn-spinner" class="spinner" style="display: none;"></div>
        </button>
        <div class="template-switcher">
          <span class="switcher-label">${t.templates}:</span>
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
          ${t.print}
        </button>
      </div>
      <div id="cv-render-output" class="${selectedTemplateId}-template">
        ${templates[selectedTemplateId].render(data, lang)}
      </div>
    `;
    attachListeners();
  };

  const handleReview = async () => {
    const reviewBtn = element.querySelector('#review-cv-btn') as HTMLButtonElement;
    const btnText = element.querySelector('#review-btn-text') as HTMLSpanElement;
    const spinner = element.querySelector('#review-btn-spinner') as HTMLDivElement;
    
    reviewBtn.disabled = true;
    spinner.style.display = 'block';

    try {
      currentSuggestions = await reviewCv(data);
      const reviewOutput = element.querySelector('#review-output');
      if (reviewOutput) reviewOutput.innerHTML = currentSuggestions;
      (element.querySelector('#review-modal') as HTMLElement).classList.remove('hidden');
    } catch (error) {
      console.error(error);
      alert(t.reviewError);
    } finally {
      reviewBtn.disabled = false;
      spinner.style.display = 'none';
    }
  };

  const handleApply = async () => {
    const applyBtn = element.querySelector('#modal-apply-btn') as HTMLButtonElement;
    const btnText = element.querySelector('#apply-btn-text') as HTMLSpanElement;
    const spinner = element.querySelector('#apply-btn-spinner') as HTMLDivElement;
    
    applyBtn.disabled = true;
    btnText.textContent = t.applying;
    spinner.style.display = 'inline-block';

    try {
      const newCvData = await improveCv(data, currentSuggestions);
      onUpdate(newCvData);
      (element.querySelector('#review-modal') as HTMLElement).classList.add('hidden');
    } catch (error) {
      console.error(error);
      alert(t.applyError);
    } finally {
      applyBtn.disabled = false;
      btnText.textContent = t.apply;
      spinner.style.display = 'none';
    }
  };

  const attachListeners = () => {
    const originalTitle = document.title;
    const langNameMap: Record<LanguageCode, string> = {
        fr: "Français",
        en: "English",
        pl: "Polski",
        de: "Deutsch"
    };

    element.querySelector('#print-cv-btn')?.addEventListener('click', () => {
        const newTitle = `${data.personalInfo.name} - ${langNameMap[lang]} - ${data.personalInfo.title} - CV`;
        document.title = newTitle;
        
        window.addEventListener('afterprint', () => {
            document.title = originalTitle;
        }, { once: true });
        
        window.print();
    });

    element.querySelector('#review-cv-btn')?.addEventListener('click', handleReview);

    // Modal listeners
    const modal = element.querySelector('#review-modal') as HTMLElement;
    element.querySelector('#modal-cancel-btn')?.addEventListener('click', () => modal.classList.add('hidden'));
    element.querySelector('#modal-apply-btn')?.addEventListener('click', handleApply);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Template switcher listeners
    element.querySelectorAll('.template-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const newTemplateId = target.dataset.templateId as keyof typeof templates;
        if (newTemplateId && newTemplateId !== selectedTemplateId) {
          selectedTemplateId = newTemplateId;
          localStorage.setItem('selectedCvTemplate', newTemplateId);
          render();
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
import { LanguageCode, CVDatabase } from '../types';

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


export const renderLetterView = (lang: LanguageCode, allCvData: CVDatabase, currentCvId: string): HTMLElement => {
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
      const currentProfile = allCvData.find(p => p.id === currentCvId);
      if (!currentProfile) {
        throw new Error("Current CV profile not found");
      }
      const cvDataForLang = currentProfile.data[lang];
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

  const originalTitle = document.title;
  const langNameMap: Record<LanguageCode, string> = {
      fr: "Français",
      en: "English",
      pl: "Polski",
      de: "Deutsch"
  };
  const docNameMap: Record<LanguageCode, { cv: string, letter: string }> = {
      fr: { cv: 'CV', letter: 'Lettre de Motivation' },
      en: { cv: 'CV', letter: 'Cover Letter' },
      pl: { cv: 'CV', letter: 'List Motywacyjny' },
      de: { cv: 'Lebenslauf', letter: 'Anschreiben' }
  };

  const setPrintTitle = (docType: 'letter' | 'combined') => {
    const currentProfile = allCvData.find(p => p.id === currentCvId);
    if (!currentProfile) return;

    const cvDataForLang = currentProfile.data[lang];
    const { name, title } = cvDataForLang.personalInfo;
    
    let docName = '';
    if (docType === 'letter') {
        docName = docNameMap[lang].letter;
    } else {
        docName = `${docNameMap[lang].cv} & ${docNameMap[lang].letter}`;
    }
    
    document.title = `${name} - ${langNameMap[lang]} - ${title} - ${docName}`;

    window.addEventListener('afterprint', () => {
        document.title = originalTitle;
    }, { once: true });
  };

  const handleCombinePrint = () => {
    setPrintTitle('combined');

    const printableArea = document.createElement('div');
    printableArea.id = 'printable-area';
    
    const currentProfile = allCvData.find(p => p.id === currentCvId);
    if (!currentProfile) {
      console.error("Current CV profile not found for printing");
      return;
    }
    const cvDataForLang = currentProfile.data[lang];

    // 1. Get CV content for the current language and selected template
    const selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;
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
  
  printLetterBtn.addEventListener('click', () => {
    setPrintTitle('letter');
    window.print();
  });

  combinePrintBtn.addEventListener('click', handleCombinePrint);

  return element;
};
      ]]>
    </file>
    <file path="TASKS.md">
      <![CDATA[
- [x] Fix "Maximum call stack size exceeded" error on app load.
- [x] Make the application responsive on mobile devices.
- [x] Update document title for printing/saving to include name, language, title, and document type.
      ]]>
    </file>
  </modifications>
</response>
```