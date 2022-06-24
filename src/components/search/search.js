import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/marvel-services';

import './search.scss';

const Search = () => {
    const [char, setChar] = useState(null);
    const { loading, clearError, getCharacterByName } = useMarvelService();

    const updateChar = (charName) => {
        clearError();


        getCharacterByName(charName)
            .then(setChar)
            .catch(() => setChar([]));
    }

    const results = !char ? null : [char][0]?.id ?
        <div className="search__find_character">
            <div className="search__finded">
                There is! Visit {char.name} page?
            </div>
            <Link to={`/characters/${char.id}`} type='submit' className="button button__secondary search__button_page">
                <div className="inner">To Page</div>
            </Link>
        </div> :
        <div className="search__error">
            The character was not found. Check the name and try again.
        </div>;

    return (
        <div className="search__form">
            <div className="search__header">
                Or find a character by name:
            </div>
            <Formik
                initialValues={{ charName: '' }}
                validationSchema={
                    Yup.object({
                        charName: Yup.string().required('This field is required.')
                    })}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}
            >
                <Form className='search__find_character'>
                    <Field
                        id="charName"
                        name="charName"
                        type="text"
                        placeholder="Enter name"
                    />
                    <button
                        type='submit'
                        className="button button__main search__button_find"
                        disabled={loading}
                    >
                        <div className="inner">Find</div>
                    </button>
                    <FormikErrorMessage component="div" className="search__error" name="charName" />
                </Form>
            </Formik>
            {results}
        </div>
    );
};

export default Search;