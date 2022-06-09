import './error-message.scss';

import error from './OnlyError.png';

const ErrorMessage = ({ msg }) => {
    return (
        <div className="errors">
            {/* <div className="error-msg">{msg}</div> */}
            <img className="error-img" src={error} alt="" />
        </div>
    );
}

export default ErrorMessage;