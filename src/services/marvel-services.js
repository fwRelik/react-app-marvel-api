import { useHttp } from '../hooks/http.hook';
import { config } from '../config/local.config';

if (!config) throw new Error('Perhaps the configuration file is missing or configured incorrectly, take a look at the hint "local.config.txt"');

const { _apiBase, _apiKey, _baseOffset } = config;

const useMarvelService = () => {
    const { request, process, setProcess } = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.length > 0 ? _transformCharacter(res.data.results[0]) : null;
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (item) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
            homepage: item.urls[0].url,
            wiki: item.urls[1].url,
            comics: item.comics.items,
        }
    }

    const _transformComics = (item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            pageCount: item.pageCount ? `${item.pageCount} p.` : `No information about the number of pages.`,
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
            language: item.textObjects.language || 'en-us',
            prices: item.prices.price ? `${item.prices.price}$` : 'Not Available'
        }
    }

    return {
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getAllComics,
        getComic
    };
}

export default useMarvelService;