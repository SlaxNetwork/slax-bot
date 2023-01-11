import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { SlaxClient } from './client/slaxClient';

config();

export const client = new SlaxClient({
	listenersDir: `${__dirname}/listeners/**/*.{js,ts}`,
	commandsDir: `${__dirname}/commands/**/*.{js,ts}`,
});

export const prisma = new PrismaClient();

async function start() {
	await client.start(process.env.DISCORD_BOT_TOKEN as string);
}

start();