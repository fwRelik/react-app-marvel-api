import { useState, useEffect } from 'react';

import useMarvelService from '../../services/marvel-services';

import ErrorMessage from '../error-message';
import Spinner from '../sipnner';

import './comics-list.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset)
            .then(onItemsLoaded)
    }

    const onItemsLoaded = (newItems) => {
        let ended = newItems.length < 8 ? true : false;

        setComicsList(comicsList => [...comicsList, ...newItems]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setComicsEnded(ended);
    }

    const renderItems = () => {
        const items = comicsList.map(({ title, prices, thumbnail }, i) => {
            let imgNotAvaStyle = {};

            if (thumbnail === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`) imgNotAvaStyle.objectFit = 'fill';

            return (
                <li
                    key={i}
                    className="comics__item">
                    <a href="#">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="comics__item-img"
                            style={imgNotAvaStyle} />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{prices}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems();

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">

            {errorMessage}
            {spinner}
            {items}

            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;