import './app-banner.scss';
import avengers from '../../assets/img/Avengers.png';
import avengersLogo from '../../assets/img/Avengers_logo.png';

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={avengers} alt="Avengers" />
            <div className="app__banner-text">
                New comics every week!<br />
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo" />
        </div>
    )
}

export default AppBanner;