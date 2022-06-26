import { Link } from "react-router-dom";

const SingleComicPage = ({ data: { title, description, pageCount, thumbnail, language, prices } }) => {
    return (
        <>
            <img src={thumbnail} alt={title} className="single-item__img" />
            <div className="single-item__info">
                <h2 className="single-item__name">{title}</h2>
                <p className="single-item__descr">{description}</p>
                <p className="single-item__descr">{pageCount}</p>
                <p className="single-item__descr">Language: {language}</p>
                <div className="single-item__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-item__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;