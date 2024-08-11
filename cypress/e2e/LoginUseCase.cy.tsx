/// <reference types="cypress" />
export {};

describe('Login Page System Tests', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('Denies access with empty email', () => {
      cy.get('[data-testid="username-input"]').clear();
      cy.get('[data-testid="password-input"]').type('password1');
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="error-msg"]').should('contain', 'Username is required.'); 

    });
  
    it('Denies access with empty password', () => {
      cy.get('[data-testid="username-input"]').type('javertan@TSH.com');
      cy.get('[data-testid="password-input"]').clear();
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="error-msg"]').should('contain', 'Password is required.');    }); 
  
    it('Denies access with invalid email format', () => {
      cy.get('[data-testid="username-input"]').type('javertan');
      cy.get('[data-testid="password-input"]').type('password1');
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="error-msg"]').should('contain', 'Invalid email format.');    });
  
  
    it('Allows access with valid and verified inputs, goes to hodHome', () => {
      cy.intercept('POST', 'http://localhost:8080/staff/login', {
        statusCode: 200,
        body: { success: true,role: 'HOD' }
            });
  
      cy.get('[data-testid="username-input"]').type('javertan@TSH.com');
      cy.get('[data-testid="password-input"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', 'http://localhost:3000/hodhome');
    });
    it('Allows access with valid and verified inputs, goes to employeeHome', () => {
      cy.intercept('POST', 'http://localhost:8080/staff/login', {
        statusCode: 200,
        body: { success: true }
            });
  
      cy.get('[data-testid="username-input"]').type('emma@TSH.com');
      cy.get('[data-testid="password-input"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', 'http://localhost:3000/employeehome');
    });
    it('Allows access with valid and verified inputs, goes to hrHome', () => {
      cy.intercept('POST', 'http://localhost:8080/staff/login', {
        statusCode: 200,
        body: { success: true,
          role: 'HR'
         }      
        });
  
      cy.get('[data-testid="username-input"]').type('hoxiaoyang321@gmail.com');
      cy.get('[data-testid="password-input"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', 'http://localhost:3000/hrhome');
    });
  });
  
