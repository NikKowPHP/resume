import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => `
  <div class="contact-item-modern">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.svgPath}</svg>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>` : `<span>${item.text}</span>`}
  </div>
`;

const createSkillCategory = (category: SkillCategory) => `
  <div class="skill-category-modern">
    <h4 class="skill-title-modern">${category.title}</h4>
    <p>${category.skills.join(' &bull; ')}</p>
  </div>
`;

const createLanguageItem = (lang: Language) => `
  <span><strong>${lang.name}:</strong> ${lang.level}</span>
`;

const createExperienceItem = (job: Experience) => `
  <div class="job-modern">
    <div class="job-header-modern">
      <h4>${job.title}</h4>
      <p class="company-info-modern">${job.company} | ${job.period}</p>
    </div>
    <ul>
      ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="job-modern">
     <div class="job-header-modern">
        <h4><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a></h4>
     </div>
    <p>${project.description}</p>
    <p><strong>${project.stack_title}:</strong> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job-modern">
    <h4>${edu.degree}</h4>
    <p class="company-info-modern">${edu.institution} | ${edu.period}</p>
  </div>
`;

export const render = (data: CVData, lang: LanguageCode): string => {
  return `
    <div class="cv-container-modern">
      <header class="header-modern">
        <img src="${data.personalInfo.image}" alt="${data.personalInfo.name}" class="profile-image-modern">
        <div class="header-text-modern">
          <h1>${data.personalInfo.name}</h1>
          <h3>${data.personalInfo.title}</h3>
        </div>
      </header>
      
      <section class="contact-modern">
        ${data.contact.map(createContactItem).join('')}
      </section>

      <div class="main-content-modern">
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
          <h2>${data.sections.skills}</h2>
          <div class="skills-grid-modern">
            ${data.skills.map(createSkillCategory).join('')}
          </div>
        </section>

        <section>
          <h2>${data.sections.education}</h2>
          ${data.education.map(createEducationItem).join('')}
        </section>

        <section>
          <h2>${data.sections.languages}</h2>
          <div class="languages-modern">
            ${data.languages.map(createLanguageItem).join(' &bull; ')}
          </div>
        </section>

        <section>
          <h2>${data.sections.status}</h2>
          <p>${data.personalInfo.status}</p>
        </section>
      </div>
    </div>
  `;
};
