import FileTable from '../FileTable';
import sampleData from '../../../cypress/fixtures/sampleData';

describe('FileTable component testing', () => {
  beforeEach(() => {
    cy.mount(<FileTable tableData={sampleData} />)
  });
  it('should render table', () => {
    cy.get('table').should('exist');
  });
  
  it('should render Files Uploaded: 50', () => {
    cy.findByText(`Files Uploaded: ${sampleData.length}`).should('exist');
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
