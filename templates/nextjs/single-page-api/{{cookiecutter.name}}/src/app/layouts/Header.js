{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Header component for the application
===========================================================================
*/
'use strict';
import styles from './styles.module.css';
import {
  Box,
  Typography,
  Image,
  Icon,
  Spacer
} from '@telus-uds/components-web'
import User from '@telus-uds/palette-allium/build/web/icons/User'

const Header = () => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeader__logo}>
          <Box space={2}>
            <Image src={'/telus-logo.svg'} alt="TELUS Logo" width={148} height={48} />
          </Box>
        </div>
        <div className={styles.pageHeader__profile}>
          <Box space={2}>
            <Typography>
              {`Welcome User!`}
            </Typography>
          </Box>
          <Icon icon={User} variant={{ size: 'large' }} />
        </div>
      </div>
      <Typography block variant={{ size: 'display1' }} heading='h1' align='center'>
        <span>Sample Single-page Application</span>
        <br />
        <span>with API Routes</span>
      </Typography>
      <Spacer space={{ xs: 3, md: 3, xl: 5 }} />
    </div >
  )
}

export default Header
{% endraw %}