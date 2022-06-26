import { Link } from 'react-router-dom';
import { page_404 } from '../../../config/pages.config';
import ErrorMessage from '../../error-message';

import './404.scss';

const Page404 = () => {
    const helmet = page_404();

    return (
        <div>
            {helmet}
            <ErrorMessage {...{ type: 'not_found', h: 300, w: 500 }} />
            <Link to="/" className="back_link">Go to the main age</Link>
        </div>
    )
}

export default Page404;