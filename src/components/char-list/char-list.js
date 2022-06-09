import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/marvel-services';

import CharListItem from '../char-list-item';
import ErrorMessage from '../error-message';
import Spinner from '../sipnner';

import './char-list.scss';

class CharList extends Component {
    state = {
        items: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 219,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        // this._scrollEvent = this.onScrollLoad();
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this._scrollEvent);
    // }

    // onScrollLoad = () => {
    //     return window.addEventListener('scroll', () => {
    //         const scrollHeight = Math.max(
    //             document.body.scrollHeight, document.documentElement.scrollHeight,
    //         ) - document.documentElement.clientHeight;

    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //         if (Math.floor(scrollHeight) <= Math.floor(scrollTop) + 2 && !this.state.newItemsLoading) {
    //             this.onRequest(this.state.offset, () => {
    //                 document.documentElement.scrollTop = scrollHeight - 100;
    //             });
    //             document.body.style.height = `${scrollHeight}px`;
    //         }
    //     })
    // }

    onRequest = (offset, cb = null) => {
        this.onLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(res => this.onItemsLoaded(res, cb))
            .catch(this.onError);
    }

    onLoading = () => {
        this.setState({ loading: true, newItemsLoading: true });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onItemsLoaded = (newItems, cb) => {
        let ended = false;
        if (newItems.length < 9) {
            ended = true;
        }

        this.setState(({ offset, items }) => ({
            items: [...items, ...newItems],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }), cb);
    }

    renderItems(arr) {
        if (Object.keys(arr).length === 0) return;

        const items = arr.map((val, i) => {
            const { thumbnail, name } = val;
            let imgNotAvaStyle = {},
                letters = {}

            if (thumbnail.indexOf('/image_not_available.') !== -1) imgNotAvaStyle.objectFit = 'unset';
            if (name.length > 20) letters.fontSize = '16px';

            return (
                <CharListItem
                    key={i}
                    methods={[this.props.onCharSelected]}
                    styles={[letters, imgNotAvaStyle]}
                    {...val}
                />
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const { items, loading, error, newItemsLoading, offset, charEnded } = this.state;

        const chars = this.renderItems(items);

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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;