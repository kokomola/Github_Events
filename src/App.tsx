import React from 'react';
import RootStackNavigator from './navigation/RootStackNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}
