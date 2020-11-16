import React from 'react';
import { Route } from 'react-router-dom';
import store from './store';
import MainLayout from './components/Layout/MainLayout';
import AppProvider from './AppProvider';
import {PageRoutes} from './components/Constants/constants';
import LoginPane from './components/Login/LoginPane';
import WorkFlowListPane from './components/WorkFlow/WorkFlowListPane';
import TaskPane from './components/TaskPane/TaskPane';
function App() {
  return (
      <AppProvider store={store}>
          <MainLayout>
              <Route exact path={PageRoutes.login}>
                  <LoginPane /> 
              </Route>
              <Route exact path={PageRoutes.workflow}>
                  <WorkFlowListPane/>
              </Route>
              <Route exact path={PageRoutes.taskflow}>
                  <TaskPane/>
              </Route>
              </MainLayout>
              {/* <ServiceErrorNotification/> */}
              </AppProvider>
  );
}

export default App;
