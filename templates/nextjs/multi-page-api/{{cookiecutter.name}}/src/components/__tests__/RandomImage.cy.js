import RandomImage from "../RandomImage";

describe('RandomImage component testing', () => {
  beforeEach(() => {
    cy.mount(<RandomImage />)
    cy.findAllByRole('button').contains('Fetch Image from API').as('fetchButton');
  });

  it('displays the default image initially', () => {
    cy.get('img').should('have.attr', 'src', '/default-image.jpg');
  });

  it('fetches and displays a new image from the API', () => {
    // Stub the network request to ensure consistency in tests, , localhost:8080 is required for the test to pass
    cy.intercept('GET', '/api/random-image', {
      statusCode: 200,
      body: {
        url: 'http://localhost:8080/api/random-image',
      },
    }).as('fetchRandomImage');

    cy.get('@fetchButton').click({ force: true });
    cy.wait('@fetchRandomImage');

    cy.get('img').should('have.attr', 'src', 'http://localhost:8080/api/random-image');
  });

  it('handles error when fetching image fails', () => {
    cy.intercept('GET', '/api/random-image', {
      statusCode: 500,
    }).as('fetchRandomImageFail');

    cy.get('@fetchButton').click({ force: true });
    cy.wait('@fetchRandomImageFail');
  });
});
