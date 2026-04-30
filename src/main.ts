import { App } from './App';
import './styles/base.css';
import './styles/classic-template.css';
import './styles/ats-template.css';


document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    new App(appContainer);
  } else {
    console.error('App container not found!');
  }
});
