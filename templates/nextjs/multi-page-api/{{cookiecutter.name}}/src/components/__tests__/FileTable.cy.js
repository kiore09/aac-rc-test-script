import FileTable from '../FileTable';
import sampleData from '../../../cypress/fixtures/sampleData';
import DataProvider from '../DataProvider'

describe('FileTable component testing', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/files', {
      statusCode: 200,
      body: sampleData
    }).as('fetchFiles');
    cy.mount(
      <DataProvider>
        <FileTable />
      </DataProvider>
    );
    cy.wait('@fetchFiles');
  });

  it('should render table', () => {
    cy.get('table').should('exist');
  });

  it('should render Files Uploaded: 50', () => {
    cy.findByText(`Total Files: ${sampleData.length}`).should('exist');
  });

  it('should render table with 11 rows including table header', () => {
    cy.get('tr').should('have.length', 11);
  });

  it('should click on the next page button and render the next 11 rows', () => {
    cy.findAllByRole('button').contains('Next').click({ force: true });
    cy.get('tr').should('have.length', 11);
    cy.get('tr').eq(1).should('contain', 'file_40.txt');
    cy.get('tr').eq(10).should('contain', 'file_31.txt');
  });

  it('should click on back page button and render the previous 11 rows', () => {
    cy.findAllByRole('button').contains('Next').click({ force: true });
    cy.findAllByRole('button').contains('Next').click({ force: true });
    cy.get('tr').should('have.length', 11);
    cy.get('tr').eq(1).should('contain', 'file_30.txt');
    cy.get('tr').eq(10).should('contain', 'file_21.txt');
  });

  it('should click on download link and download a file', () => {
    cy.get('[download="file_50.txt"]').click({ force: true });
    cy.readFile('cypress/downloads/file_50.txt');
  });
});
