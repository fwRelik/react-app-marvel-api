import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/marvel-services';

import './search.scss';

{/* <div className="search__finded">
    There is! Visit ${'{'}name{'}'} page?
</div> */}

const SearchError = ({ msg }) => (
    <div className="search__error">
        {msg}
    </div>
);

const SearchFinded = ({ msg, link }) => {
    if (!msg) return;
    return (
        <>
            <div className="search__finded">
                {msg}
            </div>
            <button type='submit' className="button button__secondary search__button_page">
                <div className="inner">To Page</div>
            </button>
        </>
    )
};


const Search = () => {
    const [finded, setFinded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { getCharacterByName } = useMarvelService();

    const onSubmitHandler = (val) => {
        getCharacterByName(val.text)
            .then(() => {
                setFinded(true);
                setNotFound(false);
            })
            .catch(() => {
                setFinded(false);
                setNotFound(true);
            })
    }
    const onChangeHandler = () => {
        setFinded(false);
        setNotFound(false);
    }
    return (
        <div className="search__form">
            <div className="search__header">
                Or find a character by name:
            </div>
            <div className="search__find_character">

                <Formik
                    initialValues={{ text: '' }}
                    onSubmit={onSubmitHandler}
                    validationSchema={
                        Yup.object({
                            text: Yup.string()
                                .min(2, 'Минимум 2 символов.')
                                .max(20, 'Максимум 20 символов.')
                                .required('Обязательное Поле!')

                        })}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => {
                        return (
                            <>
                                <input
                                    type="text"
                                    name="text"
                                    onChange={(e) => {
                                        handleChange(e)
                                        onChangeHandler()
                                    }}
                                    onBlur={handleBlur}
                                    value={values.text}
                                    placeholder="Enter name"
                                />
                                <button type='submit' onClick={handleSubmit} className="button button__main search__button_find">
                                    <div className="inner">Find</div>
                                </button>
                                {(touched.text && errors.text) ? <SearchError msg={touched.text && errors.text} /> :
                                    finded ? <SearchFinded msg={`There is! Visit ${values.text} page?`} /> :
                                        notFound ? <SearchError msg={`The character was not found. Check the name and try again.`} /> : null}
                            </>
                        )
                    }
                    }
                </Formik>
            </div>

        </div>
    );
};

export default Search;