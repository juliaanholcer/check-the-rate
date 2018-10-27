import { connect } from 'react-redux';

import { getSingleData, selectSingleData, selectCurrency, selectIsFetching, selectError } from '../../Store/Ducks/Single/single.duck';
import SingleComponent from './Single.cmp'

const mapStateToProps = state => ({
  singleData: selectSingleData(state),
  currency: selectCurrency(state),
  error: selectError(state),
  isFetching: selectIsFetching(state),
});

export default connect(
  mapStateToProps,
  { getSingleData },
)(SingleComponent);
