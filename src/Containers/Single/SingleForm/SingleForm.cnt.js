import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SingleForm from './SingleForm.cmp';
import { selectIsFetching, selectFormValues } from '../../../Store/Ducks/Single/single.duck';
import { selectCurrentTable } from '../../../Store/Ducks/Main/main.duck';

const mapStateToProps = (state) => ({
  isFetching: selectIsFetching(state),
  currentTable: selectCurrentTable(state),
  initialValues: selectFormValues(state),
});

const validate = values => {
  const errors = {};
  const requiredFields = [
    'currencyCode',
    'userRatesNum',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (Number(values.userRatesNum) < 1) {
    errors.userRatesNum = 'Number of rates must be at least 1';
  } else if (Number(values.userRatesNum) > 255) {
    errors.userRatesNum = 'You can fetch only 255 rates in one request';
  }
  return errors;
}

export default compose (
  connect(mapStateToProps),
  reduxForm({
    form: 'single',
    validate: validate,
    enableReinitialize: true,
  })
)(SingleForm);
