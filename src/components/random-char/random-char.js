import React, { useState, useEffect } from 'react';

import useMarvelService from '../../services/marvel-services';
import { setContentWithoutWaiting } from '../../utils/content-setters.utils';

import './random-char.scss';
import mjolnir from '../../assets/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { process, setProcess, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 20000);

        return () => clearInterval(timerId);
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onTryClick = (e) => {
        e.preventDefault();
        updateChar();
    }

    return (
        <div className="randomchar">

            {setContentWithoutWaiting(process, View, char)}

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
                    onClick={onTryClick}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div >
    )
}

const View = ({ data: { name, description, thumbnail, homepage, wiki } }) => {

    let imgNotAvaStyle = {};
    let _description = (description || 'No Description.');
    if (_description.length > 100) _description = _description.slice(0, 100) + '...';
    if (thumbnail === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`) imgNotAvaStyle = { objectFit: 'unset' };

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