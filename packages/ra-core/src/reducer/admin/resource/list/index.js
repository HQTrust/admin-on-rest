import { combineReducers } from 'redux';
import ids from './ids';
import params from './params';
import selectedIds from './selectedIds';
import total from './total';
import totalAll from './totalAll';
import relatedToCounts from './relatedToCounts';

export default resource =>
    combineReducers({
        ids: ids(resource),
        params: params(resource),
        selectedIds,
        total: total(resource),
        totalAll: totalAll(resource),
        relatedToCounts: relatedToCounts(resource),
    });
