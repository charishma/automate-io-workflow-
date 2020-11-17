import { path } from 'ramda';

const getState = path(['appReducers']);

// const getLandingPage = type => state => state.landingPage[type];
// const getEntities = type => state => state.entities[type];

// export const checkCreateVersionInProgress = getLandingPage('isCreatingVersion');
// export const appGetProjectStatus = state => {
//     return getEntities('projectInfo')(state).statusDefinitions;
// };
export const getWorkFlowList = state => getState(state).workFlowList;

export const getEditingWorkFlowItem = state => getState(state).editingWorkFlowItem;
