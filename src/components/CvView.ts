import { CVData, Contact, SkillCategory, Language, Experience, Project, Education } from '../types';

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
    <p><strong>Stack Technique :</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job">
    <h4>${edu.degree}</h4>
    <p class="company-info">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const renderCvView = (data: CVData): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';
  element.innerHTML = `
    <button class="print-button" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      Imprimer CV
    </button>
    <div class="cv-container">
      <aside class="left-column">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image">
        
        <section>
          <h2>CONTACT</h2>
          <ul class="contact-list">
            ${data.contact.map(createContactItem).join('')}
          </ul>
        </section>

        <section>
          <h2>COMPÉTENCES TECHNIQUES</h2>
          ${data.skills.map(createSkillCategory).join('')}
        </section>

        <section>
          <h2>LANGUES</h2>
          <ul>
            ${data.languages.map(createLanguageItem).join('')}
          </ul>
        </section>

        <section>
          <h2>STATUT</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </aside>

      <main class="right-column">
        <header>
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </header>

        <section>
          <h2>OBJECTIF PROFESSIONNEL</h2>
          <p>${data.personalInfo.professionalObjective}</p>
        </section>

        <section>
          <h2>EXPÉRIENCE PROFESSIONNELLE</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section>
          <h2>PROJETS SIGNIFICATIFS</h2>
          ${data.projects.map(createProjectItem).join('')}
        </section>

        <section>
          <h2>FORMATION</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>
      </main>
    </div>
  `;
  return element;
};
