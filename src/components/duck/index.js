
import {all} from 'redux-saga/effects';
import appReducers from './reducers';
import flowAppSaga from './saga';
import * as actions from './actions';

export const rootReducers = {
    appReducers
};

export function* rootSaga() {
    yield all([
        flowAppSaga()
    ]);
}
export const appActions = {
    ...actions,
};
