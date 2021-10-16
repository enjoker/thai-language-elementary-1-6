import React, { useEffect } from 'react';
import Navigator from './src/navigation/mainNavigator';
import RNBootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore.js';

const App = () => {
   useEffect(() => {
      setTimeout(() => {
         RNBootSplash.hide()
      }, 2000)
   }, [])
   return (
      <Provider store={configureStore}>
         <Navigator />
      </Provider>
   );
};

export default App;
