# Simple React App

This application was created in order to learn the React framework.
The application works based on requests to the [Marvel Api.](https://developer.marvel.com/)

This application uses and implements dependencies such as:

- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [React-Router-Dom](https://reactrouter.com/)
- [React-Transition-Group](https://reactcommunity.org/react-transition-group/)
- [React-Helmet](https://github.com/nfl/react-helmet)

These dependencies are implemented in the following tasks:

- Creating a form using `Fromik` and validating this form using the `Yup` library.

- With the help of `React-Router-Dom`, routes were created to individual pages, receiving data from `useLocation` and using them later for requests to the server.

- Added minor animations when loading new characters or comics via `React-Transition-Group`. It was quite possible to do without animations for this project, but it was quite useful to get acquainted with this library.

- `React-Helmet` is a library for changing meta tags with extensive customization functionality for each page created based on React.

---

To deploy this application, it was decided to use [Heroku](https://www.heroku.com/platform) services in favor of ease of use and deployment from the repository.

> Preview of the finished version of the application [here!](https://react-app-marvel-api.herokuapp.com/)