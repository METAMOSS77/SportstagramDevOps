import React from 'react';
import { render } from 'react-dom';



// components
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';
import App from './components/App'
import Login from './components/Login';
import Profil from './components/Profil';
import Subscription from './components/Subscription';
import SingleProfil from './components/SingleProfil';
import Information from './components/Information';

// router deps
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store , { history } from './store';

// css
import css from './styles/style.styl';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Subscription}/>
                <Route path="/view/" component={PhotoGrid} />
                <Route path="/view/:postId" component={Single} />
                <Route path="/profil/" component={Profil} />
                <Route path="/login/" component={Login} />
                <Route path="/subscribe/" component={Subscription} />
                <Route path="/information/" component={Information} />
                <Route path="/profil/:postId" component={SingleProfil} />
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));