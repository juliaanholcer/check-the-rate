import React from 'react';

import SingleTableComponent from '../../Components/SingleTable/SingleTableComponent';
import TimeForm from './TimeForm/TimeForm.cnt';
import { SpinnerComponent } from '../../Components/SpinnerComponent/SpinnerComponent';

class RatesTimeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.getTimeData(values.currencyCode, values.startDate, values.endDate);
  }
 
  render() {
    return (
      <div className="col-lg-12">
        <h3 className="text-center">Rates in given period</h3>
        <div className="row">
          <div className="col-lg-6">
            <TimeForm onSubmit={this.handleSubmit} />
          </div>
          {
            this.props.singleData.length && !this.props.isFetching
            ? (
            <div className="col-lg-6">
              <SingleTableComponent 
                title={`${this.props.currency} rates from ${this.props.singleData[0].effectiveDate} to ${this.props.singleData[this.props.singleData.length-1].effectiveDate }`} 
                singleData={this.props.singleData} />
            </div>
          ) : (
            this.props.isFetching && <SpinnerComponent />
          )
          }
          { this.props.error && <div className="row alert alert-danger">Error with downloading data</div>}
        </div>
      </div>
    );
  }
}

export default RatesTimeComponent;
