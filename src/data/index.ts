import { CVDatabase } from '../types';

import fullstackEn from './fullstack-en.json';
import fullstackFr from './fullstack-fr.json';
import frontendEn from './frontend-en.json';
import frontendFr from './frontend-fr.json';
import backendEn from './backend-en.json';
import backendFr from './backend-fr.json';
import phpEn from './php-en.json';
import phpFr from './php-fr.json';

export const cvDatabase: CVDatabase = [
  {
    id: 'fullstack_engineer',
    name: 'Full Stack Engineer',
    data: {
      en: fullstackEn,
      fr: fullstackFr
    }
  },
  {
    id: 'frontend_engineer',
    name: 'Front End Engineer',
    data: {
      en: frontendEn,
      fr: frontendFr
    }
  },
  {
    id: 'backend_engineer',
    name: 'Back End Engineer',
    data: {
      en: backendEn,
      fr: backendFr
    }
  },
  {
    id: 'php_engineer',
    name: 'PHP Engineer',
    data: {
      en: phpEn,
      fr: phpFr
    }
  }
];