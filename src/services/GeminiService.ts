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
