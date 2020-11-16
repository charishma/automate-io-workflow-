
import {all} from 'redux-saga/effects';

export const rootReducers = {
    // loginReducer,
    // WorkFlowReducer,
    // TaskFlowReducer
};

export function* rootSaga() {
    yield all([
        // loginSaga(),
        // workFlowSaga(),
        // TaskFlowSaga(),
    ]);
}

