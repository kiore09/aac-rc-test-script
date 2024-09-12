import TextValidator from '../TextValidator'

describe('TextValidator component testing', () => {
  beforeEach(() => {
    cy.mount(<TextValidator />)
    cy.get('label').contains('Special character validator').as('validatorLabel');
    cy.get('input[type="text"]').as('validatorInput');
    cy.findByRole('button').contains('Validate').as('validateButton');
  })

  it('should render text input and validate button', () => {
    cy.get('@validatorLabel').should('exist');
    cy.get('@validatorInput').should('exist');
    cy.get('@validateButton').should('exist');
  });

  it('should leave input blank, validate and have correct feedback', () => {
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Please enter text to validate').should('exist');
    cy.get('div[id="input-feedback-6"]').should('have.css', 'background-color', 'rgb(239, 237, 255)');
  });

  it('should enter text without special characters, validate and have correct feedback', () => {
    cy.get('@validatorInput').type('characters');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input does not contain special characters').should('exist');
    cy.get('div[id="input-feedback-9"]').should('have.css', 'background-color', 'rgb(244, 249, 242)');
  });

  it('should enter text with special characters, validate and have correct feedback', () => {
    cy.get('@validatorInput').type('!characters!');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input contains special characters').should('exist');
    cy.get('div[id="input-feedback-12"]').should('have.attr', 'style').should('include', 'background-color: rgb(255, 246, 248)');
  });
});
