import { CVData, Contact, SkillCategory, Language, Experience, Project, Education, LanguageCode } from '../../types';

const createContactItem = (item: Contact) => `
  <div class="contact-item-backend">
    <span class="prompt">$</span> <span class="cmd">cat</span> <span class="arg">${item.text}</span>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="link-icon">🔗</a>` : ''}
  </div>
`;

const createSkillCategory = (category: SkillCategory) => `
  <div class="skill-category-backend">
    <h4 class="skill-title-backend"><span class="prompt">#</span> ${category.title}</h4>
    <p class="skill-list-backend">${category.skills.join(', ')}</p>
  </div>
`;

const createExperienceItem = (job: Experience) => `
  <div class="job-backend">
    <div class="job-header-backend">
      <h4 class="job-title-backend"><span class="prompt">>></span> ${job.title}</h4>
      <p class="company-info-backend">${job.company} <span class="dim">//</span> ${job.period}</p>
    </div>
    <ul class="resp-list-backend">
      ${job.responsibilities.map(res => `<li><span class="bullet">*</span> ${res}</li>`).join('')}
    </ul>
  </div>
`;

const createProjectItem = (project: Project) => `
  <div class="project-backend">
     <div class="project-header-backend">
        <h4><span class="prompt">$</span> ./run --project <span class="arg">${project.name}</span></h4>
        ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="link-icon">🔗</a>` : ''}
     </div>
    <p class="proj-desc-backend">${project.description}</p>
    <p class="proj-stack-backend"><span class="dim">STACK:</span> ${project.stack}</p>
  </div>
`;

const createEducationItem = (edu: Education) => `
  <div class="job-backend">
    <h4 class="job-title-backend"><span class="prompt">>></span> ${edu.degree}</h4>
    <p class="company-info-backend">${edu.institution} <span class="dim">//</span> ${edu.period}</p>
  </div>
`;

export const render = (data: CVData, lang: LanguageCode): string => {
  const stats = [
    { label: 'UPTIME', value: '99.99%' },
    { label: 'LOAD', value: '0.04, 0.12, 0.08' },
    { label: 'MEM', value: '4.2GiB / 16GiB' },
    { label: 'CONN', value: '256 ACTIVE' }
  ];

  return `
    <div class="cv-container-backend">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn red"></span>
          <span class="btn yellow"></span>
          <span class="btn green"></span>
        </div>
        <div class="terminal-title">mikita@backend:~/resume</div>
        <div class="terminal-stats">
          ${stats.map(s => `<span class="stat"><span class="dim">${s.label}:</span> ${s.value}</span>`).join(' ')}
        </div>
      </div>
      
      <header class="header-backend">
        <div class="header-text-backend">
          <h1>${data.personalInfo.name}</h1>
          <h3 class="typewriter">${data.personalInfo.title}</h3>
        </div>
      </header>
      
      <section class="contact-backend">
        ${data.contact.map(createContactItem).join('')}
      </section>

      <div class="main-content-backend">
        <section>
          <h2 class="section-title-backend">[[ ${data.sections.objective} ]]</h2>
          <p class="objective-text-backend">${data.personalInfo.professionalObjective}</p>
        </section>

        <section>
          <h2 class="section-title-backend">[[ ${data.sections.experience} ]]</h2>
          ${data.experience.map(createExperienceItem).join('')}
        </section>

        <section>
          <h2 class="section-title-backend">[[ ${data.sections.projects} ]]</h2>
          <div class="projects-grid-backend">
            ${data.projects.map(createProjectItem).join('')}
          </div>
        </section>
        
        <section>
          <h2 class="section-title-backend">[[ ${data.sections.skills} ]]</h2>
          <div class="skills-grid-backend">
            ${data.skills.map(createSkillCategory).join('')}
          </div>
        </section>

        <div class="footer-grid-backend">
            <section>
              <h2 class="section-title-backend">[[ ${data.sections.education} ]]</h2>
              ${data.education.map(createEducationItem).join('')}
            </section>

            <section>
              <h2 class="section-title-backend">[[ ${data.sections.languages} ]]</h2>
              <div class="languages-backend">
                ${data.languages.map(l => `<span><span class="dim">${l.name}:</span> ${l.level}</span>`).join(' | ')}
              </div>
            </section>
        </div>

        <section>
          <h2 class="section-title-backend">[[ ${data.sections.softSkills} ]]</h2>
          <p class="soft-skills-backend">${data.softSkills.join('; ')}</p>
        </section>

        <section class="status-backend">
          <h2 class="section-title-backend">[[ ${data.sections.status} ]]</h2>
          <p class="status-text-backend"><span class="blink">_</span> ${data.personalInfo.status}</p>
        </section>
      </div>
    </div>
  `;
};
