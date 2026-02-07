import dotenv from 'dotenv';
dotenv.config();

interface IEnvVariables {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_URL: string;
    CLIENT_SITE_URL: string;
    BCRYPT_SALT_ROUNDS: string;
    CLOUDINARY: {
        CLOUD_NAME: string;
        API_KEY: string;
        API_SECRET: string;
        SECRET: string;
    },
    JWT: {
        ACCESS_TOKEN_SECRET: string,
        ACCESS_TOKEN_EXPIRED: string,
        REFRESH_TOKEN_SECRET: string,
        REFRESH_TOKEN_EXPIRED: string,
    },
    DEFAULT_ADMIN: {
        NAME: string;
        EMAIL: string;
        PASSWORD: string;
    },
    RATE_LIMITER: {
        RATE_LIMITER_WINDOW_MS: string,
        RATE_LIMITER_AUTH_MAX_REQUEST: string,
        RATE_LIMITER_API_MAX_REQUEST: string,
    }
};

// Load and validate environment variables
const loadEnvVariables = (): IEnvVariables => {

    const requiredEnvVars = [
        'PORT', 'NODE_ENV', 'DB_URL',
        "CLIENT_SITE_URL",
        "BCRYPT_SALT_ROUNDS",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
        "CLOUDINARY_SECRET",
        "JWT_ACCESS_TOKEN_SECRET",
        "JWT_ACCESS_TOKEN_EXPIRED",
        "JWT_REFRESH_TOKEN_SECRET",
        "JWT_REFRESH_TOKEN_EXPIRED",
        "DEFAULT_ADMIN_NAME",
        "DEFAULT_ADMIN_EMAIL",
        "DEFAULT_ADMIN_PASSWORD",
        "RATE_LIMITER_WINDOW_MS",
        "RATE_LIMITER_AUTH_MAX_REQUEST",
        "RATE_LIMITER_API_MAX_REQUEST"
    ];

    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is not set. Please define it in the .env file.`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
        DB_URL: process.env.DB_URL as string,
        CLIENT_SITE_URL: process.env.CLIENT_SITE_URL as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
        CLOUDINARY: {
            CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            API_KEY: process.env.CLOUDINARY_API_KEY as string,
            API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
            SECRET: process.env.CLOUDINARY_SECRET as string,
        },
        JWT: {
            ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
            ACCESS_TOKEN_EXPIRED: process.env.JWT_ACCESS_TOKEN_EXPIRED as string,
            REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
            REFRESH_TOKEN_EXPIRED: process.env.JWT_REFRESH_TOKEN_EXPIRED as string,
        },
        DEFAULT_ADMIN: {
            NAME: process.env.DEFAULT_ADMIN_NAME as string,
            EMAIL: process.env.DEFAULT_ADMIN_EMAIL as string,
            PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD as string,
        },
        RATE_LIMITER: {
            RATE_LIMITER_WINDOW_MS: process.env.RATE_LIMITER_WINDOW_MS as string,
            RATE_LIMITER_AUTH_MAX_REQUEST: process.env.RATE_LIMITER_AUTH_MAX_REQUEST as string,
            RATE_LIMITER_API_MAX_REQUEST: process.env.RATE_LIMITER_API_MAX_REQUEST as string,
        }
    };
};

export const envVars = loadEnvVariables();