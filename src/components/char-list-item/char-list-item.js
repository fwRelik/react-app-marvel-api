const CharListItem = ({ methods, styles, iterId, id, name, thumbnail }) => {
    const [onCharSelected, getRefs, focusOnItem] = methods;
    const [letters, imgNotAvaStyle] = styles;

    return (
        <li
            ref={getRefs}
            tabIndex={0}
            className="char__item"
            onClick={() => {
                focusOnItem(iterId);
                onCharSelected(id);
            }}
            onKeyPress={e => {
                if (e.key === " " || e.key === "Enter") {
                    focusOnItem(iterId);
                    onCharSelected(id);
                }
            }}>
            <img
                src={thumbnail}
                alt={name}
                style={imgNotAvaStyle} />
            <div
                className="char__name"
                style={letters}>
                {name}
            </div>
        </li>
    );
}

export default CharListItem;
