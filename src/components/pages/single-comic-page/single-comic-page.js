import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import useMarvelService from '../../../services/marvel-services';

import ErrorMessage from '../../error-message';
import Spinner from '../../spinner';

import './single-comic-page.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, clearError, getComic } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (id) => {
        setComic(id);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ comic: { title, description, pageCount, thumbnail, language, prices } }) => {
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;