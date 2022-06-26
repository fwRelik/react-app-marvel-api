import { Link } from "react-router-dom";

const SingleCharacterPage = ({ data: { name, description, thumbnail } }) => {
    return (
        <>
            <img src={thumbnail} alt={name} className="single-item__img" />
            <div className="single-item__info">
                <h2 className="single-item__name">{name}</h2>
                <p className="single-item__descr">{description ? description : 'This item has no description.'}</p>
            </div>
            <Link to="/" className="single-item__back">Back to main</Link>
        </>
    )
}

export default SingleCharacterPage;