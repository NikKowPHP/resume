import { renderCvView } from './components/CvView';
import { renderLetterView } from './components/LetterView';
import cvDataJson from './data/cv-data.json';
import { CVData, MultilingualCVData, LanguageCode } from './types';

const uiTranslations = {
  fr: { cv: 'CV', letter: 'Lettre de Motivation' },
  en: { cv: 'CV', letter: 'Cover Letter' },
  pl: { cv: 'CV', letter: 'List Motywacyjny' },
  de: { cv: 'Lebenslauf', letter: 'Anschreiben' },
};

export class App {
  private container: HTMLElement;
  private navCV: HTMLElement | null;
  private navLetter: HTMLElement | null;
  private cvData: MultilingualCVData = cvDataJson as MultilingualCVData;
  private currentLanguage: LanguageCode = 'fr';

  constructor(container: HTMLElement) {
    this.container = container;
    this.navCV = document.getElementById('nav-cv');
    this.navLetter = document.getElementById('nav-letter');

    this.initRouter();
    this.initLanguageSwitcher();
    this.handleNavigation(); // Initial render
  }

  private initRouter() {
    window.addEventListener('hashchange', this.handleNavigation.bind(this));
    this.navCV?.addEventListener('click', () => window.location.hash = 'cv');
    this.navLetter?.addEventListener('click', () => window.location.hash = 'letter');
  }
  
  private initLanguageSwitcher() {
    const switcher = document.querySelector('.lang-switcher');
    switcher?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.lang-switch')) {
        const lang = target.dataset.lang as LanguageCode;
        if (lang) {
          this.setLanguage(lang);
        }
      }
    });
  }

  private setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-switch').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Re-render view with new language
    this.handleNavigation();
  }

  private updateNavText() {
    if (this.navCV) this.navCV.textContent = uiTranslations[this.currentLanguage].cv;
    if (this.navLetter) this.navLetter.textContent = uiTranslations[this.currentLanguage].letter;
  }

  private handleNavigation() {
    const hash = window.location.hash || '#cv';
    this.container.innerHTML = ''; // Clear container
    this.updateNavText();

    const currentCvData = this.cvData[this.currentLanguage];

    if (hash === '#cv') {
      this.container.appendChild(renderCvView(currentCvData, this.currentLanguage));
      this.navCV?.classList.add('active');
      this.navLetter?.classList.remove('active');
    } else if (hash === '#letter') {
      this.container.appendChild(renderLetterView(this.currentLanguage, this.cvData));
      this.navLetter?.classList.add('active');
      this.navCV?.classList.remove('active');
    }
  }
}
