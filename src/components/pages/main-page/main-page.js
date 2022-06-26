import { useState } from 'react';
import { main_page } from '../../../config/pages.config';

import RandomChar from "../../random-char";
import CharList from "../../char-list";
import CharInfo from "../../char-info";
import Search from '../../search';

import ErrorBoundary from '../../error-boundary/error-boundary';

import decoration from '../../../assets/img/vision.png';
import './main-page.scss';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);
    const helmet = main_page();

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            {helmet}
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Search />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;