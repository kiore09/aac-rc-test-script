describe('Home page UI e2e testing', () => {
  beforeEach('Should visit homepage and load elements', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText('Sample Multi-page Application').as('title');
    cy.get('[alt="TELUS Logo"]').as('telusLogo');
    cy.findAllByRole('link').contains('Home').as('homeTab');
    cy.findAllByRole('link').contains('Data').as('dataTab');
    cy.get('[data-testid="unordered-item-bullet"]').as('featureList');
    cy.get('[alt="Random critter"]').as('randomImage');
    cy.findAllByRole('button').contains('Fetch Image from API').as('fetchButton');
    cy.findAllByRole('link').contains('#team-name').as('teamLink')
  });

  it('displays the default image initially, first step', () => {
    cy.get('@randomImage').should('exist')
    cy.get('@randomImage').should('have.attr', 'src', '/default-image.jpg')
  });
  
  it('fetches and displays a new image from the API, on first step', () => {
    cy.get('@fetchButton').click({ force: true });
    cy.wait(2000);

    cy.get('@randomImage').should('have.attr', 'src', 'http://localhost:3000/api/random-image');
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
