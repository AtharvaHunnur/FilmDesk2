'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [searchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}>
            <div className="navLeft">
                <a href="/" className="logo">FILMDESK</a>
                <ul className={`navLinks ${mobileOpen ? 'mobileOpen' : ''}`}>
                    <li><a href="/" className="active">Home</a></li>
                    <li><a href="#">TV Shows</a></li>
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">New & Popular</a></li>
                    <li><a href="#">My List</a></li>
                </ul>
            </div>
            <div className="navRight">
                <div className="searchContainer">
                    <form onSubmit={handleSearch}>
                        <input
                            ref={searchRef}
                            type="text"
                            className={`searchInput ${searchOpen ? 'open' : ''}`}
                            placeholder="Titles, people, genres"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => {
                                if (!searchQuery) setSearchOpen(false);
                            }}
                        />
                    </form>
                    <button
                        className="searchBtn"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Search"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>
                {user && (
                    <div className="userMenu">
                        <span className="userAvatar">{user.username.charAt(0).toUpperCase()}</span>
                        <button className="logoutBtn" onClick={handleLogout} aria-label="Logout">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>
                )}
                <button
                    className="mobileMenuBtn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
}
