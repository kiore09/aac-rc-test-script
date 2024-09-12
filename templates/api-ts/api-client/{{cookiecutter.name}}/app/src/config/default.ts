import { format, transports } from "winston";

interface Config {
  port: string | number;
  host: string;
  cors: {
    origin: string;
  };
  logging: {
    format: ReturnType<typeof format.combine>;
    transports: Array<typeof transports.Console>;
  };
  projectId: string;
  clientID: string;
  clientSECRET: string;
  apigwTokenURL: string;
  apiEndpointURL: string;
  apigwTokenScope: string;
  fromDomain: string;
}

const config: Config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  logging: {
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json()
    ),
    transports: [
      new transports.Console()
    ]
  },
  projectId: process.env.PROJECT_ID || '',
  clientID: process.env.CLIENT_ID || '',
  clientSECRET: process.env.CLIENT_SECRET || '',
  apigwTokenURL: process.env.APIGW_TOKEN_URL || '',
  apiEndpointURL: process.env.API_ENDPOINT_URL || '',
  apigwTokenScope: process.env.APIGW_TOKEN_SCOPE || '',
  fromDomain: '@dev.gapps.telus.com'
};

export default config;
