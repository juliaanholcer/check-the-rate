import React from 'react';
import PropTypes from 'prop-types';

const CurrentTableComponent = (props) => (
  <div className="container col-6">
    <h3>Current rates from NBP</h3>
    <table className="table table-striped">
      <thead className="thead-dark">
      <tr>
        <th scope="col">Currency</th>
        <th scope="col">Code</th>
        <th scope="col">Bid</th>
        <th scope="col">Ask</th>
      </tr>
      </thead>
      <tbody>
      {props.currentTable.map(
        currency => (
          <tr key={currency.code + currency.bid + currency.ask}>
            <td>{currency.currency}</td>
            <td>{currency.code}</td>
            <td>{currency.bid}</td>
            <td>{currency.ask}</td>
          </tr>)
      )}
      </tbody>
    </table>
  </div>
);

CurrentTableComponent.propTypes = {
  currentTable: PropTypes.array.isRequired,
}

export default CurrentTableComponent;
