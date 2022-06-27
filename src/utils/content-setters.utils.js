import Spinner from '../components/spinner'
import ErrorMessage from '../components/error-message'
import Skeleton from '../components/skeleton'

export const setContentWithoutWaiting = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

export const setContentCharInfo = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

export const setContentLists = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemsLoading ? Component : <Spinner />;
        case 'confirmed':
            return Component
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

export const setContentSearch = (process, data, { finded, notfound }) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return null; // Need to add loading notify.
        case 'confirmed':
            return finded(data);
        case 'notfound':
            return notfound();
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}
