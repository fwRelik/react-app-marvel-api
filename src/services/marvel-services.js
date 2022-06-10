import {useHttp} from '../hooks/http.hook';
import { config } from '../config/local.config';

if (!config) {
    throw new Error('Perhaps the configuration file is missing or configured incorrectly, take a look at the hint "local.config.txt"')
}

const { _apiBase, _apiKey, _baseOffset } = config;

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { loading, error, getAllCharacters, getCharacter, clearError };
}

export default useMarvelService;