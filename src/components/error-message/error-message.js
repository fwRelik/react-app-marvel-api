import './error-message.scss'

import error from './OnlyError.png';
import not_found from './NotFound.png';

const ErrorMessage = ({ type = 'error', w = 300, h = 250, msg = null }) => {
    const _getImg = (type) => {
        switch (type) {
            case 'error':
                return error;
            case 'not_found':
                return not_found;
            default:
                return;
        }
    }

    return (
        <div
            className="errors"
            style={{ minHeight: `${h}px` }}>
            {/* <div className="error-msg" style={styles.error_msg}>{msg}</div> */}
            <img
                className="error-img"
                src={_getImg(type)}
                alt={type}
                style={{ width: `${w}px` }} />
        </div>
    );
}

export default ErrorMessage;