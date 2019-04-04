import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom"
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import FolderEdit from './FolderEdit';
import store from './dummy-store'
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter history={history}>

        {/* <App STORE={store}/> */}
        <Route
            exact path="/"
            render={(props) => <App {...props} STORE={store} />}
        />
        <Route
            path="/folder/:folderID"
            render={(props) => <App {...props} STORE={store} />}
        />
        <Route
            path="/addFolder"
            render={(props) => <App {...props} STORE={store} />}
        />

    </BrowserRouter>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
