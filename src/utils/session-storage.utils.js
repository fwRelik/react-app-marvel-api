import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const SessionStorageUtils = () => {
    let pathKey;
    const { pathname } = useLocation();

    if (pathname === '/') pathKey = 'mp';
    else pathKey = pathname.replace('/', '');

    const getStorage = useCallback((key) => {
        return JSON.parse(sessionStorage.getItem(`${pathKey}_${key}`)) || [];
        // eslint-disable-next-line
    }, []);

    const setStorage = useCallback((key, values) => {
        sessionStorage.setItem(`${pathKey}_${key}`, JSON.stringify(values));
        // eslint-disable-next-line
    }, []);

    const _getPathKey = () => pathKey;

    return { _getPathKey, setStorage, getStorage };
}