import dotenv from "dotenv";

dotenv.config();

export const SKINPORT_API_URL = process.env.SKINPORT_API_URL || "https://api.skinport.com/v1/items";
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const FASTIFY_SECRET = process.env.FASTIFY_SECRET || "supersupersupersupersupersupersupersupersupersupersecretkey";