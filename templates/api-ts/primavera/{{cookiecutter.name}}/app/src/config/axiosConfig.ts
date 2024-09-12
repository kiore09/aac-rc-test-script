import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import https from 'https';

// Create an HTTPS agent with custom settings
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // NOTE: Setting this to true will require certificate validation
  // The `simple` and `resolveWithFullResponse` options are not valid for https.Agent.
});

// Axios configuration using TypeScript
const axiosConfig = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    timeout: 90000, // Timeout set to 90 seconds
    proxy: false, // Disable proxy
    maxContentLength: 104857600, // Set maximum content length to 100MB
    maxBodyLength: 104857600, // Set maximum body length to 100MB
    headers: {}, // Default headers, can be customized
    httpsAgent, // Use the custom HTTPS agent for secure connections
  };

  return axios.create(config); // Set Axios default configuration
};

export default axiosConfig;
