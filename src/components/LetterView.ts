import { generateCoverLetter, getCVDataFromDOM } from '../services/GeminiService';
import { blobToBase64 } from '../helpers';
import { renderCvView } from './CvView';
import cvData from '../data/cv-data.json';
import { CVData } from '../types';

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
        <button class="print-button" id="combine-print-btn" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Imprimer CV & Lettre
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
  const combinePrintBtn = element.querySelector('#combine-print-btn') as HTMLButtonElement;
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
    combinePrintBtn.style.display = 'none';

    try {
      const cvDataString = getCVDataFromDOM();
      
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
      
      const result = await generateCoverLetter(cvDataString, jobDescription, imagePart);
      
      letterOutput.textContent = result;
      printLetterBtn.style.display = 'flex';
      combinePrintBtn.style.display = 'flex';

    } catch (error) {
        console.error("Error generating letter:", error);
        letterOutput.innerHTML = `<p style="color: red;">Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer.</p>`;
    } finally {
        setGeneratingState(false);
    }
  };

  const handleCombinePrint = () => {
    // 1. Create a container for printing
    const printableArea = document.createElement('div');
    printableArea.id = 'printable-area';

    // 2. Get CV content
    const cvView = renderCvView(cvData as CVData);
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
