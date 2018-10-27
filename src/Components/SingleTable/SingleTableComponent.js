import React from 'react';
import PropTypes from 'prop-types';

const SingleTableComponent = (props) => {
  return (
    <div className="container mt-3 mb-5">
      <table className="table table-striped">
        <thead className="thead-dark">
        <tr>
          <th scope="col" className="text-center" colSpan="3">{props.title}</th>  
        </tr>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Bid</th>
          <th scope="col">Ask</th>
        </tr>
        </thead>
        <tbody>
        {props.singleData.map(
          rate => (
            <tr key={rate.no + rate.bid + rate.ask}>
              <td>{rate.effectiveDate}</td>
              <td>{rate.bid}</td>
              <td>{rate.ask}</td>
            </tr>)
        ).reverse()}
        </tbody>
      </table>
    </div>);
};

SingleTableComponent.propTypes = {
  singleData: PropTypes.array,
  title: PropTypes.string,
}

export default SingleTableComponent;
