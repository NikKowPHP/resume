/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navCV = document.getElementById('nav-cv');
  const navLetter = document.getElementById('nav-letter');
  const cvView = document.getElementById('cv-view');
  const letterView = document.getElementById('letter-view');
  const generateBtn = document.getElementById('generate-btn');
  const generateBtnText = document.getElementById('generate-btn-text');
  const generateBtnSpinner = document.getElementById('generate-btn-spinner');
  const jobDescriptionInput = document.getElementById('job-description') as HTMLTextAreaElement;
  const jobScreenshotInput = document.getElementById('job-screenshot') as HTMLInputElement;
  const letterOutput = document.getElementById('letter-output');
  const printLetterBtn = document.getElementById('print-letter-btn');

  // --- State ---
  let currentView = 'cv';

  // --- Functions ---
  const switchView = (view: 'cv' | 'letter') => {
    if (view === currentView) return;

    if (view === 'cv') {
      cvView.style.display = 'block';
      letterView.style.display = 'none';
      navCV.classList.add('active');
      navLetter.classList.remove('active');
    } else {
      cvView.style.display = 'none';
      letterView.style.display = 'block';
      navCV.classList.remove('active');
      navLetter.classList.add('active');
    }
    currentView = view;
  };

  const getCVData = (): string => {
    const cvContainer = document.querySelector('.cv-container');
    if (!cvContainer) return "CV data not found.";
    
    let cvText = "";
    const sections = cvContainer.querySelectorAll('section');
    cvText += `Nom: ${document.querySelector('h1')?.textContent.trim() || ''}\n`;
    cvText += `Titre: ${document.querySelector('header h3')?.textContent.trim() || ''}\n\n`;

    sections.forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim();
        if (title) {
            cvText += `## ${title}\n`;
            const content = Array.from(section.querySelectorAll('p, ul, .job')).map(el => el.textContent.replace(/\s\s+/g, ' ').trim()).join('\n');
            cvText += `${content}\n\n`;
        }
    });

    return cvText;
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
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
        const cvData = getCVData();
        const prompt = `Vous êtes un coach carrière expert, spécialisé dans le marché du travail français. Votre mission est de rédiger une lettre de motivation exceptionnelle, prête à l'emploi.

**Informations sur le candidat (extrait du CV) :**
---
${cvData}
---

**Informations sur le poste/l'entreprise :**
---
${jobDescription || "Veuillez analyser l'image ci-jointe pour la description du poste et les informations sur l'entreprise."}
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

      if (imageFile) {
        const base64Data = await blobToBase64(imageFile);
        parts.push({
          inlineData: {
            mimeType: imageFile.type,
            data: base64Data
          }
        });
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: parts },
      });
      
      letterOutput.textContent = response.text;
      printLetterBtn.style.display = 'flex';
    } catch (error) {
        console.error("Error generating letter:", error);
        letterOutput.innerHTML = `<p style="color: red;">Une erreur est survenue lors de la génération de la lettre. Veuillez réessayer.</p>`;
    } finally {
        setGeneratingState(false);
    }
  };

  // --- Event Listeners ---
  navCV.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('cv');
  });

  navLetter.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('letter');
  });
  
  generateBtn.addEventListener('click', handleGenerate);

  printLetterBtn.addEventListener('click', () => {
    window.print();
  });

  // --- Initial Setup ---
  switchView('cv');
});