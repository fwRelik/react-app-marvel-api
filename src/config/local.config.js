// Do not misuse these keys, each key has a request limit per day!
// Не злоупотребление этими ключами, у каждого ключа имееться лимит по запросу в день!

const config = {
    _apiBase: `https://gateway.marvel.com:443/v1/public/`,
    _apiKey: [
        'apikey=170687e74c50ea19882f62ddbd3ec59d',
        'apikey=5c2c2c91a332431a7d21df5868939d78',
        'apikey=a6a2b55ce10a38e36a7b820854a07f6c',
        'apikey=2ff7352f3706b8268ea7eb0f3f8ffa18'
    ][Math.floor(Math.random() * 4)],
    _baseOffset: 210
};

export { config };