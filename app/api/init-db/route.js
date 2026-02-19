import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        userid SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phonenumber VARCHAR(20)
      );
    `);
        return NextResponse.json({ message: 'Users table created successfully' });
    } catch (error) {
        console.error('DB init error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
