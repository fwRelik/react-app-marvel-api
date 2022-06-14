import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

import ScrollNavigation from '../scroll-navigation';
import AppHeader from "../app-header";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="comics" element={<ComicsPage />} />
                        <Route path="comics/:comicId" element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    <ScrollNavigation />
                </main>
            </div>
        </Router>
    )
}

export default App;