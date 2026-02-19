import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

let ssl = undefined;
const caPath = path.join(process.cwd(), 'certs', 'ca.pem');
if (fs.existsSync(caPath)) {
    ssl = {
        rejectUnauthorized: true,
        ca: fs.readFileSync(caPath).toString(),
    };
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '16130'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl,
    max: 20,
});

export default pool;
