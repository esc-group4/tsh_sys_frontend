/// <reference types="cypress" />
export {};

describe('Employee Home Page Tests', () => {
  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:8080/course/staff/6', {
      statusCode: 200,
      body: [
        {
            course_name: 'AED 2024',
            grade: 'A',
            attendance: 1,
            type: 'External',
            reasons: null,
            completedDateTime: null,
            startDate: '2024-08-17T16:00:00.000Z',
            endDate: '2024-08-18T16:00:00.000Z',
            providerName: 'SUTD',
            skill_name: 'AED',
            course_location: '3 Fusionopolis Link, Singapore 138542',
            course_description: 'Life saving course',
            status: 'Completed',
          },
          {
            course_name: 'Digital Marketing Strategy',
            grade: 'B',
            attendance: 1,
            type: 'External',
            reasons: null,
            completedDateTime: null,
            startDate: '2024-08-31T16:00:00.000Z',
            endDate: '2024-09-02T16:00:00.000Z',
            providerName: 'Google',
            skill_name: 'Digital Marketing',
            course_location: '70 Pasir Panjang Road, Singapore 117371',
            course_description: 'Online marketing techniques',
            status: 'Completed',
          },
          {
            course_name: 'Advanced Excel',
            grade: null,
            attendance: 0,
            type: 'External',
            reasons: null,
            completedDateTime: null,
            startDate: '2024-09-14T16:00:00.000Z',
            endDate: '2024-09-15T16:00:00.000Z',
            providerName: 'Microsoft',
            skill_name: 'Microsoft Office',
            course_location: '182 Cecil Street, Singapore 069547',
            course_description: 'Advanced spreadsheet techniques',
            status: 'Upcoming',
          },
      ],
    });

    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="username-input"]').type('emma@TSH.com');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/employeehome');
  });

  it('Displays the correct welcome message and pending training count', () => {
    cy.contains('Welcome to your training dashboard, Emma Lee!').should('be.visible');
    cy.get('.status-number').should('contain', '1'); // Upcoming Training count
  });

  it('Displays courses sorted by status', () => {
    cy.get('.courses-container').within(() => {
      cy.get('.event-box').eq(1).should('contain', 'AED 2024').and('contain', 'Completed');
      cy.get('.event-box').eq(0).should('contain', 'Advanced Excel').and('contain', 'Upcoming');
      cy.get('.event-box').eq(2).should('contain', 'Digital Marketing Strategy').and('contain', 'Completed');
    });
  });

  it('Navigates to course details on clicking an Upcoming or Expired course', () => {
    cy.get('.event-box').eq(0).click(); // Click on "Advanced React" course
    cy.url().should('include', 'http://localhost:3000/course/Advanced%20Excel');
    cy.go('back');
    cy.url().should('include', 'http://localhost:3000/employeehome');
  });
});
