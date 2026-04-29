import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => `
  <span>${item.url ? `<a href="${item.url}">${item.text}</a>` : item.text}</span>
`;

const createSkillCategory = (category: SkillCategory) => `
  <p><strong>${category.title}:</strong> ${category.skills.join(', ')}</p>
`;

const createLanguageItem = (lang: Language) => `
  <span>${lang.name} (${lang.level})</span>
`;

const createExperienceItem = (job: Experience) => `
  <div class="ats-item">
    <div class="ats-header">
      <strong>${job.title}</strong> | ${job.company} | ${job.period}
    </div>
    <ul class="ats-list">
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="ats-item">
    <div class="ats-header">
      <a href="${project.url}"><strong>${project.name}</strong></a> | <a href="${project.url}">${project.url}</a>
    </div>
    <p>${project.description}</p>
    <p><strong>Stack:</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="ats-item">
    <strong>${edu.degree}</strong> | ${edu.institution} | ${edu.period}
  </div>
`;

export const render = (data: CVData, _lang: LanguageCode): string => {
  return `
    <div class="ats-container">
      <header class="ats-main-header">
        <h1>${data.personalInfo.name}</h1>
        <p class="ats-contact">
          ${data.contact.map(createContactItem).join(' | ')}
        </p>
        <p><strong>${data.personalInfo.title}</strong></p>
      </header>

      <section class="ats-section">
        <h2>${data.sections.objective}</h2>
        <p>${data.personalInfo.professionalObjective}</p>
      </section>

      <section class="ats-section">
        <h2>${data.sections.skills}</h2>
        ${data.skills.map(createSkillCategory).join('')}
        <p><strong>${data.sections.softSkills}:</strong> ${data.softSkills.join(', ')}</p>
      </section>

      <section class="ats-section">
        <h2>${data.sections.experience}</h2>
        ${data.experience.map(createExperienceItem).join('')}
      </section>

      <section class="ats-section">
        <h2>${data.sections.projects}</h2>
        ${data.projects.map(createProjectItem).join('')}
      </section>

      <section class="ats-section">
        <h2>${data.sections.languages}</h2>
        <p>${data.languages.map(createLanguageItem).join(' | ')}</p>
      </section>

      <section class="ats-section">
        <h2>${data.sections.education}</h2>
        ${data.education.map(createEducationItem).join('')}
      </section>
      
      <section class="ats-section">
        <h2>${data.sections.status}</h2>
        <p>${data.personalInfo.status}</p>
      </section>
    </div>
  `;
};
