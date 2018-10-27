import React from 'react';
import  { Field } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui';
import PropTypes from 'prop-types';

const UserForm = (props) => {
  const { handleSubmit, pristine, invalid, reset, submitting } = props;
  return (
      <form onSubmit={handleSubmit}>
        <div className="form-row mb-3">
          <Field
            name="currencyCode"
            component={SelectField}
            hintText="Choose a currency"
            floatingLabelText="Choose a currency"
            required>
            {props.currentTable.map(
              rate => <MenuItem key={rate.code + rate.bid + rate.ask} value={rate.code} primaryText={`${rate.currency} (${rate.code})`} />
            )}
          </Field>
        </div>
        <div className="form-row mb-3">
          <Field
            name="userRatesNum"
            component={TextField}
            type="number"
            hintText="Last rates number"
            floatingLabelText="Last rates number"
            required
            min="1"
            max="255"
          />
        </div>
        <div className="form-row mb-1">
          <FlatButton label="Fetch" primary={true} disabled={props.isFetching || invalid || submitting} type="submit" />
          <FlatButton label="Clear" secondary={true} disabled={props.isFetching || pristine || submitting} type="button" onClick={reset} />
        </div>
      </form>
  );
};

UserForm.propTypes = {
  isFetching: PropTypes.bool,
  currentTable: PropTypes.array,
  handleSubmit: PropTypes.func,
}

export default UserForm;
