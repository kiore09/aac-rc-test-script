import { format, transports } from "winston";

interface Config {
  port: number;
  host: string;
  cors: {
    origin: string;
  };
  logging: {
    format: any; // Assuming the type of format.combine(...)
    transports: any[]; // Assuming the type of new transports.Console()
  };
  projectId: string;
  firestoreCollection: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
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
  firestoreCollection: process.env.FIRESTORE_COLLECTION || ''
};

export default config;
