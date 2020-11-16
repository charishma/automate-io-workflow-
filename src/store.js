
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducers } from './components/duck';

const createHistory = () => {
   return createBrowserHistory({
            basename: '',
        });
    
};

const history = createHistory();
const rootReducer = combineReducers({
    ...rootReducers,
    router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware,routerMiddleware(history));
const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(middleware));
store.history = history;
sagaMiddleware.run(rootSaga);

export default store;

export {
    history,
};
