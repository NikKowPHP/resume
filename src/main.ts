import { App } from './App';
import './styles/base.css';
import './styles/classic-template.css';
import './styles/modern-template.css';
import './styles/compact-template.css';
import './styles/corporate-template.css';


document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    new App(appContainer);
  } else {
    console.error('App container not found!');
  }
});
