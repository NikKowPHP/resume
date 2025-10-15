import { renderCvView } from './components/CvView';
import { renderLetterView } from './components/LetterView';
import cvDataJson from './data/cv-data.json';
import { CVData, LanguageCode, CVDatabase } from './types';

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
  private cvData: CVDatabase;
  private currentLanguage: LanguageCode = 'fr';
  private currentCvId: string;

  constructor(container: HTMLElement) {
    this.container = container;
    this.navCV = document.getElementById('nav-cv');
    this.navLetter = document.getElementById('nav-letter');
    
    this.cvData = this.loadCvData();
    this.currentCvId = localStorage.getItem('selectedCvId') || (this.cvData.length > 0 ? this.cvData[0].id : '');

    this.initRouter();
    this.initLanguageSwitcher();
    this.initCvSwitcher();
    this.handleNavigation(); // Initial render
  }

  private loadCvData(): CVDatabase {
    const storedData = localStorage.getItem('cvDatabase');
    if (storedData) {
      try {
        return JSON.parse(storedData) as CVDatabase;
      } catch (e) {
        console.error("Failed to parse CV data from localStorage, falling back to default.", e);
        localStorage.removeItem('cvDatabase');
      }
    }
    // If no stored data or parsing failed, load from JSON and store it.
    const initialData = cvDataJson as CVDatabase;
    localStorage.setItem('cvDatabase', JSON.stringify(initialData));
    return initialData;
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

  private initCvSwitcher() {
    const switcher = document.getElementById('cv-switcher') as HTMLSelectElement;
    if (!switcher) return;

    switcher.innerHTML = ''; // Clear existing options

    this.cvData.forEach(profile => {
      const option = document.createElement('option');
      option.value = profile.id;
      option.textContent = profile.name;
      option.selected = profile.id === this.currentCvId;
      switcher.appendChild(option);
    });

    switcher.addEventListener('change', (e) => {
      const newCvId = (e.target as HTMLSelectElement).value;
      this.setCv(newCvId);
    });
  }

  private setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    
    document.querySelectorAll('.lang-switch').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    this.handleNavigation();
  }

  private setCv(cvId: string) {
    this.currentCvId = cvId;
    localStorage.setItem('selectedCvId', cvId);
    this.handleNavigation(); // Re-render the view with the new CV data
  }

  private updateNavText() {
    if (this.navCV) this.navCV.textContent = uiTranslations[this.currentLanguage].cv;
    if (this.navLetter) this.navLetter.textContent = uiTranslations[this.currentLanguage].letter;
  }

  private updateCvData = (newCvData: CVData) => {
    const profileToUpdate = this.cvData.find(p => p.id === this.currentCvId);
    if (profileToUpdate) {
      profileToUpdate.data[this.currentLanguage] = newCvData;
      localStorage.setItem('cvDatabase', JSON.stringify(this.cvData)); // Persist changes
      this.handleNavigation(); // Re-render with the new data
    } else {
      console.error('Failed to find CV profile to update:', this.currentCvId);
    }
  }

  private handleNavigation() {
    const hash = window.location.hash || '#cv';
    this.container.innerHTML = ''; 
    this.updateNavText();
    this.initCvSwitcher(); // Keep switcher in sync

    const currentProfile = this.cvData.find(p => p.id === this.currentCvId);
    if (!currentProfile) {
      // If currentCvId from localStorage is invalid, reset to the first one.
      console.error('Current CV profile not found! Resetting to default.');
      if (this.cvData.length > 0) {
        this.setCv(this.cvData[0].id);
      }
      return; // setCv will trigger handleNavigation again.
    }
    const currentCvData = currentProfile.data[this.currentLanguage];

    if (hash === '#cv') {
      this.container.appendChild(renderCvView(currentCvData, this.currentLanguage, this.updateCvData));
      this.navCV?.classList.add('active');
      this.navLetter?.classList.remove('active');
    } else if (hash === '#letter') {
      this.container.appendChild(renderLetterView(this.currentLanguage, this.cvData, this.currentCvId));
      this.navLetter?.classList.add('active');
      this.navCV?.classList.remove('active');
    }
  }
}
      