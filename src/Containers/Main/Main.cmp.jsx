import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import CurrentTableComponent from './CurrentTableComponent/CurrentTableComponent';
import SingleComponent from '../Single/Single.ctn';
import RatesTimeComponent from '../RatesTime/RatesTime.cnt';
import { SpinnerPanelComponent } from '../../Components/SpinnerComponent/SpinnerComponent';

class MainComponent extends React.Component {
  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    return (
      <div className="container mt-5 mb-5">
      {
        this.props.error
        ? <div className="alert alert-danger">Error while downloading data</div>
        : (this.props.isFetching 
          ? <SpinnerPanelComponent /> 
          : (<div>
              <Switch>
                <Route exact path="/" render={() => <CurrentTableComponent currentTable={this.props.currentTable} />} />
                <Route path="/single" component={SingleComponent} />
                <Route path="/time" component={RatesTimeComponent} />
                <Redirect to="/" />
              </Switch>
            </div>)
        )}
      </div>
    );
  }
}

export default MainComponent;
