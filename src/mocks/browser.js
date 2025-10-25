// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Shob handler diye worker setup korchi
export const worker = setupWorker(...handlers);
