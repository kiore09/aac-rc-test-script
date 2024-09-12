{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-04-2024
Description: Main page component with main page content, RandomImage,
Fileupload, and FileTable components
===========================================================================
*/
'use client'
import { useState, useEffect } from 'react'
import { List, StackView, Typography, Link, StepTracker, Button, FlexGrid } from '@telus-uds/components-web'

import FileUpload from '@/components/FileUpload'
import FileTable from '@/components/FileTable'
import RandomImage from '@/components/RandomImage'

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [currentStep, setStep] = useState(0)

  // Update the tableData and dataCount states when a file is uploaded
  const handleFileUpload = (updatedTableData) => {
    setTableData(updatedTableData);
    setDataCount(updatedTableData.length);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTableData(data);
        setDataCount(data.length);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <StackView space={{ xs: 3, xl: 5 }}>
      <StepTracker current={currentStep} steps={['Introduction', 'Table Sample']} />
      { currentStep === 0 ? (
          <>
            <Typography>
              This is a sample NextJS single-page application generated from Arch-as-Code starter-kit templates and uses
              components from the TELUS Universal Design System (UDS). This sample includes features listed below. Additional features and examples
              may be also found in the <Link href='https://www.telus.com/universal-design-system/components/allium' target="_blank">TELUS UDS Documentation.</Link>
            </Typography>
            <List>
              <List.Item>Random image from API</List.Item>
              <List.Item>File upload implementation</List.Item>
              <List.Item>Table with File data fetched from a public API</List.Item>
              <List.Item>Sample records and pagination, using static sample data</List.Item>
            </List>
            <RandomImage />
          </>
        ) : (
          <>
            <FileUpload tableData={tableData} dataCount={dataCount} onFileUpload={handleFileUpload} />
            <FileTable tableData={tableData} dataCount={dataCount} />
          </>
        )
      }
      <FlexGrid outsideGutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col xs={6} horizontalAlign="left">
            <Button onPress={() => setStep(currentStep - 1)} inactive={currentStep === 0}>
              Previous
            </Button>
          </FlexGrid.Col>
          <FlexGrid.Col xs={6}  horizontalAlign="right">
            <Button onPress={() => setStep(currentStep + 1)} inactive={currentStep === 1}>
              Next
            </Button>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </StackView>
  )
}
{% endraw %}
