import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/marvel-services';

import ErrorMessage from '../error-message';
import Spinner from '../sipnner';
import Skeleton from '../skeleton';

import './char-info.scss';

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId])

    const updateChar = () => {
        if (!charId) return;

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

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

const View = ({ char: { name, description, thumbnail, homepage, wiki, comics } }) => {

    const items = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    }).slice(0, 10);

    let imgNotAvaStyle,
        title = 'Comics:';
    if (thumbnail === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`) imgNotAvaStyle = { objectFit: 'unset' };
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