import {select, call, put, putResolve, takeEvery, takeLatest,fork,delay } from 'redux-saga/effects';
import * as selectors  from './selectors';
import { push as pushRoute, goBack } from 'connected-react-router';
import {PageRoutes} from '../Constants/constants';
import {find,propEq,findIndex,all} from 'ramda';
import cuid from 'cuid';
import Shuffle from 'shuffle-array';
function* createWorkFlow(action) {
    let workFlowList = yield select(selectors.getWorkFlowList);
    let workFlowCount = workFlowList.length + 1;
   let workFlowObj = {
            'id':cuid(),
            'name':'WorkFlow ',
             'tasknode':[],
             'status':0
   };
   yield put(successAction(action,workFlowObj));
   yield put(pushRoute({
    pathname: PageRoutes.taskflow,
    }));
}
function* deleteWorkItem(action)
{
    let {taskId} = action.payload;
    let workFlowItems = yield select(selectors.getWorkFlowList);
    const workFlowItem = find(propEq('id', taskId))(workFlowItems);
    const workFlowItemIndex = findIndex(propEq('id', taskId))(workFlowItems);
    workFlowItems.splice(workFlowItemIndex, 1);
    yield put(successAction(action,workFlowItems));
}
// function  shuffleNodes(taskNodeArray) {
//     var rand, temp;
 
//     for (let i = taskNodeArray.length - 1; i > 0; i -= 1) {
//         rand = Math.floor((i + 1) * Math.random());
//         temp = taskNodeArray[rand];
//         taskNodeArray[rand] = taskNodeArray[i];
//         taskNodeArray[i] = temp;
//     }
//     return taskNodeArray;
// }
function* shuffleTaskNodes(action)
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
     let taskNodeArray = [...editingItem.tasknode];
     taskNodeArray = Shuffle(taskNodeArray);
     yield put(successAction(action,taskNodeArray));
}
function* editWorkFlowItem(action)
{
    let {taskId} = action.payload;
    let workFlowItems = yield select(selectors.getWorkFlowList);
    const workFlowItem = find(propEq('id', taskId))(workFlowItems);
    yield put(successAction(action,workFlowItem));
    yield put(pushRoute({
     pathname: PageRoutes.taskflow,
     }));
}
function* addTaskNode(action)
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
    let taskCount = editingItem.tasknode.length + 1;
    let taskNodeObj = {
        'id':cuid(),
        'name':'Task '+taskCount,
         'status':0,
         'comment':'Comment section here'
    }
    yield put(successAction(action,taskNodeObj));
    //yield put(changeWorkflowStatus({'taskId':editingItem.id}));
}
function* deleteTaskNode()
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
    //yield put(changeWorkflowStatus({'taskId':editingItem.id}));
}
function* changeWorkflowStatus(action)
{
    let {taskId} = action.payload;
    let workFlowItems = yield select(selectors.getWorkFlowList);
    const workFlowItem = find(propEq('id', taskId))(workFlowItems);
    const workFlowItemIndex = findIndex(propEq('id', taskId))(workFlowItems);
    if(workFlowItem.status === 0)
    {
        const statusCheck = propEq('status',2);
        const statusFlag = all(statusCheck)(workFlowItem.tasknode);
        workFlowItem.status = statusFlag?2:0;
    }else{
        workFlowItem.status = 0;
    }
    workFlowItems.splice(workFlowItemIndex, 1,workFlowItem);
     yield put(successAction(action,workFlowItems));
}
function* changeTaskStatus(action)
{
    let {taskId} = action.payload;
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
     const taskItem = find(propEq('id', taskId))(editingItem.tasknode);
     const taskItemIndex = findIndex(propEq('id', taskId))(editingItem.tasknode);
     if(taskItem.status === 2)
     {
        taskItem.status = 0;
     }else{
        taskItem.status =  taskItem.status + 1;
     }
     let taskNodeArray = [...editingItem.tasknode];
     taskNodeArray.splice(taskItemIndex, 1,taskItem);
     yield put(successAction(action,taskNodeArray));
    // yield put(changeWorkflowStatus({'taskId':editingItem.id}));
}
function* saveWorkFlow(action)
{
    let editingItem = yield select(selectors.getEditingWorkFlowItem);
    let workFlowList = yield select(selectors.getWorkFlowList);
    const workFlowItemIndex = findIndex(propEq('id', editingItem.id))(workFlowList);
    workFlowList.splice(workFlowItemIndex, 1,editingItem);
    yield put(successAction(action,workFlowList));
    yield put(pushRoute({
        pathname: PageRoutes.workflow,
        }));
}
// function* updateWorkFlow(action)
// {
//     let editingItem = yield select(selectors.getEditingWorkFlowItem);
// }
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
    yield takeLatest('FLOWAPP/CREATE_WORK_FLOW', createWorkFlow);
    yield takeLatest('FLOWAPP/EDIT_WORK_FLOW', editWorkFlowItem);
    yield takeLatest('FLOWAPP/ADD_TASK_NODE', addTaskNode);
    yield takeLatest('FLOWAPP/CHANGE_TASK_STATUS', changeTaskStatus);
    yield takeLatest('FLOWAPP/SAVE_WORKLOW',saveWorkFlow);
    yield takeLatest('FLOWAPP/CHANGE_WORKFLOW_STATUS',changeWorkflowStatus);
    yield takeLatest('FLOWAPP/DELETE_WORK_FLOW', deleteWorkItem);
    yield takeLatest('FLOWAPP/SHUFFLE_TASK_NODES', shuffleTaskNodes);
    yield takeLatest('FLOWAPP/DELETE_TASK_NODE', deleteTaskNode);
}
