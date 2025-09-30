import { renderCvView } from './components/CvView';
import { renderLetterView } from './components/LetterView';
import cvData from './data/cv-data.json';
import { CVData } from './types';

export class App {
  private container: HTMLElement;
  private navCV: HTMLElement | null;
  private navLetter: HTMLElement | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.navCV = document.getElementById('nav-cv');
    this.navLetter = document.getElementById('nav-letter');

    this.initRouter();
    this.handleNavigation(); // Initial render
  }

  private initRouter() {
    window.addEventListener('hashchange', this.handleNavigation.bind(this));
    // Ensure clicking nav links updates the view correctly
    this.navCV?.addEventListener('click', () => window.location.hash = 'cv');
    this.navLetter?.addEventListener('click', () => window.location.hash = 'letter');
  }

  private handleNavigation() {
    const hash = window.location.hash || '#cv';
    this.container.innerHTML = ''; // Clear container

    if (hash === '#cv') {
      this.container.appendChild(renderCvView(cvData as CVData));
      this.navCV?.classList.add('active');
      this.navLetter?.classList.remove('active');
    } else if (hash === '#letter') {
      this.container.appendChild(renderLetterView());
      this.navLetter?.classList.add('active');
      this.navCV?.classList.remove('active');
    }
  }
}
