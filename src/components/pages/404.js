import ErrorMessage from '../error-message';
import { Link } from 'react-router-dom';

const Page404 = () => {

    return (
        <div>
            <ErrorMessage {...{ type: 'not_found', h: 300, w: 500 }} />
            <Link to="/" style={{ display: 'block', textAlign: 'center', color: '#00000', fontSize: '22px', textDecoration: 'underline', }}>Back to Main Page.</Link>
        </div>
    )
}

export default Page404;