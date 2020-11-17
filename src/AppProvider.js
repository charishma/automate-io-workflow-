
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
