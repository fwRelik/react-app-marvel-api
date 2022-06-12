import './error-message.scss'

import error from './OnlyError.png';
import not_found from './NotFound.png';

// const styles = {
//     errors: {
//         'margin': '0 auto',
//         'height': '100%',
//         'display': 'flex',
//         'justifyContent': 'center',
//         'alignItems': 'center'
//     },
//     error_img: {
//         'width': '300px'
//     },
//     error_msg: {
//         'fontSize': '24px',
//         'lineHeight': '120px',
//         'color': '#f00',
//         'textAlign': 'center'
//     }
// }

const ErrorMessage = ({ type = 'error', w = 300, h = 250, msg = null }) => {

    let img;
    switch (type) {
        case 'error':
            img = error;
            break;
        case 'not_found':
            img = not_found;
            break;
        default:
            return;
    }

    return (
        <div
            className="errors"
            style={{ minHeight: `${h}px` }}>
            {/* <div className="error-msg" style={styles.error_msg}>{msg}</div> */}
            <img
                className="error-img"
                src={img}
                alt={type}
                style={{ width: `${w}px` }} />
        </div>
    );
}

export default ErrorMessage;