import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useScroll } from '../../hooks/scroll.hook';
import { ConfigSetterUtils } from '../../utils/config-setter.utils';
import useMarvelService from '../../services/marvel-services';
import { setContentLists } from '../../utils/content-setters.utils';

import './comics-list.scss';

const ComicsList = () => {
    const { process, setProcess, getAllComics } = useMarvelService();
    const { scrollEnd, setScrollEnd } = useScroll();
    const { setConfigPage, getConfigPage } = ConfigSetterUtils();

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
            setProcess('confirmed');
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (scrollEnd) onRequest(offset);
        // eslint-disable-next-line
    }, [scrollEnd])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset)
            .then(onItemsLoaded)
            .then(() => setProcess('confirmed'));
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
                <CSSTransition
                    key={i}
                    timeout={500}
                    classNames="comics__item"
                >
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
                </CSSTransition>
            )
        })

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    }

    return (
        <div className="comics__list">

            {setContentLists(process, renderItems(), newItemsLoading)}

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