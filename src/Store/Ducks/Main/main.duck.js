import fetchingService from '../../../Services/FetchData.service';
import { createSelector } from 'reselect';

const actionTypes = {
    GET_ALL_DATA : 'main/GET_ALL_DATA',
    ERROR_FETCHING_MAIN : 'main/ERROR_FETCHING_MAIN',
    START_FETCHING_MAIN : 'main/START_FETCHING_MAIN',
}
export const initialState = {
    currentTable: [],
    isFetching: false,
    error: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DATA:
            return {
                ...state,
                currentTable: action.currentTable,
                isFetching: false,
                error: false,
            };
        case actionTypes.ERROR_FETCHING_MAIN:
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        case actionTypes.START_FETCHING_MAIN:
            return {
                ...state,
                currentTable: [],
                isFetching: true,
            };
        default:
            return state;
    }
}

export const saveAllData = (currentTable) => ({ type: actionTypes.GET_ALL_DATA, currentTable });
export const startFetchingMain = () => ({ type: actionTypes.START_FETCHING_MAIN });
export const errorFetchingMain = () => ({ type: actionTypes.ERROR_FETCHING_MAIN });

export const selectMain = state => state.main;
export const selectCurrentTable = createSelector(selectMain, ({ currentTable }) => currentTable);
export const selectIsFetching = createSelector(selectMain, ({ isFetching }) => isFetching);
export const selectError = createSelector(selectMain, ({ error }) => error);

export const getAllData = () => dispatch => {
        dispatch(startFetchingMain());
        return fetchingService.fetchAllData()
            .then(response => {
                dispatch(saveAllData(response[0].rates));
            })
            .catch(err => {
                dispatch(errorFetchingMain());
        });
    };

export default reducer;
