{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Text validator component for special characters
===========================================================================
*/
'use client'
import { useState } from 'react'
import { Button, FlexGrid, TextInput, Box } from '@telus-uds/components-web'
import logger from '../utils/sample.logger'

/**
 * TextValidator validates text for special characters.
 * @param {string} textInputValue - The text to be validated.
 */

function TextValidator() {
  const [textInputValue, setTextInputValue] = useState('');
  const [validateStatus, setValidateStatus] = useState(null);
  const [inputFeedback, setInputFeedback] = useState(null);

  // Validate text input for special characters
  const validateTextInput = () => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (textInputValue === '') {
      setInputFeedback('Please enter text to validate');
      logger.warn('Validation failed: No text entered');
    } else if (specialChars.test(textInputValue)) {
      setInputFeedback('Input contains special characters');
      setValidateStatus('error');
      logger.info('Validation result: Input contains special characters');
    } else {
      setInputFeedback('Input does not contain special characters');
      setValidateStatus('success');
      logger.info('Validation result: Input does not contain special characters');
    }
    setTextInputValue('');
  };

  // Handle text input change
  const handleTextInputChange = (value) => {
    if (value) {
      setTextInputValue(value);
      setInputFeedback('');
      setValidateStatus(null);
      logger.info('Text input value changed: ', value);
    } else {
      logger.error('Value is undefined');
    }
  };

  return (
    <Box vertical={4}>
      <FlexGrid outsideGutter={false}>
        <FlexGrid.Row verticalAlign="bottom">
          <FlexGrid.Col lg={6}>
            <TextInput
              label="Special character validator"
              id="validate-input"
              maxLength={250}
              feedback={inputFeedback}
              validation={validateStatus}
              onChange={handleTextInputChange}
            />
          </FlexGrid.Col>
          <FlexGrid.Col lg={6}>
            <Button variant={{ priority: 'high' }} type="submit" onClick={validateTextInput}>
              Validate
            </Button>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </Box>
  )
}

export default TextValidator
{% endraw %}