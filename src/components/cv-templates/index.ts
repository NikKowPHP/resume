import { render as renderClassic } from './ClassicTemplate';
import { render as renderModern } from './ModernTemplate';
import { render as renderCompact } from './CompactTemplate';
import { render as renderCorporate } from './CorporateTemplate';

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
  }
};
