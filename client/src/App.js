import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HistoryCheckinPage from './pages/HistoryCheckinPage/HistoryCheckinPage';
import MenuInterface from './components/Layout/Menu/MenuInterface';
import QRCodeScannerPage from './pages/QRCodeScannerPage/QRCodeScannerPage';
import ListUserPage from './pages/ListUserPage/ListUserPage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MenuInterface />
        <Switch>
          <Route path="/qr-scanner" exact component={QRCodeScannerPage} />
          <Route path='/history-checkin' exact component={HistoryCheckinPage} />
          <Route path="/list-user" exact component={ListUserPage} />
          <Route path="/" exact component={() => <Redirect to="/qr-scanner" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
