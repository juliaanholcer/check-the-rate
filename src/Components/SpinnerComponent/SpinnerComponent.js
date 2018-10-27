import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

import './SpinnerComponent.css';

const SpinnerComponent = () => (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin size="lg" /> Loading...
    </div>
);

const SpinnerPanelComponent = () => (
  <div className="spinner">
    <SpinnerComponent />
  </div>
)

export {SpinnerComponent, SpinnerPanelComponent};
