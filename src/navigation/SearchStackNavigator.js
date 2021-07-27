import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();
const SearchStackNavigator = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;

  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={{
          headerShown: false,
        }}
        children={({navigation}) => (
          <SearchScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
