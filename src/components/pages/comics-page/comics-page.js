import { Outlet } from 'react-router-dom'

import ComicsList from '../../comics-list';
import AppBanner from '../../app-banner';

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ComicsList />
            <Outlet />
        </>
    )
}

export default ComicsPage;