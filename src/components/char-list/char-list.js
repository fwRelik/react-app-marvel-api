import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useScroll } from '../../hooks/scroll.hook';

import useMarvelService from '../../services/marvel-services';

import ErrorMessage from '../error-message';
import Spinner from '../sipnner';

import './char-list.scss';

const CharList = ({ onCharSelected }) => {
    const [items, setItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, clearError, getAllCharacters } = useMarvelService();
    const { scrollEnd, setScrollEnd } = useScroll();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    useEffect(() => {
        if (scrollEnd) onRequest(offset);
    }, [scrollEnd]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllCharacters(offset)
            .then(onItemsLoaded)
    }

    const onItemsLoaded = (newItems) => {
        let ended = newItems.length < 9 ? true : false;

        clearError();
        setOffset(offset => offset + 9);
        setItems(items => [...items, ...newItems]);
        setNewItemsLoading(false);
        setScrollEnd(false)
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

            if (thumbnail === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`) imgNotAvaStyle.objectFit = 'unset';
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
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;

    return (
        <div className="char__list">

            {errorMessage}
            {spinner}
            {chars}

            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">{newItemsLoading ? 'loading...' : 'load more'}</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;