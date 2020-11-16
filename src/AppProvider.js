/*
 * IBM Confidential
 * OCO Source Materials
 * 5737-I23
 * Copyright IBM Corp. 2018 - 2020
 * The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S Copyright Office.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
//import { ToastProvider } from 'src/common/components/notification/Toast';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const AppProvider = ({children, store}) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={store.history}>
                {/* <ToastProvider> */}
                        <DndProvider backend={HTML5Backend}>
                            {children}
                        </DndProvider>
                {/* </ToastProvider> */}
            </ConnectedRouter>
        </Provider>
    );
};
AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
};

export default AppProvider;
