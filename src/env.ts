import Joi from 'joi';

interface Env {
    PORT: number;
    ALLOWED_ORIGIN: string;
    CONNECTION_STRING: string;
    JWT_SECRET: string;
}

const envSchema = Joi.object({
    PORT: Joi.number().positive(),
    ALLOWED_ORIGIN: Joi.string().hostname().required(),
    CONNECTION_STRING: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
}).unknown();

const validationResult = envSchema.validate(process.env);

if (validationResult.error) {
    process.exit(1);
}

export const { PORT = 4000, ALLOWED_ORIGIN, CONNECTION_STRING, JWT_SECRET }: Env = validationResult.value;
