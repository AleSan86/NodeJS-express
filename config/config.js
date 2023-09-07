import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
//dotenv.config();

program.option('--mode <mode>', 'Work mode', 'DEVELOPMENT');
program.parse();

dotenv.config({
    path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production'
})

export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    adminName:process.env.ADMIN_NAME,
    adminPassword:process.env.ADMIN_PASSWORD,
    persistence: process.env.PERSISTENCE
}