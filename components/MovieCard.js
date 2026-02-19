'use client';

import { useModal } from '@/context/ModalContext';
import './MovieCard.css';

export default function MovieCard({ movie }) {
    const { openModal } = useModal();

    if (!movie) return null;

    const hasPoster = movie.Poster && movie.Poster !== 'N/A';

    return (
        <div className="movieCard" onClick={() => openModal(movie.imdbID)}>
            {hasPoster ? (
                <img src={movie.Poster} alt={movie.Title} loading="lazy" />
            ) : (
                <div className="movieCardPlaceholder">
                    <span>{movie.Title}</span>
                </div>
            )}
            <div className="movieCardOverlay">
                <div className="movieCardTitle">{movie.Title}</div>
                <div className="movieCardYear">{movie.Year}</div>
                <div className="movieCardActions">
                    <button className="movieCardAction playBtn" aria-label="Play">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                    <button className="movieCardAction" aria-label="Add to list" onClick={(e) => { e.stopPropagation(); }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button className="movieCardAction" aria-label="More info" onClick={(e) => { e.stopPropagation(); openModal(movie.imdbID); }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
