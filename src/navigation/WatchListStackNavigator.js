import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WatchListScreen from '../screens/WatchListScreen';

const Stack = createStackNavigator();
const WatchListStackNavigator = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;

  return (
    <Stack.Navigator initialRouteName="WatchList">
      <Stack.Screen
        name="WatchList"
        options={{
          headerShown: false,
        }}
        children={({navigation}) => (
          <WatchListScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default WatchListStackNavigator;
