import { Component } from 'react';

import AppHeader from "../app-header";
import RandomChar from "../random-char";
import CharList from "../char-list";
import CharInfo from "../char-info";

import decoration from '../../assets/img/vision.png';
import ErrorBoundary from '../error-boundary/error-boundary';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({ selectedChar: id })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;