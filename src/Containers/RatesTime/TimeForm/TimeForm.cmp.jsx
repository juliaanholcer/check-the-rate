import React from 'react';
import  { Field } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {
  DatePicker,
  SelectField,
} from 'redux-form-material-ui';
import PropTypes from 'prop-types';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

const UserForm = (props) => {
  const { handleSubmit, pristine, invalid, reset, submitting } = props;
  return (
      <form onSubmit={handleSubmit}>
        <div className="form-row col-12 mb-1">
        <div className="col-md-6">
          <Field
            name="currencyCode"
            hint="Choose a currency"
            floatingLabelText="Choose a currency"
            component={SelectField}
            required>
            <MenuItem key="__ksjdhfj" value={null} />
            {props.currentTable.map(
              rate => <MenuItem key={rate.code + rate.bid + rate.ask} value={rate.code} primaryText={`${rate.currency} (${rate.code})`} />
            )}
          </Field>
          </div>
        </div>
        <div className="form-row col-12 mb-1">  
          <div className="col-md-6">
          <Field
              component={DatePicker}
              mode="landscape"
              hintText="From:"
              floatingLabelText="From:"
              container="inline"
              name="startDate"
              autoOk={true}
              shouldDisableDate={disableWeekends}
              />
          </div>
          <div className="col-md-6"> 
            <Field
              component={DatePicker}
              mode="landscape"
              autoOk={true}
              container="inline"
              hintText="To:"
              floatingLabelText="To:"
              name="endDate"
              shouldDisableDate={disableWeekends}
              />
          </div>
        </div>
          <FlatButton disabled={props.isFetching || invalid || submitting } type="submit" label="Fetch" primary={true} />
          <FlatButton disabled={props.isFetching || pristine || submitting} type="button" onClick={reset} label="Clear" secondary={true} />
      </form>
  );
};

UserForm.propTypes = {
  isFetching: PropTypes.bool,
  currentTable: PropTypes.array,
  handleSubmit: PropTypes.func,
}

export default UserForm;
