import configureMockStore from 'redux-mock-store';
import fetchingService from '../../../Services/FetchData.service';
import thunk from 'redux-thunk';
import reducer, {
    initialState,
    saveAllData,
    errorFetchingMain,
    startFetchingMain,
    selectMain,
    selectIsFetching,
    selectCurrentTable,
    selectError,
    getAllData,
    } from './main.duck';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const duck = 'main';
const getActionName = action => `${duck}/${action}`;

describe('Duck ---main', () => {
    describe('>>> Actions', () => {
        it('+++ actionCreator saveAllDAta', () => {
            const data = [{ answerToTheUltimateQuestion: 42 }];
            const action = saveAllData(data);
            const expectedResult = { 
                type: getActionName('GET_ALL_DATA'),
                currentTable: data,
            };
            expect(action).toEqual(expectedResult);
        });
        it('+++ actionCreator startFetchingMain', () => {
            const action = startFetchingMain();
            const expectedResult = { type: getActionName('START_FETCHING_MAIN') };
            expect(action).toEqual(expectedResult);
        });
        it('+++ actionCreator errorFetchingMain', () => {
            const action = errorFetchingMain();
            const expectedResult = { type: getActionName('ERROR_FETCHING_MAIN') };
            expect(action).toEqual(expectedResult);
        });
    });
    
    describe('>>> Reducer', () => {
        it('+++ reducer without no action', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });
        it('+++ reducer for GET_ALL_DATA', () => {
            const action = { 
                type: getActionName('GET_ALL_DATA'),
                currentTable: [{ answerToTheUltimateQuestion: 42 }],
            };
            const expectedState = {
                ...initialState,
                currentTable: [{ answerToTheUltimateQuestion: 42 }],
                isFetching: false,
                error: false,
            };
            const state = reducer(initialState, action);
            expect(state).toEqual(expectedState);
        });
        it(' reducer for ERROR_FETCHING_MAIN', () => {
            const action = { type: getActionName('ERROR_FETCHING_MAIN') };
            const expectedState = {
                ...initialState,
                isFetching: false,
                error: true,
            };
            const state = reducer(initialState, action);
            expect(state).toEqual(expectedState);
        });
        it('', () => {
            const action = { type: getActionName('START_FETCHING_MAIN') };
            const expectedState = {
                ...initialState,
                isFetching: true,
            };
            const state = reducer(initialState, action);
            expect(state).toEqual(expectedState);
        });
    });

    describe('>>> Selectors', () => {
        const store = mockStore({
            main: {
                ...initialState,
            },
        });
        it('+++ selectMain', () => {
            expect(selectMain(store.getState())).toEqual(store.getState().main);
        });
        it('+++ selectCurrentTable', () => {
            expect(selectCurrentTable(store.getState())).toEqual(store.getState().main.currentTable);
        });
        it('+++ selectisFetching', () => {
            expect(selectIsFetching(store.getState())).toEqual(store.getState().main.isFetching);
        });
        it('+++ selectError', () => {
            expect(selectError(store.getState())).toEqual(store.getState().main.error);
        });
    });
    describe('>>> Thunks', () => {
        const store = mockStore({
            main: {
                ...initialState,
            },
        });
        afterEach(() => {
            store.clearActions();
        });
        describe('+++ thunk getAllData', () => {

            const TT = duration => new Promise(resolve => setTimeout(resolve, duration));
            const exec = () => TT(1).then(() => { throw 'Network Err - Manual Handle' });
            
            it('should dispatch errorFetchingMain when request was rejected', async () => {
                spyOn(fetchingService, 'fetchAllData')
                    .and.callFake(() => exec());

                await store.dispatch(getAllData())
                const actions = store.getActions();
                expect(fetchingService.fetchAllData).toHaveBeenCalled();
                expect(actions[0].type).toContain('START_FETCHING_MAIN');
                expect(actions[1].type).toContain('ERROR_FETCHING_MAIN');
            });
            it('should dispatch saveAllData when request status was ok', async () => {
                spyOn(fetchingService, 'fetchAllData')
                    .and.callFake(() => Promise.resolve([{
                            rates: [],
                        },
                    ])
                );

                await store.dispatch(getAllData());
                const actions = store.getActions();
                expect(fetchingService.fetchAllData).toHaveBeenCalled();
                expect(actions[0].type).toContain('START_FETCHING_MAIN');
                expect(actions[1].type).toContain('GET_ALL_DATA');
            });
        });
    });
});
