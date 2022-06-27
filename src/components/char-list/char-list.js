import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useScroll } from '../../hooks/scroll.hook';
import { ConfigSetterUtils } from '../../utils/config-setter.utils';
import useMarvelService from '../../services/marvel-services';
import { setContentLists } from '../../utils/content-setters.utils';

import './char-list.scss';

const CharList = ({ onCharSelected }) => {
    const { process, setProcess, getAllCharacters } = useMarvelService();
    const { scrollEnd, setScrollEnd } = useScroll();
    const { setConfigPage, getConfigPage } = ConfigSetterUtils();

    const [items, setItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(Math.floor(Math.random() * 400));
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        const { itemInfo = [], itemOffset } = getConfigPage();

        if (!itemInfo.length) {
            onRequest(offset, true);
        } else {
            setItems(itemInfo);
            setOffset(itemOffset + 9);
            setProcess('confirmed');
        }
    }, []);

    useEffect(() => {
        if (scrollEnd && !charEnded) onRequest(offset);
    }, [scrollEnd]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllCharacters(offset)
            .then(onItemsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onItemsLoaded = (newItems) => {
        let ended = newItems.length < 9 ? true : false;

        setOffset(offset => offset + 9);
        setItems(items => [...items, ...newItems]);
        setNewItemsLoading(false);
        setCharEnded(ended);


        setConfigPage({
            items: [...items, ...newItems],
            offset
        });

        setScrollEnd(false);
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
                <CSSTransition
                    key={i}
                    timeout={500}
                    classNames="char__item"
                >
                    <li
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
                </CSSTransition >
            )
        });

        return (
            <ul
                className="char__grid">
                <TransitionGroup component={null}>
                    {listItem}
                </TransitionGroup>
            </ul>
        )
    }

    return (
        <div className="char__list">

            {setContentLists(process, renderItems(items), newItemsLoading)}

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