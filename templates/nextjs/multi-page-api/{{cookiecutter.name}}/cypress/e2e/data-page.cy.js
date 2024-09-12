describe('Home page UI e2e testing', () => {
  beforeEach('Should visit data-page and load elements', () => {
    cy.visit('http://localhost:3000/data-page')

    cy.findByText('Sample Multi-page Application').as('title');
    cy.get('[alt="TELUS Logo"]').as('telusLogo');
    cy.findAllByRole('link').contains('Home').as('homeTab');
    cy.findAllByRole('link').contains('Data').as('dataTab');
    cy.findAllByRole('button').contains('Browse').as('browseButton');
    cy.get('#file-upload').as('fileInput');
    cy.findAllByRole('button').contains('Add File to Table').as('addFileButton');
    cy.findByText('Total Files: 50').as('filesUploaded');
    cy.get('[class="Table__StyledContainer-components-web__sc-10d9q3m-0 kGQUmL"]').as('fileTable');
    cy.get('[aria-label="Go to next page"]').as('nextPage');
    cy.findAllByRole('link').contains('#team-name').as('teamLink')
    cy.get('[download]').as('downloadLinks');
  });


  it('should upload small file and submit successfully', () => {
    const fileName = 'example-small.txt';
    cy.get('@browseButton').attachFile(fileName);
    cy.get('@fileInput').attachFile(fileName);
    cy.findByText(fileName).should('exist');
    cy.wait(2000);
    cy.get('@addFileButton').click({ force: true });
    cy.wait(3000);
    cy.findByText('example-small.txt added to table successfully!').should('exist');
  });

  it('should upload large file and receive warning', () => {
    const fileName = 'example-large.txt';
    const warningMessage = 'Note: Text file must be less than 10KB';
    cy.get('@fileInput').attachFile(fileName);
    cy.findByText('No file chosen').should('exist');
    cy.findByText(warningMessage).should('exist');
  });

  it('should render table with 11 rows including table header', () => {
    cy.get('@fileTable').find('tr').should('have.length', 11);
  });

  it('should click on the next page button and render the next 11 rows', () => {
    cy.get('@nextPage').click({ force: true });
    cy.get('@fileTable').find('tr').should('have.length', 11);
    cy.get('@fileTable').find('tr').eq(1).should('contain', 'file_40.txt');
    cy.get('@fileTable').find('tr').eq(10).should('contain', 'file_31.txt');
  });

  it('should click on back page button and render the previous 11 rows', () => {
    cy.get('@nextPage').click({ force: true });
    cy.get('@nextPage').click({ force: true });
    cy.get('@fileTable').find('tr').should('have.length', 11);
    cy.get('@fileTable').find('tr').eq(1).should('contain', 'file_30.txt');
    cy.get('@fileTable').find('tr').eq(10).should('contain', 'file_21.txt');
  });

  it('should click on download link and download a file', () => {
    cy.get('[download="file_50.txt"]').click({ force: true });
    cy.readFile('cypress/downloads/file_50.txt');
  });

  it('should render home and data-page navbar, click on home tab to navigate to home, and click on data-page to navigate back to data-page', () => {
    cy.get('@homeTab').should('exist');
    cy.get('@dataTab').should('exist');
    cy.get('@homeTab').click({ force: true });
    cy.url().should('include', 'http://localhost:3000/');
    cy.get('@dataTab').click({ force: true });
    cy.url().should('include', 'http://localhost:3000/data-page');
  });
});
