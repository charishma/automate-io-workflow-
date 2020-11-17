import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {createWorkFlow,editWorkFlow,addTaskNode,changeTaskStatus,login,logout,
    saveWorkFlow,updateWorkFlow,deleteTaskNode,changeWorkflowStatus,editWorkFlowItem,deleteWorkItem,shuffleTaskNodes
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
    [successActionType(changeWorkflowStatus)]: (state, { payload }) => {

        state = [...payload];

        return state;
    },
    [successActionType(deleteWorkItem)]: (state, { payload }) => {

        state = [...payload];

        return state;
    },
    
}, []);
const loggedInStatus = handleActions({
    [login]:(state, { payload }) => {
        return !state;
    },
    [logout]:(state, { payload }) => {
        return !state;
    },
},false);
const editingWorkFlowItem = handleActions({
    [successActionType(createWorkFlow)]: (state, { payload }) => {
        state = {...state, ...payload};

        return state;
    },
    [successActionType(editWorkFlowItem)]:(state, { payload }) => {
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
    [updateWorkFlow]:(state, { payload }) => {
       
         state = {...state,...payload};

        return state;
    },
    [deleteTaskNode]:(state,{payload})=>{
        let workFlowData = [...state.tasknode];
        workFlowData.pop();
        if(workFlowData.length === 0)
        {
            state = {...state,tasknode:[...workFlowData],status:0};
        }else{
            state = {...state,tasknode:[...workFlowData]};
        }
        
        return state;
    },
    [addTaskNode]:(state,{payload})=>{
        state = {...state,status:0};
        return state;
    },
    [successActionType(shuffleTaskNodes)]:(state, { payload }) => {
        let taskNodesArray = [...payload];
         state = {...state,tasknode:[...taskNodesArray]};

        return state;
    },
}, {});

 const appReducers = combineReducers({
    workFlowList,
    editingWorkFlowItem,
    loggedInStatus
});

export default appReducers;