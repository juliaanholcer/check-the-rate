import { createSelector } from 'reselect';

import fetchingService from '../../../Services/FetchData.service';
import { selectCurrentTable } from '../../Ducks/Main/main.duck';

const actionTypes = {
    GET_SINGLE_DATA : 'single/GET_SINGLE_DATA',
    ERROR_FETCHING_SINGLE : 'single/ERROR_FETCHING_SINGLE',
    START_FETCHING_SINGLE : 'single/START_FETCHING_SINGLE',
};

export const initialState = {
    singleData: [],
    currency: '',
    isFetching: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SINGLE_DATA:
            return {
                ...state,
                singleData: action.singleData,
                currency: action.currency,
                isFetching: false,
                error: false,
            };
        case actionTypes.ERROR_FETCHING_SINGLE:
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case actionTypes.START_FETCHING_SINGLE:
            return {
                ...state,
                singleData: [],
                isFetching: true,
            };
        default:
            return state;
    }
}

export const saveSingleData = (response) => ({
        type: actionTypes.GET_SINGLE_DATA,
        singleData: response.rates,
        currency: response.currency,
    });
export const startFetchingSingle = () => ({ type: actionTypes.START_FETCHING_SINGLE });
export const errorFetchingSingle = () => ({ type: actionTypes.ERROR_FETCHING_SINGLE });

export const selectSingle = state => state.single;
export const selectIsFetching = createSelector(selectSingle, ({ isFetching }) => isFetching);
export const selectSingleData = createSelector(selectSingle, ({ singleData }) => singleData);
export const selectCurrency = createSelector(selectSingle, ({ currency }) => currency);
export const selectError = createSelector(selectSingle, ({ error }) => error);
export const selectFormValues = state => {
    const currentTable = selectCurrentTable(state);
    const initialValues = {
        currencyCode: currentTable.length ? currentTable[0].code : null,
        userRatesNum: 1,
    };
    return initialValues;
};

export const getSingleData = (currencyCode, ratesNumber) => dispatch => {
        dispatch(startFetchingSingle());
        return fetchingService.fetchSingleData(currencyCode, ratesNumber)
          .then(response => {
            dispatch(saveSingleData(response));
          })
          .catch(err => {
              dispatch(errorFetchingSingle());
          });
        };


export default reducer;
