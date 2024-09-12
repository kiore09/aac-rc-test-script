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
    // format: ReturnType<typeof format.combine>;
    // transports: typeof transports.Console[];
  };
  projectId: string;
  dbUser: string;
  dbKeyName: string;
  database: string;
  dbHost: string;
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
  dbUser: process.env.SECRET_DB_USER || '',
  dbKeyName: process.env.SECRET_DB_NAME || '',
  database: process.env.DATABASE || '',
  dbHost: process.env.DB_HOST || '',
};

export default config;
