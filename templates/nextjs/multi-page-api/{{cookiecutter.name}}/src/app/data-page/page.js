{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-15-2024
Description: Data page with FileUpload and FileTable Component
===========================================================================
*/

'use client'
import { StackView, Typography } from '@telus-uds/components-web'
import FileUpload from '../../components/FileUpload'
import FileTable from '../../components/FileTable'

export default function DataPage() {

  return (
    <StackView space={{ xs: 3, xl: 5 }}>
      <Typography>
        This is a sample Data Page with the file upload and file download implementation. Below is a table displaying data fetch from a public API, the file you add to the table will be appended and displayed in the table. As the file data will be stored in session storage it will be cleared when session ends or browser tab is closed.
      </Typography>
      <FileUpload />
      <FileTable />
    </StackView>
  )
}
{% endraw %}
