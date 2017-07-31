/**
 * Created by serj on 7/26/17.
 */
import {combineReducers} from 'redux';
import newsReducer from './../reducers/newsReducer'


const rootReducer = combineReducers({
    news:newsReducer,
});

export default rootReducer;
