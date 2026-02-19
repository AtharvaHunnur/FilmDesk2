import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import AuthGuard from '@/components/AuthGuard';
import { getMovieDetails, getMoviesByCategory } from '@/lib/omdb';

// Featured movie for the hero banner
const FEATURED_MOVIE_ID = 'tt0468569'; // The Dark Knight

// Categories to display as rows
const CATEGORIES = [
    { title: 'Trending Now', keyword: 'avengers' },
    { title: 'Action Blockbusters', keyword: 'fast furious' },
    { title: 'Sci-Fi Adventures', keyword: 'star wars' },
    { title: 'Marvel Universe', keyword: 'marvel' },
    { title: 'DC Comics', keyword: 'batman' },
    { title: 'Animated Favorites', keyword: 'pixar' },
    { title: 'Epic Fantasies', keyword: 'lord rings' },
    { title: 'Thrilling Suspense', keyword: 'mission impossible' },
    { title: 'Classic Cinema', keyword: 'godfather' },
    { title: 'Comedy Hits', keyword: 'hangover' },
];

export default async function HomePage() {
    // Fetch hero movie details
    const heroMovie = await getMovieDetails(FEATURED_MOVIE_ID);

    // Fetch all categories in parallel
    const categoryData = await Promise.all(
        CATEGORIES.map(async (cat) => {
            const movies = await getMoviesByCategory(cat.keyword);
            return { title: cat.title, movies };
        })
    );

    return (
        <AuthGuard>
            <main>
                <Navbar />
                <Hero movie={heroMovie} />
                <div style={{ position: 'relative', zIndex: 5, marginTop: '-6rem' }}>
                    {categoryData.map((row, idx) => (
                        <MovieRow key={idx} title={row.title} movies={row.movies} />
                    ))}
                </div>
                <Footer />
            </main>
        </AuthGuard>
    );
}
