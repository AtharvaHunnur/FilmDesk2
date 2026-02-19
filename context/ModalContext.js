'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = useCallback(async (imdbId) => {
        setSelectedMovieId(imdbId);
        setIsLoading(true);
        try {
            const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`);
            const data = await res.json();
            if (data.Response === 'True') {
                setMovieDetails(data);
            }
        } catch (err) {
            console.error('Failed to fetch movie details:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const closeModal = useCallback(() => {
        setSelectedMovieId(null);
        setMovieDetails(null);
    }, []);

    return (
        <ModalContext.Provider value={{ selectedMovieId, movieDetails, isLoading, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within ModalProvider');
    return context;
}
