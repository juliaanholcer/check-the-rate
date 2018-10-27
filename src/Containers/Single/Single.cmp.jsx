import React from 'react';

import SingleTableComponent from '../../Components/SingleTable/SingleTableComponent';
import SingleForm from './SingleForm/SingleForm.cnt';
import { SpinnerComponent } from '../../Components/SpinnerComponent/SpinnerComponent';

class SingleComponent extends React.Component {
  constructor(props) {
    super(props);   
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.getSingleData(values.currencyCode, values.userRatesNum);
  }
  
  render() {
    return (
      <div className="col-lg-12">
        <h3 className="text-center">Rates for chosen currency</h3>
        <div className="row">  
          <div className="col-lg-4">
            <SingleForm onSubmit={this.handleSubmit} />
          </div>
          {
            !this.props.isFetching && this.props.singleData.length
            ? (
            <div className="col-lg-8">
                <SingleTableComponent 
                singleData={this.props.singleData}
                title={`Last ${this.props.singleData.length} rates for ${this.props.currency}`} />
            </div>
          ) : (
            this.props.isFetching && <SpinnerComponent />
          )
        }
        { this.props.error && <div className="alert alert-danger">Error with downloading data</div>}
        </div>
      </div>
    );
  }
}

export default SingleComponent;
