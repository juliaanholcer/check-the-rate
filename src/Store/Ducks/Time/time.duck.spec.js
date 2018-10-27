import configureMockStore from 'redux-mock-store';
import fetchingService from '../../../Services/FetchData.service';
import thunk from 'redux-thunk';
import reducer, {
    initialState,
    saveTimeSingleData,
    errorFetchingTime,
    startFetchingTime,
    selectTime,
    selectIsFetching,
    selectSingleData,
    selectCurrency,
    selectError,
    getTimeData,
    } from './time.duck';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const duck = 'time';
const getActionName = action => `${duck}/${action}`;

describe('Duck --- time', () => {
    describe('>>> Actions', () => {
        it('+++ actionCreator saveTimeSingleData', () => {
            const payload = {
                rates: [{ answerToTheUltimateQuestion: 42 }], 
                currency: 'Triganic Pu',
            };
            const expectedResult = {
                type: getActionName('GET_TIME_DATA'), 
                singleData: [{ answerToTheUltimateQuestion: 42 }],
                currency: 'Triganic Pu',
            };
        expect(saveTimeSingleData(payload)).toEqual(expectedResult);
        });
        it('+++ actionCreator startFetchingTime', () => {
            const expectedResult = { type: getActionName('START_FETCHING_TIME') };
            expect(startFetchingTime()).toEqual(expectedResult);
        });
        it('+++ actionCreator errorFetchingTime', () => {
            const expectedResult = { type: getActionName('ERROR_FETCHING_TIME') };
            expect(errorFetchingTime()).toEqual(expectedResult);
        });
    });

    describe('>>> Reducer', () => {
        it('+++ reducer with no action', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });
        it('+++ reducer for GET_TIME_DATA', () => {
            const state = {
                ...initialState,
                singleData: [{ answerToTheUltimateQuestion: 42 }],
                currency: 'Triganic Pu',
                isFetching: false,
                error: false, 
            };
            const action = {
                type: getActionName('GET_TIME_DATA'),
                singleData: [{ answerToTheUltimateQuestion: 42 }],
                currency: 'Triganic Pu',
            };
            expect(reducer(initialState, action)).toEqual(state);
        });
        it('+++ reducer for ERROR_FETCHING_TIME', () => {
            const state = {
                ...initialState,
                isFetching: false,
                error: true,
            };
            const action = { type: getActionName('ERROR_FETCHING_TIME') };
            expect(reducer(initialState, action)).toEqual(state);
        });
        it('+++ reducer for START_FETCHING_TIME', () => {
            const state = {
                ...initialState,
                isFetching: true,
            };
            const action = { type: getActionName('START_FETCHING_TIME') };
            expect(reducer(initialState, action)).toEqual(state);
        });
    });

    describe('>>> Selectors', () => {
        const store = mockStore({
            time: {
                ...initialState,
            },
        });
        it('+++ selectTime', () => {
            expect(selectTime(store.getState())).toEqual(store.getState().time);
        });
        it('+++ selectIsFetching', () => {
            expect(selectIsFetching(store.getState())).toEqual(store.getState().time.isFetching);
        });
        it('+++ selectSingleData', () => {
            expect(selectSingleData(store.getState())).toEqual(store.getState().time.singleData);
        });
        it('+++ selectCurency', () => {
            expect(selectCurrency(store.getState())).toEqual(store.getState().time.currency);
        });
        it('+++ selectError', () => {
            expect(selectError(store.getState())).toEqual(store.getState().time.error);
        });
    });
    
    describe('>>> Thunks', () => {
        const store = mockStore({
            time: {
                ...initialState,
            },
        });
        afterEach(() => {
            store.clearActions();
        });
        describe('+++ thunk getTimeData', () => {

            const TT = duration => new Promise(resolve => setTimeout(resolve, duration));
            const trickyExecute = () => TT(1).then(() => { throw 'Error' });

            it('should dispatch errorFetchingTime when request was rejected', async () => {
                spyOn(fetchingService, 'fetchTimeData')
                    .and.callFake(() => trickyExecute());

                await store.dispatch(getTimeData('TPI', new Date(), new Date()))
                const actions = store.getActions();
                expect(actions[0].type).toContain('START_FETCHING_TIME');
                expect(actions[1].type).toContain('ERROR_FETCHING_TIME');
            });
            it('should dispatch saveTimeSingleData when request status was ok', async () => {
                spyOn(fetchingService, 'fetchTimeData')
                    .and.callFake(() => Promise.resolve({
                        "table":"C",
                        "code":"TPI",
                        "rates":[],
                    })
                );
                
                await store.dispatch(getTimeData('TPI', new Date(), new Date()));
                const actions = store.getActions();
                expect(fetchingService.fetchTimeData).toHaveBeenCalled;
                expect(actions[0].type).toContain('START_FETCHING_TIME');
                expect(actions[1].type).toContain('GET_TIME_DATA');
            });
        });
    });
});
