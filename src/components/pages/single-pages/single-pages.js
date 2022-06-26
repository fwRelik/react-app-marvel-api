import { useEssencePage } from '../../../hooks/essencePage.hook';

import AppBanner from '../../app-banner';
import ErrorMessage from '../../error-message';
import Spinner from '../../spinner';

import './single-pages.scss'

const SinglePages = ({ Component, dataType }) => {
    const { item, loading, error } = useEssencePage(dataType);

    console.log(Component)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !item) ? <Component data={item} /> : null;

    return (
        <>
            <AppBanner />
            <div className="single-item">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    )
}

export default SinglePages;