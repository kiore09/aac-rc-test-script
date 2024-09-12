{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-02-2024
Description: RandomImage component fetches a random image from an sample API
===========================================================================
*/
'use client'
import { useState } from 'react'
import { Button, FlexGrid, Box, Image, Spinner } from '@telus-uds/components-web'
import logger from '../utils/sample.logger'

function RandomImage() {
  const [randomImage, setRandomImage] = useState('/default-image.jpg');

  const fetchRandomImage = async () => {
    setRandomImage(null);
    try {
      const response = await fetch('/api/random-image');
      console.log('response ', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setRandomImage(response.url);
    }
    catch (error) {
      logger.error('Error fetching random image', error);
    }
  }

  return (
    <Box vertical={4}>
      <FlexGrid outsideGutter={false}>
        <FlexGrid.Row verticalAlign="bottom">
          <FlexGrid.Col lg={4}>
              <Button variant={{ priority: 'high' }} type="submit" onClick={fetchRandomImage}>
                Fetch Image from API
              </Button>
            </FlexGrid.Col>
          { randomImage ? ( 
            <FlexGrid.Col lg={4}>
              <Image src={randomImage} alt="Random critter" width={300} height={300} />
            </FlexGrid.Col>
            ) : (
            <FlexGrid.Col lg={4}>
              <Box space={12} >
                <Spinner variant={{ size: 'small' }} label="small" show={true} />
              </Box>
            </FlexGrid.Col> )
          }
        </FlexGrid.Row>
      </FlexGrid>
    </Box>
  )
}

export default RandomImage
{% endraw %}
