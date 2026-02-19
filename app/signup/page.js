'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../auth.css';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phonenumber: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!form.username || !form.email || !form.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    email: form.email,
                    phonenumber: form.phonenumber,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                return;
            }

            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="authPage">
            <div className="authBg" />
            <div className="authOverlay" />
            <div className="authCard">
                <div className="authLogo">
                    <a href="/">FILMDESK</a>
                </div>
                <h1 className="authTitle">Create Account</h1>
                <p className="authSubtitle">Join FilmDesk and start streaming</p>

                <form className="authForm" onSubmit={handleSubmit}>
                    {error && <div className="authError">{error}</div>}
                    {success && <div className="authSuccess">{success}</div>}

                    <div className="inputGroup">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <span className="inputIcon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                        <span className="inputIcon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M22 7l-10 6L2 7" />
                            </svg>
                        </span>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="phonenumber">Phone Number (optional)</label>
                        <input
                            id="phonenumber"
                            type="tel"
                            name="phonenumber"
                            placeholder="+1 234 567 8900"
                            value={form.phonenumber}
                            onChange={handleChange}
                        />
                        <span className="inputIcon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </span>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Min. 6 characters"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="passwordToggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="authSubmit" disabled={loading}>
                        {loading ? <><span className="btnSpinner" /> Creating Account...</> : 'Sign Up'}
                    </button>
                </form>

                <div className="authDivider">or</div>

                <p className="authFooter">
                    Already have an account? <a href="/login">Sign In</a>
                </p>

                <div className="authFeatures">
                    <span className="authFeature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Free Trial
                    </span>
                    <span className="authFeature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        No Ads
                    </span>
                    <span className="authFeature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        HD Streaming
                    </span>
                </div>
            </div>
        </div>
    );
}
