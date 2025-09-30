import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => `
  <div class="contact-item-corporate">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.svgPath}</svg>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`}
  </div>
`;

const createSkillCategory = (category: SkillCategory) => `
  <div class="skill-category-corporate">
    <h4 class="skill-title-corporate">${category.title}</h4>
    <p>${category.skills.join(', ')}</p>
  </div>
`;

const createExperienceItem = (job: Experience) => `
  <div class="job-corporate">
    <div class="job-header-corporate">
      <h4>${job.title}</h4>
      <p class="company-info-corporate">${job.company} | ${job.period}</p>
    </div>
    <ul>
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="job-corporate">
     <div class="job-header-corporate">
        <h4><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a></h4>
     </div>
    <p>${project.description}</p>
    <p><strong>${project.stack_title}:</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job-corporate">
    <h4>${edu.degree}</h4>
    <p class="company-info-corporate">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const render = (data: CVData, lang: LanguageCode): string => {
  return `
    <div class="cv-container-corporate">
      <header class="header-corporate">
        <h1>${data.personalInfo.name}</h1>
        <h3>${data.personalInfo.title}</h3>
        <div class="contact-corporate">
          ${data.contact.map(createContactItem).join('')}
        </div>
      </header>
      
      <div class="main-content-corporate">
        <section class="section-corporate">
          <h2>${data.sections.objective}</h2>
          <p>${data.personalInfo.professionalObjective}</p>
        </section>

        <section class="section-corporate">
          <h2>${data.sections.experience}</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section class="section-corporate">
          <h2>${data.sections.projects}</h2>
          ${data.projects.map(createProjectItem).join('')}
        </section>
        
        <section class="section-corporate">
          <h2>${data.sections.skills}</h2>
          <div class="skills-grid-corporate">
            ${data.skills.map(createSkillCategory).join('')}
          </div>
        </section>

        <section class="section-corporate">
          <h2>${data.sections.education}</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>

        <section class="section-corporate">
          <h2>${data.sections.languages}</h2>
          <p>${data.languages.map(lang => `${lang.name} (${lang.level})`).join(' / ')}</p>
        </section>
        
        <section class="section-corporate">
          <h2>${data.sections.status}</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </div>
    </div>
  `;
};
