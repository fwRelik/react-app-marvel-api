import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import useMarvelService from '../../../services/marvel-services';

import ErrorMessage from '../../error-message';
import Spinner from '../../spinner';

import './single-character-page.scss';

const SingleCharacterPage = () => {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const { loading, error, clearError, getCharacter } = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [characterId])

    const updateCharacter = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded);
    }

    const onCharacterLoaded = (id) => {
        setCharacter(id);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character) ? <View character={character} /> : null;

    return (
        <div className="single-character">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ character: { name, description, thumbnail } }) => {
    return (
        <>
            <img src={thumbnail} alt={name} className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description ? description : 'This character has no description.'}</p>
            </div>
            <Link to="/" className="single-character__back">Back to main</Link>
        </>
    )
}

export default SingleCharacterPage;