import { useSessionStorage } from "./sessionStorage.hook";

export const useConfigSetter = () => {
    const { _getPathKey, setStorage, getStorage } = useSessionStorage();
    const pathKey = _getPathKey() + '_';

    const setConfigPage = ({ items = [], offset = 0 }) => {
        setStorage('itemInfo', items);
        setStorage('itemOffset', offset);
        setStorage('scrollTop', Math.floor(document.documentElement.scrollTop));
    }

    const getConfigPage = (...items) => {
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
    }

    return { setConfigPage, getConfigPage };
}