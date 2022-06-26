import { comics_page } from '../../../config/pages.config';

import ComicsList from '../../comics-list';
import AppBanner from '../../app-banner';

const ComicsPage = () => {
    const helmet = comics_page();
    return (
        <>
            {helmet}
            <AppBanner />
            <ComicsList />
        </>
    )
}

export default ComicsPage;