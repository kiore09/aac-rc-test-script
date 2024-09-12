{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-19-2024
Description: File table component renders sampleData from DataProvider, download implementation and pagination
===========================================================================
*/

'use client'
import { useState, useEffect, useMemo, useContext } from 'react'
import Download from '@telus-uds/palette-allium/build/web/icons/Download'
import {
  Box,
  FlexGrid,
  Icon,
  Link,
  Pagination,
  Table,
  Typography,
} from '@telus-uds/components-web'
import { DataContext } from './DataProvider';
import logger from '../utils/sample.logger'

/**
 * FileTable displays uploaded files, download links, and pagination.
 * @param {Array} tableData - The files data.
 */

function FileTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fileUrls, setFileUrls] = useState([]);
  const { tableData } = useContext(DataContext);

  // sortedTableData is a memoized version of tableData, sorted in reverse order
  const sortedTableData = useMemo(() => [...tableData].reverse(), [tableData]);
  const paginationCount = Math.ceil(tableData.length / 10);

  // Create a URL for the file content
  const downloadFile = (file) => {
    const fileUrl = URL.createObjectURL(new Blob([file], { type: 'text/plain' }));
    return fileUrl
  }

  // useEffect hook is used to create URLs for all files when sortedTableData changes
  useEffect(() => {
    const urls = sortedTableData.map(item => downloadFile(item.file_content));
    setFileUrls(urls);
    logger.info('File URLs updated');
  }, [sortedTableData]);

  return (
    <FlexGrid outsideGutter={false}>
      <FlexGrid.Row horizontalAlign="center">
        <Box bottom={4}>
          <Typography variant={{ size: 'h4' }}>
            {`Total Files: ${tableData.length}`}
          </Typography>
        </Box>
      </FlexGrid.Row>
      <FlexGrid.Row horizontalAlign="center">
        <FlexGrid.Col>
          <div className='tableStyle'>
            <Table spacing="compact" text="small">
              <Table.Header>
                <Table.Cell>File Name</Table.Cell>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>Download</Table.Cell>
              </Table.Header>
              <Table.Body>
                {sortedTableData.slice(currentPage * 10, (currentPage + 1) * 10).map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.file_name}</Table.Cell>
                    <Table.Cell>{item.date}</Table.Cell>
                    <Table.Cell>
                      <Box horizontal={4}>
                        <Link href={fileUrls[index]} download={item.file_name}>
                          <Icon icon={Download} variant={{ size: 'small', color: 'success' }} />
                        </Link>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </FlexGrid.Col>
      </FlexGrid.Row>
      <FlexGrid.Row horizontalAlign="center">
        <Box vertical={4}>
          <Pagination>
            {Array.from({ length: paginationCount }, (_, index) => (
              <Pagination.PageButton
                key={index}
                onPress={() => setCurrentPage(index)}
                isActive={currentPage === index}
              />
            ))}
          </Pagination>
        </Box>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export default FileTable
{% endraw %}
