import { useGettingPageMethod } from '../../../hooks/gettingPageMehtod';
import { single_pages } from '../../../config/pages.config';

import AppBanner from '../../app-banner';
import ErrorMessage from '../../error-message';
import Spinner from '../../spinner';

import './single-pages.scss'

const SinglePages = ({ Component, dataType }) => {
    const { item, dataKey, loading, error } = useGettingPageMethod(dataType);
    const helmet = single_pages({
        title: item?.[dataKey],
        descContent: `"${item?.[dataKey]}" Page`
    });

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !item) ? <Component data={item} /> : null;

    return (
        <>
            {helmet}
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