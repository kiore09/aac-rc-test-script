describe('Home page UI e2e testing', () => {
  beforeEach('Should visit homepage and load elements', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText('Sample Multi-page Application').as('title');
    cy.get('[alt="TELUS Logo"]').as('telusLogo');
    cy.findAllByRole('link').contains('Home').as('homeTab');
    cy.findAllByRole('link').contains('Data').as('dataTab');
    cy.get('[data-testid="unordered-item-bullet"]').as('featureList');
    cy.get('input[aria-label="Special character validator"]').as('validatorInput');
    cy.findAllByRole('button').contains('Validate').as('validateButton');
    cy.findAllByRole('link').contains('#team-name').as('teamLink')
  });

  it('should leave input blank, validate and have correct feedback', () => {
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Please enter text to validate').should('exist');
  });

  it('should enter text without special characters, validate and have correct feedback', () => {
    cy.get('@validatorInput').type('characters');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input does not contain special characters').should('exist');
  });

  it('should enter text with special characters, validate and have correct feedback', () => {
    cy.get('@validatorInput').type('!characters!');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input contains special characters').should('exist');
  });

  it('should render home and data-page navbar, click on data-page tab to navigate to data-page, and click on home to navigate back to home', () => {
    cy.get('@homeTab').should('exist');
    cy.get('@dataTab').should('exist');
    cy.get('@dataTab').click({ force: true });
    cy.url().should('include', 'http://localhost:3000/data-page');
    cy.get('@homeTab').click({ force: true });
    cy.url().should('include', 'http://localhost:3000/');
  });
});
