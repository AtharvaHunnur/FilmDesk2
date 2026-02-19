'use client';

import { useModal } from '@/context/ModalContext';
import './Hero.css';

export default function Hero({ movie }) {
    const { openModal } = useModal();

    if (!movie) return null;

    const posterUrl = movie.Poster && movie.Poster !== 'N/A'
        ? movie.Poster.replace('SX300', 'SX1200')
        : null;

    return (
        <section className="hero">
            <div className="heroBg">
                {posterUrl && (
                    <img src={posterUrl} alt={movie.Title} />
                )}
                <div className="heroGradientBottom" />
                <div className="heroGradientLeft" />
            </div>
            <div className="heroContent">
                <div className="heroTag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 8l7 4-7 4V8z" />
                    </svg>
                    Featured Film
                </div>
                <h1 className="heroTitle">{movie.Title}</h1>
                <div className="heroMeta">
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                        <span className="heroRating">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {movie.imdbRating}
                        </span>
                    )}
                    {movie.Year && (
                        <>
                            <span className="heroDot" />
                            <span>{movie.Year}</span>
                        </>
                    )}
                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                        <>
                            <span className="heroDot" />
                            <span>{movie.Runtime}</span>
                        </>
                    )}
                    {movie.Rated && movie.Rated !== 'N/A' && (
                        <>
                            <span className="heroDot" />
                            <span>{movie.Rated}</span>
                        </>
                    )}
                </div>
                {movie.Genre && (
                    <div className="heroMeta">
                        <span className="heroGenre">{movie.Genre}</span>
                    </div>
                )}
                {movie.Plot && movie.Plot !== 'N/A' && (
                    <p className="heroPlot">{movie.Plot}</p>
                )}
                <div className="heroButtons">
                    <button className="btnPlay">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play
                    </button>
                    <button className="btnInfo" onClick={() => openModal(movie.imdbID)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        More Info
                    </button>
                </div>
            </div>
        </section>
    );
}
