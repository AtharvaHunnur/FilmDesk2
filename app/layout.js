import './globals.css';
import { ModalProvider } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import MovieModal from '@/components/MovieModal';

export const metadata = {
    title: 'FilmDesk — Stream Movies & TV Shows',
    description: 'Discover and explore thousands of movies and TV shows. Your ultimate cinematic experience starts here.',
    keywords: 'movies, streaming, films, tv shows, cinema',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ModalProvider>
                        {children}
                        <MovieModal />
                    </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
