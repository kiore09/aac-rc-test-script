import { format, transports } from "winston";

interface Config {
  port: number;
  host: string;
  cors: {
      origin: string;
  };
  logging: {
      format: any; // Type of format.combine(...)
      transports: any[]; // Type of new transports.Console()
  };
    projectId: string;
    secretName: string;
  }

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
      origin: process.env.CORS_ORIGIN || '*'
  },
  logging: {
      format: format.combine(
          format.timestamp({ format: new Date().toISOString() }),
          format.json()
      ),
      transports: [
          new transports.Console()
      ]
  },
  projectId: process.env.PROJECT_ID || '',
  secretName: process.env.SECRET_NAME || ''
};

export default config;
