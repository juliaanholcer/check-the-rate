import { connect } from 'react-redux';

import { getTimeData, selectError, selectCurrency, selectIsFetching, selectSingleData } from '../../Store/Ducks/Time/time.duck';
import RatesTimeComponent from './RatesTime.cmp';

const mapStateToProps = state => ({
  singleData: selectSingleData(state),
  currency: selectCurrency(state),
  error: selectError(state),
  isFetching: selectIsFetching(state),
});

export default connect(
  mapStateToProps, 
  { getTimeData },
)(RatesTimeComponent);
