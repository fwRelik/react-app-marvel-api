import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useScroll } from '../../hooks/scroll.hook';
import { useSessionStorage } from '../../hooks/sessionStorage.hook';
import { useConfigSetter } from '../../hooks/configSetter.hook';

import useMarvelService from '../../services/marvel-services';

import ErrorMessage from '../error-message';
import Spinner from '../spinner';

import './comics-list.scss';

const ComicsList = () => {
    const { loading, error, getAllComics } = useMarvelService();
    const { scrollEnd, setScrollEnd } = useScroll();
    const { setConfigPage, getConfigPage } = useConfigSetter();

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        const { itemInfo = [], itemOffset } = getConfigPage();

        if (!itemInfo.length) {
            onRequest(offset, true);
        } else {
            setComicsList(itemInfo);
            setOffset(itemOffset + 8);
        }
    }, [])

    useEffect(() => {
        if (scrollEnd) onRequest(offset);
    }, [scrollEnd])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset)
            .then(onItemsLoaded)
    }

    const onItemsLoaded = (newItems) => {
        let ended = newItems.length < 8 ? true : false;

        setComicsList(comicsList => [...comicsList, ...newItems]);
        setOffset(offset => offset + 8);
        setNewItemsLoading(false);
        setComicsEnded(ended);

        setConfigPage({
            items: [...comicsList, ...newItems],
            offset
        });

        setScrollEnd(false)
    }

    const renderItems = () => {
        const items = comicsList.map(({ id, title, prices, thumbnail }, i) => {
            let imgNotAvaStyle = {};

            if (thumbnail === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`) imgNotAvaStyle.objectFit = 'fill';

            return (
                <li
                    key={i}
                    className="comics__item">
                    <Link to={`${id}`}>
                        <img
                            src={thumbnail}
                            alt={title}
                            className="comics__item-img"
                            style={imgNotAvaStyle} />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{prices}</div>
                    </Link>
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
                <div className="inner">{newItemsLoading ? 'loading...' : 'load more'}</div>
            </button>
        </div>
    )
}

export default ComicsList;