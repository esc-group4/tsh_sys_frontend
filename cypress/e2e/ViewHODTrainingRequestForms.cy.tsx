describe('View Scheduled Trainings', () => {
    before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="username-input"]').type('javiertan@TSH.com');
    cy.get('input[data-testid="password-input"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'http://localhost:3000/hodhome');
    });
  
    it('should display approved, pending, and rejected trainings correctly', () => {
      cy.contains('Scheduled Trainings').should('have.css', 'border-bottom', '2px solid rgb(51, 51, 51)');
  
      cy.get('h1').contains('Approved').should('be.visible');
      cy.get('table').eq(0).within(() => {
        cy.get('th').eq(0).contains('No.');
        cy.get('th').eq(1).contains('Training Need');
        cy.get('th').eq(2).contains('Type');
        cy.get('th').eq(3).contains('Date');
        cy.get('th').eq(4).contains('Personnel');
        // Check if there are any approved trainings
        cy.get('tbody tr').should('have.length.at.least', 0);
      });
  
      cy.get('h1').contains('Pending Approval').should('be.visible');
      cy.get('table').eq(1).within(() => {
        cy.get('th').eq(0).contains('No.');
        cy.get('th').eq(1).contains('Training Need');
        cy.get('th').eq(2).contains('Type');
        cy.get('th').eq(3).contains('Date');
        cy.get('th').eq(4).contains('Personnel');
        cy.get('tbody tr').should('have.length.at.least', 2);
      });
  
      cy.get('h1').contains('Rejected').should('be.visible');
      cy.get('table').eq(2).within(() => {
        cy.get('th').eq(0).contains('No.');
        cy.get('th').eq(1).contains('Training Need');
        cy.get('th').eq(2).contains('Type');
        cy.get('th').eq(3).contains('Date');
        cy.get('th').eq(4).contains('Personnel');
        cy.get('tbody tr').should('have.length.at.least', 0);
      });
    });
  });
  