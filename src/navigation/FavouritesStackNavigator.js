import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const FavouritesStackNavigator = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;

  return (
    <Stack.Navigator initialRouteName="Favourites">
      <Stack.Screen
        name="Favourites"
        options={{
          headerShown: false,
        }}
        children={({navigation}) => (
          <FavouritesScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default FavouritesStackNavigator;
