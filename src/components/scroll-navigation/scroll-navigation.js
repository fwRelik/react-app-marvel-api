import { useState, useEffect } from 'react';

import { AnglesUp } from '../svg/'

import './scroll-navigation.scss';

const ScrollNavigation = () => {
    const [hide, setHide] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', buttonState);

        return () => window.removeEventListener('scroll', buttonState);
    }, []);

    const buttonState = () => {
        const doc = document.documentElement;
        if (doc.scrollTop > 400) setHide(false);
        else setHide(true);
    }

    const onClickHandler = () => {
        document.documentElement.scrollTop = 0;
    }

    if (hide) return;

    return (
        <div className={`scroll__navigation`}>
            <button
                onClick={onClickHandler}
                className='scroll__navigation-button'>
                <AnglesUp style={'regular'} />
            </button>
        </div>
    )
}

export default ScrollNavigation;