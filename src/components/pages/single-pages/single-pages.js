import { useGettingPageMethod } from '../../../hooks/getting-page-mehtod.hook';
import { single_pages } from '../../../config/pages.config';
import { setContentWithoutWaiting } from '../../../utils/content-setters.utils';

import AppBanner from '../../app-banner';

import './single-pages.scss'

const SinglePages = ({ Component, dataType }) => {
    const { item, dataKey, process } = useGettingPageMethod(dataType);
    const helmet = single_pages({
        title: item?.[dataKey],
        descContent: `"${item?.[dataKey]}" Page`
    });

    return (
        <>
            {helmet}
            <AppBanner />
            <div className="single-item">
                {setContentWithoutWaiting(process, Component, item)}
            </div>
        </>
    )
}

export default SinglePages;