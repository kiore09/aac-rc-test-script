import { format, transports } from "winston";

export interface Config {
    port: string | number;
    host: string;
    cors: {
        origin: string;
    };
    logging: {
        format: ReturnType<typeof format.combine>;
        transports: Array<typeof transports.Console>;
    };
    redisHost?: string;
    redisPort?: string;
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
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
};

export default config;
