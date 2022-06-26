import { Helmet } from 'react-helmet';

export const main_page = () => (
    <Helmet>
        <meta name="description" content="React App Marvel Api" />
        <title>React App Marvel Api</title>
    </Helmet>
);

export const comics_page = () => (
    <Helmet>
        <meta name="description" content="React App Marvel Api" />
        <title>Marvel Comics</title>
    </Helmet>
);

export const single_pages = ({ title, descContent }) => (
    <Helmet>
        <meta name="description" content={descContent} />
        <title>{title}</title>
    </Helmet>
);

export const page_404 = () => (
    <Helmet>
        <meta name="description" content="React App Marvel Api" />
        <title>404 Page Not Found</title>
    </Helmet>
);
