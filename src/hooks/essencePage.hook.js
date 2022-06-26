import { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";

import useMarvelService from '../services/marvel-services';

export const useEssencePage = (dataType) => {
    const [item, setItem] = useState(null);
    const { itemId } = useParams();
    const { loading, error, clearError, getCharacter, getComic } = useMarvelService();

    useEffect(() => {
        updateItem();
    }, [itemId]);

    const _method = (method) => {
        switch (method) {
            case 'character':
                return getCharacter
            case 'comic':
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
        loading,
        error,
        clearError,
        getComic,
        updateItem,
    }
}