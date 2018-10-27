import { createSelector } from 'reselect';

import fetchingService from '../../../Services/FetchData.service';
import { selectCurrentTable } from '../../Ducks/Main/main.duck';

const actionTypes = {
    GET_TIME_DATA : 'time/GET_TIME_DATA',
    ERROR_FETCHING_TIME : 'time/ERROR_FETCHING_TIME',
    START_FETCHING_TIME : 'time/START_FETCHING_TIME',
};

export const initialState = {
    singleData: [],
    currency: '',
    isFetching: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TIME_DATA:
            return {
                ...state,
                singleData: action.singleData,
                currency: action.currency,
                isFetching: false,
                error: false,
            };
        case actionTypes.ERROR_FETCHING_TIME:
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case actionTypes.START_FETCHING_TIME:
            return {
                ...state,
                singleData: [],
                isFetching: true,
            };
        default:
            return state;
    }
}

export const saveTimeSingleData = (response) => ({
        type: actionTypes.GET_TIME_DATA,
        singleData: response.rates,
        currency: response.currency,
});
export const startFetchingTime = () => ({ type: actionTypes.START_FETCHING_TIME });
export const errorFetchingTime = () => ({ type: actionTypes.ERROR_FETCHING_TIME });

export const selectTime = state => state.time;
export const selectIsFetching = createSelector(selectTime, ({ isFetching }) => isFetching);
export const selectSingleData = createSelector(selectTime, ({ singleData }) => singleData);
export const selectCurrency = createSelector(selectTime, ({ currency }) => currency);
export const selectError = createSelector(selectTime, ({ error }) => error);
export const selectFormValues = state => {
    const currentTable = selectCurrentTable(state);
    const initialValues = {
        currencyCode: currentTable.length ? currentTable[0].code : null,
        startDate: new Date(),
        endDate: new Date(),
    };
    return initialValues;
};

export const getTimeData = (currencyCode, startDate, endDate) => dispatch => {
        dispatch(startFetchingTime());
        return fetchingService.fetchTimeData(currencyCode, startDate, endDate)
          .then(response => {
            dispatch(saveTimeSingleData(response));
          })
          .catch(err => {
              dispatch(errorFetchingTime());
          });
        };

export default reducer;
