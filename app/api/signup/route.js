import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password, email, phonenumber } = await request.json();

        // Validate required fields
        if (!username || !password || !email) {
            return NextResponse.json(
                { error: 'Username, password, and email are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if username or email already exists
        const existing = await pool.query(
            'SELECT userid FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existing.rows.length > 0) {
            return NextResponse.json(
                { error: 'Username or email already exists' },
                { status: 409 }
            );
        }

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user
        const result = await pool.query(
            'INSERT INTO users (username, password, email, phonenumber) VALUES ($1, $2, $3, $4) RETURNING userid, username, email',
            [username, hashedPassword, email, phonenumber || null]
        );

        return NextResponse.json(
            { message: 'Registration successful', user: result.rows[0] },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
