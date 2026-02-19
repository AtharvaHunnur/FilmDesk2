import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerSocial">
                    <a href="#" aria-label="Facebook">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="YouTube">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.35z" />
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#141414" />
                        </svg>
                    </a>
                </div>
                <div className="footerLinks">
                    <a href="#">Audio Description</a>
                    <a href="#">Help Centre</a>
                    <a href="#">Gift Cards</a>
                    <a href="#">Media Centre</a>
                    <a href="#">Investor Relations</a>
                    <a href="#">Jobs</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Privacy</a>
                    <a href="#">Legal Notices</a>
                    <a href="#">Cookie Preferences</a>
                    <a href="#">Corporate Information</a>
                    <a href="#">Contact Us</a>
                </div>
                <div className="footerBottom">
                    <span className="footerCopy">&copy; 2026 FilmDesk. All rights reserved.</span>
                    <span className="footerBrand">FILMDESK</span>
                </div>
            </div>
        </footer>
    );
}
