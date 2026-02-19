'use client';

import { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

export default function MovieRow({ title, movies }) {
    const sliderRef = useRef(null);

    if (!movies || movies.length === 0) return null;

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth * 0.75;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="movieRowSection">
            <h2 className="movieRowTitle">{title}</h2>
            <div className="movieRowContainer">
                <button
                    className="sliderArrow left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <div className="movieRowSlider" ref={sliderRef}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
                <button
                    className="sliderArrow right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
