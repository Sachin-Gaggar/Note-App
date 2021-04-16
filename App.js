import React from 'react';
import Home from './src/screens/Home';
import AddModal from './src/components/AddModal';
import { Provider } from 'react-redux';
import store from './src/services/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
