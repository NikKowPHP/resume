import { CVData, LanguageCode } from '../types';
import { templates } from './cv-templates';

const translations = {
    fr: { print: 'Imprimer CV', templates: 'Modèles' },
    en: { print: 'Print CV', templates: 'Templates' },
    pl: { print: 'Drukuj CV', templates: 'Szablony' },
    de: { print: 'Lebenslauf drucken', templates: 'Vorlagen' }
};

export const renderCvView = (data: CVData, lang: LanguageCode): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';

  let selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;

  const render = () => {
    element.innerHTML = `
      <div class="view-controls">
        <div class="template-switcher">
          <span class="switcher-label">${translations[lang].templates}:</span>
          ${Object.entries(templates).map(([id, { name }]) => `
            <button class="template-btn ${id === selectedTemplateId ? 'active' : ''}" data-template-id="${id}">
              ${name}
            </button>
          `).join('')}
        </div>
        <button class="print-button" id="print-cv-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          ${translations[lang].print}
        </button>
      </div>
      <div id="cv-render-output" class="${selectedTemplateId}-template">
        ${templates[selectedTemplateId].render(data, lang)}
      </div>
    `;

    // Re-attach event listeners after every render
    attachListeners();
  };

  const attachListeners = () => {
    element.querySelector('#print-cv-btn')?.addEventListener('click', () => window.print());

    element.querySelectorAll('.template-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const newTemplateId = target.dataset.templateId as keyof typeof templates;
        if (newTemplateId && newTemplateId !== selectedTemplateId) {
          selectedTemplateId = newTemplateId;
          localStorage.setItem('selectedCvTemplate', newTemplateId);
          render(); // Re-render the whole view with the new template
        }
      });
    });
  };

  render();
  return element;
};
