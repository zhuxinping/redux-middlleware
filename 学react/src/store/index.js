import {createStore,applyMiddleware} from 'redux';
import reducer from './reducers/index';

import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

export default createStore(reducer,applyMiddleware(reduxThunk,reduxLogger)) ;