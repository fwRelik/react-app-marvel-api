import { useSessionStorage } from '../../hooks/sessionStorage.hook';

import './scroll-navigation.scss';

const ScrollNavigation = () => {
    const { getStorage } = useSessionStorage();
    const onClickUpHandlaer = () => {
        document.documentElement.scrollTop = 0;
    }

    const onClickDownHandlaer = () => {
        document.documentElement.scrollTop = getStorage('scrollTop');
    }

    return (
        <div className="scroll__navigation-wrapper">
            <button onClick={onClickUpHandlaer} className='scroll__navigation-button'>Click to up</button>
            <button onClick={onClickDownHandlaer} className='scroll__navigation-button'>Click to down</button>
        </div>
    )
}

export default ScrollNavigation;