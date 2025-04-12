// cypress/support/component.js

import { mount } from 'cypress/react';
Cypress.Commands.add('mount', mount);

import './commands';
