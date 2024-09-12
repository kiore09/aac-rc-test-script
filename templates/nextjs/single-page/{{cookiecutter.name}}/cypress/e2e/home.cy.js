import 'cypress-file-upload';

describe('Home page UI e2e testing, first step', () => {
  beforeEach('Should visit homepage and load elements', () => {
    cy.visit('http://localhost:3000/')

    cy.findByText('Sample Single-page Application').as('title');
    cy.get('[alt="TELUS Logo"]').as('telusLogo');
    cy.findByText('Welcome User!').as('welcomeUser');
    cy.get('[data-testid="unordered-item-bullet"]').as('featureList');
    cy.get('input[aria-label="Special character validator"]').as('validatorInput');
    cy.findAllByRole('button').contains('Validate').as('validateButton');
    cy.findAllByRole('button').contains('Next').as('nextButton');
    cy.findAllByRole('button').contains('Previous').as('previousButton');
    cy.findAllByRole('link').contains('#team-name').as('teamLink')
  });

  it('should leave input blank, validate and have correct feedback, on first step', () => {
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Please enter text to validate').should('exist');
  });

  it('should enter text without special characters, validate and have correct feedback, on first step', () => {
    cy.get('@validatorInput').type('characters');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input does not contain special characters').should('exist');
  });

  it('should enter text with special characters, validate and have correct feedback, on first step', () => {
    cy.get('@validatorInput').type('!characters!');
    cy.get('@validateButton').click({ force: true });
    cy.findByText('Input contains special characters').should('exist');
  });

  it('should upload small file and submit successfully, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.findAllByRole('button').contains('Browse').as('browseButton');
    const fileName = 'example-small.txt';
    cy.get('#file-upload').as('fileInput');
    cy.findByText('Files Uploaded: 50').as('filesUploaded');
    cy.findAllByRole('button').contains('Add File to Table').as('addFileButton');
    cy.get('@browseButton').attachFile(fileName);
    cy.get('@fileInput').attachFile(fileName);
    cy.findByText(fileName).should('exist');
    cy.wait(2000);
    cy.get('@addFileButton').click({ force: true });
    cy.wait(3000);
    cy.findByText('Files Uploaded: 51').should('exist');
    cy.findByText('example-small.txt added to table successfully!').should('exist');
    cy.get('tbody').contains('example-small.txt').should('exist');
  });

  it('should upload large file and receive warning, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.findAllByRole('button').contains('Browse').as('browseButton');
    cy.get('#file-upload').as('fileInput');
    cy.findAllByRole('button').contains('Add File to Table').as('addFileButton');
    const fileName = 'example-large.txt';
    const warningMessage = 'Note: Text file must be less than 10KB';
    cy.get('@fileInput').attachFile(fileName);
    cy.findByText('No file chosen').should('exist');
    cy.findByText(warningMessage).should('exist');
  });

  it('should render table with 11 rows including table header, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.get('[class="Table__StyledContainer-components-web__sc-10d9q3m-0 kGQUmL"]').as('fileTable');
    cy.get('@fileTable').find('tr').should('have.length', 11);
  });

  it('should click on the next page button and render the next 11 rows, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.get('[class="Table__StyledContainer-components-web__sc-10d9q3m-0 kGQUmL"]').as('fileTable');
    cy.get('[aria-label="Go to next page"]').as('nextPage');
    cy.get('@nextPage').click({ force: true });
    cy.get('@fileTable').find('tr').should('have.length', 11);
    cy.get('@fileTable').find('tr').eq(1).should('contain', 'file_40.txt');
    cy.get('@fileTable').find('tr').eq(10).should('contain', 'file_31.txt');
  });

  it('should click on back page button and render the previous 11 rows, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.get('[class="Table__StyledContainer-components-web__sc-10d9q3m-0 kGQUmL"]').as('fileTable');
    cy.get('[aria-label="Go to next page"]').as('nextPage');
    cy.get('@nextPage').click({ force: true });
    cy.get('@nextPage').click({ force: true });
    cy.get('@fileTable').find('tr').should('have.length', 11);
    cy.get('@fileTable').find('tr').eq(1).should('contain', 'file_30.txt');
    cy.get('@fileTable').find('tr').eq(10).should('contain', 'file_21.txt');
  });

  it('should click on download link and download a file, on second step', () => {
    cy.get('@nextButton').click({ force: true });
    cy.get('[download="file_50.txt"]').click({ force: true });
    cy.readFile('cypress/downloads/file_50.txt');
  });
});
