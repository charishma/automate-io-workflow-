import { createAction } from 'redux-actions';


const PREFIX = 'FLOWAPP';

/**
 * Login click 
 */
export const login = createAction(`${PREFIX}/LOGIN`);

export const logout = createAction(`${PREFIX}/LOGOUT`);

export const addTaskNode = createAction(`${PREFIX}/ADD_TASK_NODE`);

export const createWorkFlow = createAction(`${PREFIX}/CREATE_WORK_FLOW`);

export const editWorkFlowItem = createAction(`${PREFIX}/EDIT_WORK_FLOW`);

export const deleteWorkItem = createAction(`${PREFIX}/DELETE_WORK_FLOW`);

export const deleteTaskNode = createAction(`${PREFIX}/DELETE_TASK_NODE`);

export const changeTaskStatus = createAction(`${PREFIX}/CHANGE_TASK_STATUS`);

export const changeWorkflowStatus = createAction(`${PREFIX}/CHANGE_WORKFLOW_STATUS`);

export const shuffleTaskNodes = createAction(`${PREFIX}/SHUFFLE_TASK_NODES`);

export const saveWorkFlow = createAction(`${PREFIX}/SAVE_WORKLOW`);

export const updateWorkFlow = createAction(`${PREFIX}/UPDATE_WORKLOW`);
