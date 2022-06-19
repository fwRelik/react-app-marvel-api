import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

import ScrollNavigation from '../scroll-navigation';
import AppHeader from '../app-header';
import Spinner from '../spinner';

const i = (page) => lazy(() => import(`../pages/${page}/${page}.js`));

const MainPage = i('main-page');
const ComicsPage = i('comics-page');
const Page404 = i('404');
const SingleComicPage = i('single-comic-page');

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="comics" element={<ComicsPage />} />
                            <Route path="comics/:comicId" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                        <ScrollNavigation />
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;