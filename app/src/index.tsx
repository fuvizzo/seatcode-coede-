import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import patchHandler from './store/patch-handler';

patchHandler.init(store.dispatch);

const AppContatiner: React.FC = () => (
  <Provider store={store}>
    <Router>
      <div>
        <h2>Supervisors</h2>
        <ul>
          <li>
            <Link to="/1254">Mark Paine</Link>
          </li>
          <li>
            <Link to="/458">John Taylor</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:userId">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>

  </Provider>
);

ReactDOM.render(<AppContatiner />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
