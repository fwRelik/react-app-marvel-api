import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MainPage, ComicsPage } from '../pages';

import AppHeader from "../app-header";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;