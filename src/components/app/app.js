import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

import ScrollNavigation from '../scroll-navigation';
import AppHeader from '../app-header';
import Spinner from '../spinner';

const i = (page) => lazy(() => import(`../pages/${page}/${page}.js`));

const MainPage = i('main-page');
const ComicsPage = i('comics-page');
const SinglePages = i('single-pages');
const SingleComicPage = i('single-comic-page');
const SingleCharacterPage = i('single-character-page');
const Page404 = i('404');

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

                            <Route path="comics/:itemId" element={
                                <SinglePages Component={SingleComicPage} dataType='comic' />
                            } />
                            <Route path="characters/:itemId" element={
                                <SinglePages Component={SingleCharacterPage} dataType='character' />
                            } />
                            
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