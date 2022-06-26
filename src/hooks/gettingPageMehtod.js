import { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";

import useMarvelService from '../services/marvel-services';

export const useGettingPageMethod = (dataType) => {
    const [item, setItem] = useState(null);
    const [dataKey, setDataKey] = useState(null);
    const { itemId } = useParams();
    const { loading, error, clearError, getCharacter, getComic } = useMarvelService();

    useEffect(() => {
        updateItem();
    }, [itemId]);

    const _method = (method) => {
        switch (method) {
            case 'character':
                setDataKey('name');
                return getCharacter
            case 'comic':
                setDataKey('title');
                return getComic
            default:
                throw new Error('Method for getting data is not defined.');
        }
    }

    const updateItem = useCallback(() => {
        clearError();
        _method(dataType)(itemId)
            .then(setItem)
    });

    return {
        itemId,
        item,
        dataKey,
        loading,
        error,
        clearError,
        getComic,
        updateItem,
    }
}