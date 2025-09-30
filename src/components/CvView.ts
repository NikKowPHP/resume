import { CVData, LanguageCode } from '../types';
import { templates } from './cv-templates';
import { reviewCv, improveCv } from '../services/GeminiService';

const translations = {
    fr: { print: 'Imprimer CV', templates: 'Modèles', review: 'Analyser CV', modalTitle: 'Suggestions d\'Amélioration', apply: 'Appliquer', applying: 'Application...', cancel: 'Annuler', reviewError: 'Erreur lors de l\'analyse.', applyError: 'Erreur lors de l\'application.' },
    en: { print: 'Print CV', templates: 'Templates', review: 'Review CV', modalTitle: 'Improvement Suggestions', apply: 'Apply', applying: 'Applying...', cancel: 'Cancel', reviewError: 'Error during review.', applyError: 'Error during application.' },
    pl: { print: 'Drukuj CV', templates: 'Szablony', review: 'Przejrzyj CV', modalTitle: 'Sugestie Poprawek', apply: 'Zastosuj', applying: 'Stosowanie...', cancel: 'Anuluj', reviewError: 'Błąd podczas przeglądu.', applyError: 'Błąd podczas stosowania.' },
    de: { print: 'Lebenslauf drucken', templates: 'Vorlagen', review: 'Lebenslauf prüfen', modalTitle: 'Verbesserungsvorschläge', apply: 'Anwenden', applying: 'Anwenden...', cancel: 'Abbrechen', reviewError: 'Fehler bei der Überprüfung.', applyError: 'Fehler beim Anwenden.' }
};

export const renderCvView = (data: CVData, lang: LanguageCode, onUpdate: (newCvData: CVData) => void): HTMLElement => {
  const element = document.createElement('div');
  element.id = 'cv-view';
  const t = translations[lang];
  let currentSuggestions = '';

  let selectedTemplateId = (localStorage.getItem('selectedCvTemplate') || 'classic') as keyof typeof templates;

  const render = () => {
    element.innerHTML = `
      <div id="review-modal" class="modal-overlay hidden">
        <div class="modal-content">
          <h2 class="modal-title">${t.modalTitle}</h2>
          <div id="review-output" class="modal-body"></div>
          <div class="modal-footer">
            <button id="modal-cancel-btn" class="modal-button secondary">${t.cancel}</button>
            <button id="modal-apply-btn" class="modal-button primary">
              <span id="apply-btn-text">${t.apply}</span>
              <div id="apply-btn-spinner" class="spinner" style="display: none;"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="view-controls">
        <button class="review-button" id="review-cv-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 2.22 2-2 2 2"/><path d="M14.94 21.78 13 24l-2-2.22"/><path d="M6.24 6.55 3.5 9.27l2.78 2.73"/><path d="m17.71 17.45 2.73-2.73-2.73-2.73"/><path d="m12 17.75.78.78.78-.78"/><path d="m12 6.25-.78-.78-.78.78"/><path d="M7.03 12.5h9.94"/><path d="M12.5 7.03v9.94"/></svg>
          <span id="review-btn-text">${t.review}</span>
          <div id="review-btn-spinner" class="spinner" style="display: none;"></div>
        </button>
        <div class="template-switcher">
          <span class="switcher-label">${t.templates}:</span>
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
          ${t.print}
        </button>
      </div>
      <div id="cv-render-output" class="${selectedTemplateId}-template">
        ${templates[selectedTemplateId].render(data, lang)}
      </div>
    `;
    attachListeners();
  };

  const handleReview = async () => {
    const reviewBtn = element.querySelector('#review-cv-btn') as HTMLButtonElement;
    const btnText = element.querySelector('#review-btn-text') as HTMLSpanElement;
    const spinner = element.querySelector('#review-btn-spinner') as HTMLDivElement;
    
    reviewBtn.disabled = true;
    spinner.style.display = 'block';

    try {
      currentSuggestions = await reviewCv(data);
      const reviewOutput = element.querySelector('#review-output');
      if (reviewOutput) reviewOutput.innerHTML = currentSuggestions;
      (element.querySelector('#review-modal') as HTMLElement).classList.remove('hidden');
    } catch (error) {
      console.error(error);
      alert(t.reviewError);
    } finally {
      reviewBtn.disabled = false;
      spinner.style.display = 'none';
    }
  };

  const handleApply = async () => {
    const applyBtn = element.querySelector('#modal-apply-btn') as HTMLButtonElement;
    const btnText = element.querySelector('#apply-btn-text') as HTMLSpanElement;
    const spinner = element.querySelector('#apply-btn-spinner') as HTMLDivElement;
    
    applyBtn.disabled = true;
    btnText.textContent = t.applying;
    spinner.style.display = 'inline-block';

    try {
      const newCvData = await improveCv(data, currentSuggestions);
      onUpdate(newCvData);
      (element.querySelector('#review-modal') as HTMLElement).classList.add('hidden');
    } catch (error) {
      console.error(error);
      alert(t.applyError);
    } finally {
      applyBtn.disabled = false;
      btnText.textContent = t.apply;
      spinner.style.display = 'none';
    }
  };

  const attachListeners = () => {
    element.querySelector('#print-cv-btn')?.addEventListener('click', () => window.print());
    element.querySelector('#review-cv-btn')?.addEventListener('click', handleReview);

    // Modal listeners
    const modal = element.querySelector('#review-modal') as HTMLElement;
    element.querySelector('#modal-cancel-btn')?.addEventListener('click', () => modal.classList.add('hidden'));
    element.querySelector('#modal-apply-btn')?.addEventListener('click', handleApply);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Template switcher listeners
    element.querySelectorAll('.template-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const newTemplateId = target.dataset.templateId as keyof typeof templates;
        if (newTemplateId && newTemplateId !== selectedTemplateId) {
          selectedTemplateId = newTemplateId;
          localStorage.setItem('selectedCvTemplate', newTemplateId);
          render();
        }
      });
    });
  };

  render();
  return element;
};
