import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await pool.query(
            'SELECT userid, username, email, phonenumber FROM users ORDER BY userid'
        );
        return NextResponse.json({
            count: result.rows.length,
            users: result.rows
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
