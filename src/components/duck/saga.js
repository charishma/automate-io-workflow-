import {select, all, call, put, putResolve, takeEvery, takeLatest,fork,delay } from 'redux-saga/effects';
import * as selectors  from './selectors';
import { push as pushRoute, goBack } from 'connected-react-router';
import {PageRoutes} from '../Constants/constants';
import {find,propEq,findIndex} from 'ramda';

function* createWorkFlow(action) {
    let workFlowList = yield select(selectors.getWorkFlowList);
    let workFlowCount = workFlowList.length + 1;
   let workFlowObj = {
            'name':'WorkFlow'+workFlowCount,
             'tasknode':[],
             'status':0
   };
   yield put(successAction(action,workFlowObj));
   yield put(pushRoute({
    pathname: PageRoutes.taskflow,
    }));
}
function* addTaskNode(action)
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
    let taskCount = editingItem.tasknode.length + 1;
    let taskNodeObj = {
        'name':'Task '+taskCount,
         'status':0,
         'comment':'Comment section here'
    }
    yield put(successAction(action,taskNodeObj));

}
function* changeTaskStatus(action)
{
    let {taskName} = action.payload;
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
     const taskItem = find(propEq('name', taskName))(editingItem.tasknode);
     const taskItemIndex = findIndex(propEq('name', taskName))(editingItem.tasknode);
     if(taskItem.status === 2)
     {
        taskItem.status = 0;
     }else{
        taskItem.status =  taskItem.status + 1;
     }
     let taskNodeArray = [...editingItem.tasknode];
     taskNodeArray = taskNodeArray.splice(taskItemIndex, 1,taskItem);
     yield put(successAction(action,taskNodeArray));
}
function* saveWorkFlow(action)
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
    let workFlowList = yield select(selectors.getWorkFlowList);
    const workFlowItemIndex = findIndex(propEq('name', editingItem.name))(workFlowList);
    workFlowList = workFlowList.splice(workFlowItemIndex, 1,editingItem);
    yield put(successAction(action,workFlowList));
}
export function beginAction(originalAction, payload) {
    const action = {...originalAction, type: beginActionType(originalAction.type)};
    if (payload) {
        action.payload = payload;
    }
   
    return action;
}
export function beginActionType(actionType) {
    return `${String(actionType)}_BEGIN`;
}
export function successAction(originalAction, payload) {
    const action = {...originalAction, type: successActionType(originalAction.type)};
    if (payload) {
        action.payload = payload;
    }
    
    return action;
}

export function failedAction(originalAction, error) {
    const action = {...originalAction, payload: null, type: failedActionType(originalAction.type)};
    action.error = error;
    if (error) {
        action.payload = originalAction.payload;
    }
    return action;
}
export function successActionType(actionType) {
    return `${String(actionType)}_SUCCESS`;
}
export function failedActionType(actionType) {
    return `${String(actionType)}_FAILED`;
}

export default function* flowAppSaga() {
    yield takeEvery('FLOWAPP/CREATE_WORK_FLOW', createWorkFlow);
    //yield takeLatest('FLOWAPP/EDIT_WORK_FLOW', editWorkFlow);
    yield takeEvery('FLOWAPP/ADD_TASK_NODE', addTaskNode);
    yield takeEvery('FLOWAPP/CHANGE_TASK_STATUS', changeTaskStatus);
    yield takeEvery('FLOWAPP/SAVE_WORKLOW',saveWorkFlow);
}