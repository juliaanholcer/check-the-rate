import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import TimeForm from './TimeForm.cmp';
import { selectCurrentTable } from '../../../Store/Ducks/Main/main.duck';
import { selectIsFetching, selectFormValues } from '../../../Store/Ducks/Time/time.duck';

const mapStateToProps = state => ({
    currentTable: selectCurrentTable(state),
    isFetching: selectIsFetching(state),
    initialValues: selectFormValues(state),
});

const validate = values => {
    const errors = {};
    if (!values.currencyCode) {
      errors.currencyCode = 'Required';
    }
    if (!values.startDate) {
      errors.startDate = 'Required';
    } else if (moment(values.startDate) > moment(values.endDate)) {
      errors.startDate = `Starting date must be before ${moment(values.endDate).format('YYYY-MM-DD')}`;
      errors.endDate = `Ending date must be after ${moment(values.startDate).format('YYYY-MM-DD')}`;
    } else if (moment(values.endDate) >  moment(new Date())) {
      errors.endDate = 'Ending day can not be later than today';
    }
    if (!values.endDate) {
      errors.endDate = 'Required';
    } else if (moment(values.endDate) - moment(values.startDate) > moment.duration(367, 'days')) {
      errors.endDate = 'You can fetch rates only for 367 days';
    }
    return errors;
  }
  
export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'time',
        validate: validate,
    })
)(TimeForm);
