import { combineReducers } from 'redux';
import mainReducer  from './Main/main.duck';
import singleReducer from './Single/single.duck';
import timeReducer from './Time/time.duck';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    main: mainReducer,
    single: singleReducer,
    time: timeReducer,
    form: formReducer,
});

export default rootReducer;
