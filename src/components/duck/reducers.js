import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {createWorkFlow,editWorkFlow,addTaskNode,changeTaskStatus,
    saveWorkFlow,
   } from './actions';
import { successActionType, failedActionType } from './saga';

/** contains WorkFlowItems */
const workFlowList = handleActions({
    [successActionType(createWorkFlow)]: (state, { payload }) => {

        state = [...state, payload];

        return state;
    },
    [successActionType(saveWorkFlow)]: (state, { payload }) => {

        state = [...payload];

        return state;
    },
}, []);

const editingWorkFlowItem = handleActions({
    [successActionType(createWorkFlow)]: (state, { payload }) => {
        state = {...state, ...payload};

        return state;
    },
    [successActionType(addTaskNode)]:(state, { payload }) => {
        let taskNodesArray = [...state.tasknode];
         taskNodesArray.push(payload);
         state = {...state,tasknode:[...taskNodesArray]};

        return state;
    },
    [successActionType(changeTaskStatus)]:(state, { payload }) => {
        let taskNodesArray = [...payload];
         state = {...state,tasknode:[...taskNodesArray]};

        return state;
    },
}, {});

 const appReducers = combineReducers({
    workFlowList,
    editingWorkFlowItem
});

export default appReducers;