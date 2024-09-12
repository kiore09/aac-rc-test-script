import { AxiosRequestConfig } from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // NOTE: Settings this to true will require Certificate validation
});

const axiosReqConfig: AxiosRequestConfig = {
  timeout: 90000,
    proxy: false,
    maxContentLength: 104857600,
    maxBodyLength: 104857600,
    httpsAgent
}

export { axiosReqConfig };
