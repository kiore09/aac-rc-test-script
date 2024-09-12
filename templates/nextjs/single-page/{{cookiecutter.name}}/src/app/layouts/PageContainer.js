/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: PageContainer component with header and footer for the application
===========================================================================
*/

'use client'
import styles from './styles.module.css';
import Header from './Header'
import Footer from './Footer'

const PageContainer = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.pageMain}>
        <div className={styles.pageContainer}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default PageContainer
