'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';
import './search.css';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, [initialQuery]);

    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(
                `http://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=movie&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
            );
            const data = await res.json();
            if (data.Response === 'True') {
                setResults(data.Search);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error('Search failed:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            performSearch(query.trim());
        }
    };

    return (
        <div className="searchPage">
            <div className="searchHeader">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="searchFormInput"
                        placeholder="Search for movies, TV shows, actors..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="searchFormBtn">
                        Search
                    </button>
                </form>
                {searched && !loading && (
                    <p className="searchResultsTitle">
                        {results.length > 0
                            ? <>Showing results for <strong>&ldquo;{initialQuery || query}&rdquo;</strong></>
                            : <>No results found for <strong>&ldquo;{initialQuery || query}&rdquo;</strong></>
                        }
                    </p>
                )}
            </div>

            {loading ? (
                <div className="searchGrid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="skeleton" style={{ width: '100%', aspectRatio: '2/3' }} />
                    ))}
                </div>
            ) : results.length > 0 ? (
                <div className="searchGrid">
                    {results.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : searched ? (
                <div className="searchEmpty">
                    <div className="searchEmptyIcon">🎬</div>
                    <p className="searchEmptyText">No movies found</p>
                    <p className="searchEmptySub">Try a different search term</p>
                </div>
            ) : (
                <div className="searchEmpty">
                    <div className="searchEmptyIcon">🔍</div>
                    <p className="searchEmptyText">Search for your favorite movies</p>
                    <p className="searchEmptySub">Enter a title, actor, or keyword above</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={
                <div className="searchPage">
                    <div className="searchGrid">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton" style={{ width: '100%', aspectRatio: '2/3' }} />
                        ))}
                    </div>
                </div>
            }>
                <SearchContent />
            </Suspense>
            <Footer />
        </>
    );
}
