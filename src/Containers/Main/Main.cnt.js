import MainComponent from './Main.cmp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectCurrentTable, selectIsFetching, selectError, getAllData } from '../../Store/Ducks/Main/main.duck';

const mapStateToProps = state => ({
    currentTable: selectCurrentTable(state),
    isFetching: selectIsFetching(state),
    error: selectError(state),
  });

export default withRouter(
    connect(
        mapStateToProps, 
        { getAllData },
    )(MainComponent));
