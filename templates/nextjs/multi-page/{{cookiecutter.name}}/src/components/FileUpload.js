{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-19-2024
Description: File upload component of max 10KB files
===========================================================================
*/

'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import styles from './styles.module.css';

import {
  Box,
  Button,
  FlexGrid,
  Notification,
  Typography,
} from '@telus-uds/components-web'
import { DataContext } from './DataProvider';
import logger from '../utils/sample.logger'

function FileUpload() {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('');
  const [savedFileName, setSavedFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileSizeOk, setFileSize] = useState(true)

  const { tableData, setTableData } = useContext(DataContext);

  // Handle the file input change event
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile === undefined) {
      setUploadSuccess(false);
      logger.error("No file selected");
      return;
    } else {
      setFileName(selectedFile.name)
      logger.info("File selected: ", selectedFile.name);
    }

    if (selectedFile !== null) {
      const reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = (event) => {
        const maxFileSize = 10 * 1024;
        const fileContent = event.target.result;
        if (fileContent.length > maxFileSize) {
          setFileSize(false)
          setFileName(null);
          setUploadSuccess(false);
          logger.warn("File size exceeds 10KB");
        } else {
          setFileSize(true)
          const uploadedFile = {
            content: fileContent,
            name: fileName
          }
          setFileContent(uploadedFile.content);
          setUploadSuccess(false);
          logger.info("File size within 10KB");
        }
      }
    }
  }

  // Create a date stamp for the file added
  const createDateStamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Handle the file upload event
  const handleSubmit = async () => {
    if (fileName && fileContent) {

      const newFile = {
        id: tableData.length + 1,
        file_name: fileName,
        date: createDateStamp(),
        file_content: fileContent
      }

      const updatedTableData = tableData.concat(newFile);
      try {
        // Store updatedTableData into sessionStorage
        sessionStorage.setItem('updatedTableData', JSON.stringify(updatedTableData));
        // Update tableData state
        setTableData(updatedTableData);
        setUploadSuccess(true);
      } catch (error) {
        logger.error('Error uploading file:', error);
        return;
      }
      setSavedFileName(fileName);
      fileInputRef.current.value = null;
    }
  };

  // useEffect hook is used to reset the fileName state when uploadSuccess state changes
  useEffect(() => {
    if (uploadSuccess) {
      setFileName(null);
    }
  }, [uploadSuccess]);

  return (
    <>
      <Typography variant={{ size: 'h3' }}>File Upload</Typography>
      <FlexGrid outsideGutter={false}>
        <FlexGrid.Row verticalAlign="middle">
          <FlexGrid.Col lg={6}>
            <Box vertical={4}>
              <FlexGrid.Row>
                <Button
                  variant={{ priority: 'low', size: 'small' }}
                  onPress={() => fileInputRef.current.click()}
                >
                  Browse
                </Button>
                <div className={styles.chooseFile}>
                  <input
                    type="file"
                    id="file-upload"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <Box horizontal={4} vertical={2}>
                  <Typography>{fileName ? fileName : `No file chosen`}</Typography>
                </Box>
              </FlexGrid.Row>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <FlexGrid.Col lg={6}>
            <Button
              variant={{ priority: 'high' }}
              type="submit"
              onClick={handleSubmit}
              inactive={!fileName || !fileSizeOk}
            >
              Add File to Table
            </Button>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <FlexGrid.Col lg={6}>
            <Box vertical={4}>
              {!fileSizeOk && (
                <Notification variant={{ validation: 'warning' }}>
                  Note: Text file must be less than 10KB
                </Notification>
              )}
              {uploadSuccess && (
                <Notification variant={{ validation: 'success' }}>
                  {savedFileName} added to table successfully!
                </Notification>
              )}
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </>
  );
};

export default FileUpload
{% endraw %}
