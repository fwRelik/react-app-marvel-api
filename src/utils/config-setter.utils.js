import { useCallback } from "react";
import { SessionStorageUtils } from "./session-storage.utils";

export const ConfigSetterUtils = () => {
    const { _getPathKey, setStorage, getStorage } = SessionStorageUtils();
    const pathKey = _getPathKey() + '_';

    const setConfigPage = useCallback(({ items = [], offset = 0 }) => {
        setStorage('itemInfo', items);
        setStorage('itemOffset', offset);
        setStorage('scrollTop', Math.floor(document.documentElement.scrollTop));
    }, []);

    const getConfigPage = useCallback((...items) => {
        if (items.length) {
            return items.map(item => getStorage(item));
        } else {
            let obj = {};
            for (let val in sessionStorage) {
                if (!val.includes(pathKey)) continue;
                let key = val.replace(pathKey, '');
                obj[key] = getStorage(key);
            }
            return obj;
        }
    }, []);

    return { setConfigPage, getConfigPage };
}