<response>
<reasoning>
My plan is to replace the `@google/genai` SDK with direct REST API calls using `axios`, as requested by the user who provided a `curl`-like implementation as a reference. The provided code is for a Node.js backend, so I will adapt its core logic to the existing frontend application.

1.  **Update Dependencies:** I will modify `package.json` to remove the `@google/genai` package and add `axios`.
2.  **Refactor Gemini Service:** I will rewrite `src/services/GeminiService.ts`. The new implementation will use `axios` to make a `POST` request to the Gemini API's `generateContent` endpoint. I'll replicate the necessary types for `safetySettings` that were previously imported from the SDK and construct the API request payload according to the API documentation and the user's reference code. The function signatures will remain the same to avoid breaking other parts of the application.
3.  **Update Task List:** I will add the completed task to `TASKS.md`.
</reasoning>
<commands>
<![CDATA[
npm install axios
npm uninstall @google/genai
]]>
</commands>
<modifications>
<file path="package.json">
<![CDATA[
{
  "name": "empty",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.2"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
]]>
</file>
<file path="src/services/GeminiService.ts">
<![CDATA[
import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const MODEL_NAME = "gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

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

// This function is a DOM helper and is independent of the API client
export const getCVDataFromDOM = (): string => {
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
]]>
</file>
<file path="TASKS.md">
<![CDATA[
- [x] Perform refactor to use SoC and all best practices in development, highly modular, detach data to a separate json data to be able to change it.
- [x] Replace Gemini SDK with a direct REST API implementation using axios.
]]>
</file>
</modifications>
</response>