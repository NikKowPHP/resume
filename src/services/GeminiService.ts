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
  maxOutputTokens: 7048,
};

const callGeminiAPI = async (payload: any): Promise<string> => {
    try {
        const response = await axios.post(API_URL, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const candidate = response.data?.candidates?.[0];

        if (!candidate) {
            console.error("Invalid response: No candidates found.", response.data);
            throw new Error("API returned no candidates. The prompt may have been blocked.");
        }

        if (candidate.finishReason && candidate.finishReason !== "STOP") {
            console.error(`API response finished with reason: ${candidate.finishReason}`, candidate);
            throw new Error(`Content generation stopped unexpectedly. Reason: ${candidate.finishReason}. This often happens due to safety settings.`);
        }

        const text = candidate.content?.parts?.[0]?.text;

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
        // Re-throw errors from the try block or other unknown errors
        console.error("Unknown error calling Gemini API:", error);
        throw error;
    }
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
        job.responsibilities.forEach(res => { cvText += `- ${stripHtml(res)}\n`; });
        cvText += '\n';
    });
    cvText += `## ${data.sections.projects}\n`;
    data.projects.forEach(project => {
        cvText += `${project.name} (${project.url})\n`;
        cvText += `${stripHtml(project.description)}\n`;
        cvText += `${project.stack_title} : ${stripHtml(project.stack)}\n\n`;
    });
    cvText += `## ${data.sections.skills}\n`;
    data.skills.forEach(category => { cvText += `${category.title}: ${category.skills.join(', ')}\n`; });
    cvText += '\n';
    cvText += `## ${data.sections.education}\n`;
    data.education.forEach(edu => { cvText += `${edu.degree}\n`; cvText += `${edu.institution} | ${edu.period}\n\n`; });
    cvText += `## ${data.sections.languages}\n`;
    data.languages.forEach(lang => { cvText += `${lang.name}: ${lang.level}\n`; });
    cvText += '\n';
    cvText += `## ${data.sections.contact}\n`;
    data.contact.forEach(c => { cvText += `${c.text}${c.url ? ` (${c.url})` : ''}\n`; });
    cvText += '\n';
    return cvText.trim();
};

const languageMap: Record<LanguageCode, string> = {
    fr: "French", en: "English", pl: "Polish", de: "German"
};

export const generateCoverLetter = async (cvData: string, jobInfo: string, imagePart: any | null, lang: LanguageCode): Promise<string> => {
    const targetLanguage = languageMap[lang];
    const prompt = `
You are an expert career coach. Your mission is to write an outstanding, ready-to-use cover letter in **${targetLanguage} only**.

**Candidate Information (from CV):**
---
${cvData}
---

**Job/Company Information:**
---
${jobInfo || "Please analyze the attached image for the job description and company information."}
---

**Writing Instructions:**

You must write a complete and professional cover letter following these rules precisely.

1.  **Sender's Header:** Directly integrate the candidate's contact information (Name, Title, Phone, Email, etc.) clearly and professionally at the top left. Do not use placeholders like "[Your Contact Info]".
2.  **Recipient:** If a contact person or company name is available, address the letter to them. Otherwise, use a generic salutation appropriate for the target language (e.g., "À l'attention du Service Recrutement" for French). Include the city if possible.
3.  **Location:** Add only the candidate's city of residence (e.g., "Krakow,"). **DO NOT include the date.**
4.  **Subject:** Create a clear and concise subject line. For example, in French: "Objet : Candidature au poste de [Job Title]".
5.  **Body of the letter:**
    *   Write a compelling introduction that mentions the targeted position.
    *   Develop 2-3 paragraphs that highlight the match between the candidate's skills and experience (from the CV) and the job requirements. Use concrete examples from the CV.
    *   Show sincere interest in the company.
    *   Conclude with a clear call to action, proposing an interview.
6.  **Closing and Signature:** End with a professional closing appropriate for the language (e.g., for French: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.") followed by the candidate's full name.

**Tone and Style:**
*   The tone must be professional, confident, and enthusiastic.
*   The letter must be concise, impactful, and free of errors.
*   Use line breaks to create space and clearly separate paragraphs.
*   **FORMATTING:** The output must be **plain text only**. Do NOT use any Markdown formatting (no **, *, #, lists, etc.).

Generate only the full, raw text of the letter, starting with the candidate's name.
`;
    const parts: any[] = [{ text: prompt }];
    if (imagePart) parts.push(imagePart);
    const payload = { contents: [{ role: "user", parts }], generationConfig, safetySettings };
    return callGeminiAPI(payload);
};

export const reviewCv = async (cvData: CVData): Promise<string> => {
    const prompt = `
You are a professional career coach and CV expert for the tech industry.
Review the following CV data, provided in JSON format.
Provide a concise list of actionable suggestions for improvement. Focus on making the descriptions more impactful, quantifying achievements, and optimizing for keywords relevant to a Full Stack Developer role.
Format your response as a Markdown bulleted list.

CV Data:
\`\`\`json
${JSON.stringify(cvData, null, 2)}
\`\`\`
`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig, safetySettings };
    return callGeminiAPI(payload);
};

export const improveCv = async (cvData: CVData, suggestions: string): Promise<CVData> => {
    const prompt = `
You are an AI assistant that updates JSON data.
Below is a CV data object in JSON format and a list of suggestions for improvement.
Your task is to apply these suggestions to the JSON object.
Rewrite the JSON to incorporate the suggested changes, focusing on making the 'professionalObjective', 'responsibilities', and 'description' fields more impactful and quantitative.
You MUST return the **complete, updated JSON object and nothing else**.
Ensure the returned JSON is valid and maintains the exact same structure as the original.
Do not add any explanatory text, markdown, or code block fences before or after the JSON.

Original CV JSON:
\`\`\`json
${JSON.stringify(cvData, null, 2)}
\`\`\`

Suggestions for improvement:
---
${suggestions}
---

Return ONLY the updated and valid JSON object.
`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig, safetySettings };
    const responseText = await callGeminiAPI(payload);

    try {
        // The API might still wrap the JSON in markdown, so we need to clean it.
        const cleanedText = responseText.replace(/^```json\n/, '').replace(/\n```$/, '');
        return JSON.parse(cleanedText) as CVData;
    } catch (error) {
        console.error("Failed to parse JSON response from AI:", responseText);
        throw new Error("AI returned invalid JSON data.");
    }
};
