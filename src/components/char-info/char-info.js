import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/marvel-services';


import ErrorMessage from '../error-message';
import Spinner from '../sipnner';
import Skeleton from '../skeleton';

import './char-info.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) return;

        this.onLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onLoading = () => {
        this.setState({ loading: true });
    }


    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const items = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    }).slice(0, 10);

    let imgNotAvaStyle,
        title = 'Comics:';
    if (thumbnail.indexOf('/image_not_available.') !== -1) imgNotAvaStyle = { objectFit: 'unset' };
    if (!items.length) title = 'There is no comics with this character.';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgNotAvaStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">{title}</div>
            <ul className="char__comics-list">
                {items}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;