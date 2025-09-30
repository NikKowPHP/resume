import { render as renderClassic } from './ClassicTemplate';
import { render as renderModern } from './ModernTemplate';

export const templates = {
  classic: {
    name: 'Classic',
    render: renderClassic
  },
  modern: {
    name: 'Modern',
    render: renderModern
  }
};
