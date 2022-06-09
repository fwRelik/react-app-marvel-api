const CharListItem = ({ methods, styles, id, name, thumbnail }) => {
    const [onCharSelected] = methods;
    const [letters, imgNotAvaStyle] = styles;

    const onActiveSelect = e => {
        let trigger = e.target.closest('.char__item');
        trigger.parentNode.childNodes.forEach(item => {
            item.classList.remove('char__item_selected');
        });
        trigger.classList.add('char__item_selected');
    }

    return (
        <li
            tabIndex={0}
            className="char__item"
            onClick={(e) => {
                onActiveSelect(e);
                onCharSelected(id);
            }}
            onKeyPress={e => {
                if (e.key === ' ' || e.key === "Enter") {
                    onActiveSelect(e);
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
