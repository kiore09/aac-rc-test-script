/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 01-23-2024
Description: Wrap UDS component in BaseProvider to apply Allium theme to your application
===========================================================================
*/
import PageContainer from './layouts/PageContainer'
import { Provider } from '@/app/registry'
import DataProvider from '../components/DataProvider'

// Proper metadata helps search engine effectively index webpage
export const metadata = {
  title: 'Multi-page Application',
  description: 'Sample Multi-page Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <PageContainer>
            <main>
              <DataProvider>
              {children}
              </DataProvider>
            </main>
          </PageContainer>
        </Provider>
      </body>
    </html>
  )
}
