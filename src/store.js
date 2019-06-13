import  { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const logMiddleware = (store) => (next) => (action) => {
    console.log(action.type);
    return next(action);
};


const store = createStore(reducer, applyMiddleware(thunkMiddleware, logMiddleware));



const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout);
};
store.dispatch(delayedActionCreator(3000));

export default store;