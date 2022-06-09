import React, { Component } from 'react';

import MarvelService from '../../services/marvel-services';

import Spinner from "../sipnner";
import ErrorMessage from '../error-message';

import './random-char.scss';
import mjolnir from '../../assets/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount() {
        // clearInterval(this.timerId);
    }

    onLoading = () => {
        this.setState({ loading: true });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updateChar = () => {
        this.onLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onTryClick = (e) => {
        e.preventDefault();
        this.updateChar();
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">

                {errorMessage}
                {spinner}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        className="button button__main"
                        onClick={this.onTryClick}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div >
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    let imgNotAvaStyle = {};
    let _description = (description || 'No Description.');
    if (_description.length > 100) _description = _description.slice(0, 100) + '...';
    if (thumbnail.indexOf('/image_not_available.') !== -1) imgNotAvaStyle = { objectFit: 'unset' };

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgNotAvaStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{_description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;