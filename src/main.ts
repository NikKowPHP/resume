import { App } from './App';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    new App(appContainer);
  } else {
    console.error('App container not found!');
  }
});
