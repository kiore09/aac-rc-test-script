{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Footer component for the application
===========================================================================
*/
'use strict';
import styles from './styles.module.css';
import {
  FlexGrid,
  Box,
  Typography,
  Link
} from '@telus-uds/components-web'

const Footer = () => {
  const today = new Date();
  return (
    <div className={styles.footerBackground}>
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={4} xsOffset={4} horizontalAlign="center">
            <Box vertical={3}>
              <Typography variant={{ size: 'micro', colour: 'light' }}>
                &copy; {today.getFullYear()} TELUS
              </Typography>
            </Box>
          </FlexGrid.Col>
          <FlexGrid.Col xs={4} horizontalAlign="right">
            <Box vertical={3}>
              <Typography variant={{ size: 'h5', colour: 'light' }}>
                {`Brought to you by `}
                <Link
                  href="#"
                  variant={{ size: "small" }}
                  target="_blank"
                >
                  #team-name
                </Link>
              </Typography>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </div>
  )
}

export default Footer
{% endraw %}