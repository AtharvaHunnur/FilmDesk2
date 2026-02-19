const API_KEY = process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
    const res = await fetch(
        `${BASE_URL}?s=${encodeURIComponent(query)}&type=movie&page=${page}&apikey=${API_KEY}`,
        { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (data.Response === 'True') {
        return { movies: data.Search, totalResults: parseInt(data.totalResults) };
    }
    return { movies: [], totalResults: 0 };
}

export async function getMovieDetails(imdbId) {
    const res = await fetch(
        `${BASE_URL}?i=${imdbId}&plot=full&apikey=${API_KEY}`,
        { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (data.Response === 'True') {
        return data;
    }
    return null;
}

export async function getMoviesByCategory(keyword) {
    const { movies } = await searchMovies(keyword);
    return movies || [];
}
