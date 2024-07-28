/// <reference types="cypress" />
export {};

describe('Login Page System Tests', () => {

    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('Denies access with empty email', () => {
      cy.get('[data-testid="username-input"]').clear();
      cy.get('[data-testid="password-input"]').type('password1');
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="username-error"]').should('contain', 'username is required'); // fix this shit

    });
  
    it('Denies access with empty password', () => {
      cy.get('[data-testid="username-input"]').type('javertan@TSH.com');
      cy.get('[data-testid="password-input"]').clear();
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="password-error"]').should('contain', 'password is required');    });  // fix this shit
  
    it('Denies access with invalid email format', () => {
      cy.get('[data-testid="username-input"]').type('javertan');
      cy.get('[data-testid="password-input"]').type('password1');
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="username-error"]').should('contain', 'invalid email format');    });  // fix this shit
  
    it('Denies access with valid inputs but failed backend verification', () => {
      cy.intercept('POST', 'http://localhost:3001/token/verifyToken', {
        statusCode: 401,
        body: { error: 'Token verification failed' },
      });
  
      cy.get('[data-testid="username-input"]').type('javertan@TSH.com');
      cy.get('[data-testid="password-input"]').type('asdasdads');
      cy.get('button[type="submit"]').click();
      cy.get('.error-msg').should('contain', 'Failed to sign in. Please check your credentials and try again.');    });
  
    it('Allows access with valid and verified inputs', () => {
      cy.intercept('POST', 'http://localhost:3001/token/verifyToken', {
        statusCode: 200,
        body: { success: true },
      });
  
      cy.get('[data-testid="username-input"]').type('javertan@TSH.com');
      cy.get('[data-testid="password-input"]').type('password1');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/employeeHome');
    });
  });
  
