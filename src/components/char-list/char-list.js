import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/marvel-services';

import CharListItem from '../char-list-item';
import ErrorMessage from '../error-message';
import Spinner from '../sipnner';

import './char-list.scss';

const CharList = ({ onCharSelected }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();

        // const _scrollEvent = onScrollLoad();

        // return window.removeEventListener('scroll', _scrollEvent);

    }, []);

    // const onScrollLoad = () => {
    //     return window.addEventListener('scroll', () => {
    //         const scrollHeight = Math.max(
    //             document.body.scrollHeight, document.documentElement.scrollHeight,
    //         ) - document.documentElement.clientHeight;

    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //         if (Math.floor(scrollHeight) <= Math.floor(scrollTop) + 2 && !newItemsLoading) {
    //             onRequest(offset)
    //             // , () => {
    //             //     document.documentElement.scrollTop = scrollHeight - 100;
    //             // });
    //             // document.body.style.height = `${scrollHeight}px`;
    //         }
    //     })
    // }

    const onRequest = (offset) => {
        onLoading();
        marvelService
            .getAllCharacters(offset)
            .then(res => onItemsLoaded(res))
            .catch(onError);
    }

    const onLoading = () => {
        setLoading(true);
        setNewItemsLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onItemsLoaded = (newItems) => {
        let ended = false;
        if (newItems.length < 9) {
            ended = true;
        }

        setItems(items => [...items, ...newItems]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    let itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr) => {
        if (Object.keys(arr).length === 0) return;

        const listItem = arr.map((val, i) => {
            const { id, thumbnail, name } = val;
            let imgNotAvaStyle = {},
                letters = {}

            if (thumbnail.indexOf('/image_not_available.') !== -1) imgNotAvaStyle.objectFit = 'unset';
            if (name.length > 20) letters.fontSize = '16px';

            return (
                <li
                    key={i}
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => {
                        focusOnItem(i);
                        onCharSelected(id);
                    }}
                    onKeyPress={e => {
                        if (e.key === " " || e.key === "Enter") {
                            focusOnItem(i);
                            onCharSelected(id);
                        }
                    }}>
                    <img
                        src={thumbnail}
                        alt={name}
                        style={imgNotAvaStyle} />
                    <div
                        className="char__name"
                        style={letters}>
                        {name}
                    </div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {listItem}
            </ul>
        )
    }

    const chars = renderItems(items);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? chars : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;