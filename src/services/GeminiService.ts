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
