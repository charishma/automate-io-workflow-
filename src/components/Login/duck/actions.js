import { createAction } from 'redux-actions';


const PREFIX = 'LOGIN';

/**
 * Login click 
 */
export const login = createAction(`${PREFIX}/LOGIN`);