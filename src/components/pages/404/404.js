import ErrorMessage from '../../error-message';
import { Link } from 'react-router-dom';

import './404.scss';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage {...{ type: 'not_found', h: 300, w: 500 }} />
            <Link to="/" className="back_link">Go to the previous age</Link>
        </div>
    )
}

export default Page404;