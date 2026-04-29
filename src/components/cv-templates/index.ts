import { render as renderClassic } from './ClassicTemplate';
import { render as renderAts } from './AtsTemplate';

export const templates = {
  classic: {
    name: 'Classic',
    render: renderClassic
  },
  ats: {
    name: 'ATS Friendly',
    render: renderAts
  }
};
