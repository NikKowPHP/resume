import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

// Re-using helper functions as the structure is similar to Classic
const createContactItem = (item: Contact) => `
  <li>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.svgPath}</svg>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`}
  </li>
`;

const createSkillCategory = (category: SkillCategory) => `
  <h4>${category.title}</h4>
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
    <p><strong>${project.stack_title} :</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job">
    <h4>${edu.degree}</h4>
    <p class="company-info">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const render = (data: CVData, lang: LanguageCode): string => {
  return `
    <div class="cv-container-compact">
      <aside class="left-column-compact">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image-compact">
        <header class="header-compact">
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </header>

        <section>
          <h2>${data.sections.contact}</h2>
          <ul class="contact-list-compact">
            ${data.contact.map(createContactItem).join('')}
          </ul>
        </section>

        <section>
          <h2>${data.sections.skills}</h2>
          ${data.skills.map(createSkillCategory).join('')}
        </section>

        <section>
          <h2>${data.sections.languages}</h2>
          <ul>
            ${data.languages.map(createLanguageItem).join('')}
          </ul>
        </section>

        <section>
          <h2>${data.sections.status}</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </aside>

      <main class="right-column-compact">
        <section>
          <h2>${data.sections.objective}</h2>
          <p>${data.personalInfo.professionalObjective}</p>
        </section>

        <section>
          <h2>${data.sections.experience}</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section>
          <h2>${data.sections.projects}</h2>
          ${data.projects.map(createProjectItem).join('')}
        </section>

        <section>
          <h2>${data.sections.education}</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>
      </main>
    </div>
  `;
};
