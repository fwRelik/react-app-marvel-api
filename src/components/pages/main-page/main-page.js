import { useState } from 'react';

import RandomChar from "../../random-char";
import CharList from "../../char-list";
import CharInfo from "../../char-info";
import Search from '../../search';

import ErrorBoundary from '../../error-boundary/error-boundary';

import decoration from '../../../assets/img/vision.png';
import './main-page.scss';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <div className="char__wrapper">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <Search />
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;