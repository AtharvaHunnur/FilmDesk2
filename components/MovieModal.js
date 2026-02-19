'use client';

import { useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import './MovieModal.css';

export default function MovieModal() {
    const { selectedMovieId, movieDetails, isLoading, closeModal } = useModal();

    useEffect(() => {
        if (selectedMovieId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedMovieId]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeModal]);

    if (!selectedMovieId) return null;

    const movie = movieDetails;
    const posterUrl = movie?.Poster && movie.Poster !== 'N/A'
        ? movie.Poster.replace('SX300', 'SX900')
        : null;

    return (
        <div className="modalOverlay" onClick={closeModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="modalClose" onClick={closeModal} aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {isLoading ? (
                    <div className="modalLoading">
                        <div className="spinner" />
                    </div>
                ) : movie ? (
                    <>
                        <div className="modalHero">
                            {posterUrl && <img src={posterUrl} alt={movie.Title} />}
                            <div className="modalHeroGradient" />
                            <div className="modalHeroContent">
                                <h2 className="modalTitle">{movie.Title}</h2>
                                <div className="modalHeroButtons">
                                    <button className="btnPlay">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        Play
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modalBody">
                            <div className="modalMeta">
                                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                    <span className="modalMetaItem modalRating">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        {movie.imdbRating}/10
                                    </span>
                                )}
                                {movie.Year && <span className="modalMetaItem">{movie.Year}</span>}
                                {movie.Runtime && movie.Runtime !== 'N/A' && (
                                    <span className="modalMetaItem">{movie.Runtime}</span>
                                )}
                                {movie.Rated && movie.Rated !== 'N/A' && (
                                    <span className="modalMaturity">{movie.Rated}</span>
                                )}
                            </div>

                            {movie.Plot && movie.Plot !== 'N/A' && (
                                <p className="modalPlot">{movie.Plot}</p>
                            )}

                            <div className="modalDetails">
                                {movie.Genre && movie.Genre !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Genre</span>
                                        <span className="modalDetailValue">{movie.Genre}</span>
                                    </>
                                )}
                                {movie.Director && movie.Director !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Director</span>
                                        <span className="modalDetailValue">{movie.Director}</span>
                                    </>
                                )}
                                {movie.Actors && movie.Actors !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Cast</span>
                                        <span className="modalDetailValue">{movie.Actors}</span>
                                    </>
                                )}
                                {movie.Language && movie.Language !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Language</span>
                                        <span className="modalDetailValue">{movie.Language}</span>
                                    </>
                                )}
                                {movie.Awards && movie.Awards !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Awards</span>
                                        <span className="modalDetailValue">{movie.Awards}</span>
                                    </>
                                )}
                                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                    <>
                                        <span className="modalDetailLabel">Box Office</span>
                                        <span className="modalDetailValue">{movie.BoxOffice}</span>
                                    </>
                                )}
                            </div>

                            {movie.Ratings && movie.Ratings.length > 0 && (
                                <div className="modalRatings">
                                    {movie.Ratings.map((r, i) => (
                                        <div key={i} className="ratingBadge">
                                            <span className="ratingBadgeValue">{r.Value}</span>
                                            <span className="ratingBadgeSource">{r.Source}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
