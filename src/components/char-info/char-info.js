import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { setContentCharInfo } from '../../utils/content-setters.utils';

import useMarvelService from '../../services/marvel-services';

import './char-info.scss';

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const { process, setProcess, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [charId]);

    const updateChar = () => {
        if (!charId) return;

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContentCharInfo(process, View, char)}
        </div>
    )
}

const View = ({ data: { name, description, thumbnail, homepage, wiki, comics } }) => {

    const items = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                <Link to={`comics/${item.resourceURI.match(/\d*$/g)[0]}`} style={{ width: '100%', height: '100%' }}>
                    {item.name}
                </Link>
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