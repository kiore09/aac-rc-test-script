import FileUpload from '../FileUpload';
import sampleData from '../../../public/data/sampleData';
import DataProvider from '../DataProvider'

describe('FileUpload component testing', () => {

  beforeEach(() => {
    cy.mount(
      <DataProvider>
        <FileUpload tableData={sampleData} />
      </DataProvider>);
    cy.get('#file-upload').should('exist').as('fileInput');
    cy.get('#file-upload').should('have.value', '');
    cy.findAllByRole('button').contains('Browse').as('browseButton');
    cy.findAllByRole('button').contains('Add File to Table').as('addFileButton');
    cy.findByText('No file chosen').as('noFileChosen');
  })

  it('should render buttons', () => {
    cy.get('@browseButton').should('exist');
    cy.get('@addFileButton').should('exist');
    cy.get('@noFileChosen').should('exist');
  });

  it('should browse for example-large.txt file and receive warning message', () => {
    cy.get('@browseButton').click({ force: true });
    cy.get('@fileInput').attachFile('example-large.txt');
    cy.findByText('No file chosen').should('exist');
    cy.findByText('Note: Text file must be less than 10KB').should('exist');
  });

  it('should browse for example-small.txt file and handle file upload and display success notification', () => {
    cy.mount(
      <DataProvider>
        <FileUpload />
      </DataProvider>);
    cy.get('@browseButton').click({ force: true });
    cy.fixture('example-small.txt').then((content) => {
      cy.get('#file-upload').attachFile('example-small.txt').then((input) => {
        const file = input[0].files[0];
        expect(file.name).to.eq('example-small.txt');
        expect(file.size).to.be.lessThan(10 * 1024);
        cy.findByText(file.name).should('exist');
        cy.wait(2000);
        cy.get('@addFileButton').click({ force: true });
        cy.wait(3000);
        cy.findByText('example-small.txt added to table successfully!').should('exist');
      })
    })
  });
});
