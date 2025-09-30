import axios from 'axios';
import cvData from '../data/cv-data.json';
import { CVData } from '../types';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const MODEL_NAME = "gemini-flash-latest"; // Corrected model name
const API_URL = `/api/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`; // Use proxy and corrected URL structure

// Replicating enums from the removed @google/genai package
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

// This function now gets data from the JSON file, not the DOM.
export const getCVDataFromDOM = (): string => {
    const data = cvData as CVData;
    let cvText = "";

    // Helper to strip HTML tags for plain text version
    const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

    // Personal Info & Objective
    cvText += `Nom: ${data.personalInfo.name}\n`;
    cvText += `Titre: ${data.personalInfo.title}\n\n`;
    cvText += `## OBJECTIF PROFESSIONNEL\n${data.personalInfo.professionalObjective}\n\n`;

    // Experience
    cvText += `## EXPÉRIENCE PROFESSIONNELLE\n`;
    data.experience.forEach(job => {
        cvText += `${job.title}\n`;
        if (job.company) cvText += `${job.company} | `;
        cvText += `${job.period}\n`;
        job.responsibilities.forEach(res => {
            cvText += `- ${stripHtml(res)}\n`;
        });
        cvText += '\n';
    });

    // Projects
    cvText += `## PROJETS SIGNIFICATIFS\n`;
    data.projects.forEach(project => {
        cvText += `${project.name} (${project.url})\n`;
        cvText += `${stripHtml(project.description)}\n`;
        cvText += `Stack Technique : ${stripHtml(project.stack)}\n\n`;
    });

    // Skills
    cvText += `## COMPÉTENCES TECHNIQUES\n`;
    data.skills.forEach(category => {
        cvText += `${category.title}: ${category.skills.join(', ')}\n`;
    });
    cvText += '\n';

    // Education
    cvText += `## FORMATION\n`;
    data.education.forEach(edu => {
        cvText += `${edu.degree}\n`;
        cvText += `${edu.institution} | ${edu.period}\n\n`;
    });
    
    // Languages
    cvText += `## LANGUES\n`;
    data.languages.forEach(lang => {
        cvText += `${lang.name}: ${lang.level}\n`;
    });
    cvText += '\n';
    
    // Contact information
    cvText += `## CONTACT\n`;
    data.contact.forEach(c => {
        cvText += `${c.text}${c.url ? ` (${c.url})` : ''}\n`;
    });
    cvText += '\n';

    return cvText.trim();
};

// The main function to generate the cover letter, now using axios
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
