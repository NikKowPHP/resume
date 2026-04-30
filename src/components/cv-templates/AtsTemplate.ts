import { CVData, Contact, SkillCategory, Language, Experience, Education, Project, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`;

const createSkillCategory = (category: SkillCategory) => `
  <p style="margin-bottom: 1px;"><strong>${category.title}:</strong> ${category.skills.join(', ')}</p>
`;

const createExperienceItem = (job: Experience) => {
  if (job.title === '' && job.period === '' && job.responsibilities.length === 0) {
    return `<h3 class="ats-subheader">${job.company}</h3>`;
  }
  return `
  <div class="ats-item">
    <div class="ats-header">
      <span>${job.title.toUpperCase()} | ${job.company}</span>
      <span>${job.period}</span>
    </div>
    <ul class="ats-list">
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;
};

const createProjectItem = (project: Project) => `
  <div class="ats-item">
    <div class="ats-header">
      <span>${project.name.toUpperCase()}</span>
    </div>
    <p style="margin: 2px 0;">${project.description}</p>
    ${project.stack ? `<p style="margin: 1px 0; font-size: 8pt;"><strong>${project.stack_title}:</strong> ${project.stack}</p>` : ''}
  </div>
`;

export const render = (data: CVData, _lang: LanguageCode): string => {
  return `
    <div class="ats-container">
      <header class="ats-main-header">
        <h1>${data.personalInfo.name}</h1>
        <div class="ats-contact">
          ${data.contact.map(createContactItem).join(' | ')}
        </div>
        <div style="font-weight: bold; margin-top: 2px;">${data.personalInfo.title}</div>
      </header>

      <section class="ats-section">
        <h2>${data.sections.objective}</h2>
        <p>${data.personalInfo.professionalObjective}</p>
      </section>

      <section class="ats-section">
        <h2>${data.sections.skills}</h2>
        ${data.skills.map(createSkillCategory).join('')}
      </section>

      <section class="ats-section">
        <h2>${data.sections.experience}</h2>
        ${data.experience.map(createExperienceItem).join('')}
      </section>

      <section class="ats-section">
        <h2>${data.sections.education} & ${data.sections.languages}</h2>
        <div class="ats-header">
          <span>${data.education[0].degree} | ${data.education[0].institution}</span>
          <span>${data.education[0].period}</span>
        </div>
        <p style="margin-top: 2px;">
          <strong>${data.sections.languages}:</strong> ${data.languages.map(l => `${l.name} (${l.level})`).join(', ')}
        </p>
      </section>
      
      ${data.projects.length > 0 ? `
      <section class="ats-section">
        <h2>${data.sections.projects}</h2>
        ${data.projects.map(createProjectItem).join('')}
      </section>` : ''}

      <section class="ats-section" style="border-top: 0.5px solid #eee; padding-top: 2px;">
        <p style="font-size: 8pt; text-align: center; margin: 0;">${data.personalInfo.status}</p>
      </section>
    </div>
  `;
};
