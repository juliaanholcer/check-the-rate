import configureMockStore from 'redux-mock-store';
import fetchingService from '../../../Services/FetchData.service';
import thunk from 'redux-thunk';
import reducer, {
    initialState,
    saveSingleData,
    errorFetchingSingle,
    startFetchingSingle,
    selectSingle,
    selectIsFetching,
    selectSingleData,
    selectCurrency,
    selectError,
    getSingleData,
    } from './single.duck';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const duck = 'single';
const getActionName = action => `${duck}/${action}`;

describe('Duck --- single', () => {
    describe('>>> Actions', () => {
        it('+++ actionCreator saveSingleData', () => {
            const payload = {
                rates: [{ answerToTheUltimateQuestion: 42 }], 
                currency: 'Triganic Pu',
            };
            const action = saveSingleData(payload);   
            const expectedResult = {
                type: getActionName('GET_SINGLE_DATA'),
                singleData: [{ answerToTheUltimateQuestion: 42 }],
                currency: 'Triganic Pu',
            }
            expect(action).toEqual(expectedResult);
        });
        it('+++ actionCreator startFetchingSingle', () => {
           const action = startFetchingSingle();
           const expectedResult = { type: getActionName('START_FETCHING_SINGLE') };
           expect(action).toEqual(expectedResult);
        });
        it('+++ actionCreator errorFetchingSingle', () => {
            const action = errorFetchingSingle();
            const expectedResult = { type: getActionName('ERROR_FETCHING_SINGLE') };
            expect(action).toEqual(expectedResult);
        });
    });

    describe('>>> Reducer', () => {
        it('+++ reducer with no action', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });
        it('+++ reducer for GET_SINGLE_DATA', () => {
            const expectedState = {
                ...initialState,
                singleData: [{ answerToTheUltimateQuestion: 42 }],
                currency: 'Triganic Pu',
                isFetching: false,
                error: false,
            };
            const action = {
                type: getActionName('GET_SINGLE_DATA'),
                singleData: [{ answerToTheUltimateQuestion: 42 }], 
                currency: 'Triganic Pu',
            };
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
        it('+++ reducer for START_FETCHING_SINGLE', () => {
           const expectedState = {
               ...initialState,
               isFetching: true,
           };
           const action = { type: getActionName('START_FETCHING_SINGLE') };
           expect(reducer(initialState, action)).toEqual(expectedState);
        });
        it('+++ reducer for EROOR_FETCHING_SINGLE', () => {
            const expectedState = {
                ...initialState,
                error: true,
            };
            const action = { type: getActionName('ERROR_FETCHING_SINGLE') };
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('>>> Selectors', () => {
        const store = mockStore({
            single: {
                ...initialState,
            },
        });
        it('+++ selectSingle', () => {
            expect(selectSingle(store.getState())).toEqual(store.getState().single);
        });
        it('+++ selectisFetching', () => {
            expect(selectIsFetching(store.getState())).toEqual(store.getState().single.isFetching);
        });
        it('+++ selectSingleData', () => {
            expect(selectSingleData(store.getState())).toEqual(store.getState().single.singleData);
        });
        it('+++ selectCurrency', () => {
            expect(selectCurrency(store.getState())).toEqual(store.getState().single.currency);
        });
        it('+++ selectError', () => {
            expect(selectError(store.getState())).toEqual(store.getState().single.error);
        });
    });

    describe('>>> Thunks', () => {
       const store = mockStore({
            single: {
                ...initialState,
            },
        });
        afterEach(() => {
            store.clearActions();
        });
        describe('+++ thunk getSingleData', () => {

            const TT = duration => new Promise(resolve => setTimeout(resolve, duration));
            const exec = () => TT(1).then(() => { throw 'Network Err - Manual Handle' });

            it('should dispatch errorFetchingSingle when request was rejected', async () => {
                spyOn(fetchingService, 'fetchSingleData')
                    .and.callFake(() => exec());

                await store.dispatch(getSingleData('TPI', 42))
                const actions = store.getActions();
                expect(actions[0].type).toContain('START_FETCHING_SINGLE');
                expect(actions[1].type).toContain('ERROR_FETCHING_SINGLE');
            });
            it('should dispatch saveSingleData when request status was ok', async () => {
                spyOn(fetchingService, 'fetchSingleData')
                    .and.callFake(() => Promise.resolve({
                        table: "C",
                        code: "TPI",
                        rates: [],
                        currency: 'Triganic Pu' ,
                    })
                );
                
                await store.dispatch(getSingleData('TPI', 42))
                const actions = store.getActions();
                expect(fetchingService.fetchSingleData).toHaveBeenCalled();
                expect(actions[0].type).toContain('START_FETCHING_SINGLE');
                expect(actions[1].type).toContain('GET_SINGLE_DATA');
            });
        });
    });
})
