import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

const LazyLayout = lazy(() => import('./components/Layout/Layout'));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage'));
const LazyGenrePage = lazy(() => import('./pages/GenrePage/GenrePage'));
const LazyMoviePage = lazy(() => import('./pages/MoviePage/MoviePage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<LazyLayout />}>
            <Route index element={<LazyHomePage />} />
            <Route path="genres" element={<LazyGenresPage />} />
            <Route path="genre/:genreName" element={<LazyGenrePage />} />
            <Route path="movie/:movieId" element={<LazyMoviePage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
