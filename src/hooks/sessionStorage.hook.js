import { useCallback } from 'react';

export const useSessionStorage = () => {
    const getStorage = useCallback((key) => {
        return JSON.parse(sessionStorage.getItem(key)) || [];
    });

    const setStorage = useCallback((key, values) => {
        sessionStorage.setItem(key, JSON.stringify(values));
    });

    return { setStorage, getStorage };
}