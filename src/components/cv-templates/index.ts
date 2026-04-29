import { render as renderClassic } from './ClassicTemplate';
import { render as renderModern } from './ModernTemplate';
import { render as renderCompact } from './CompactTemplate';
import { render as renderCorporate } from './CorporateTemplate';
import { render as renderAts } from './AtsTemplate';
import { render as renderBackend } from './BackendTemplate';

export const templates = {
  classic: {
    name: 'Classic',
    render: renderClassic
  },
  modern: {
    name: 'Modern',
    render: renderModern
  },
  compact: {
    name: 'Compact',
    render: renderCompact
  },
  corporate: {
    name: 'Corporate',
    render: renderCorporate
  },
  backend: {
    name: 'Backend',
    render: renderBackend
  },
  ats: {
    name: 'ATS Friendly',
    render: renderAts
  }
};
