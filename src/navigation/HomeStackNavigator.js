import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();
const HomeStackNavigator = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        children={({navigation}) => (
          <HomeScreen
            bkgStyle={bkgStyle}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            navigation={navigation}
          />
        )}
      />
      <Stack.Screen
        name="About"
        options={{
          title: 'About App',
          headerTintColor: bkgStyle.secTxtColor,
          headerStyle: {
            backgroundColor: bkgStyle.bkgColor,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            color: bkgStyle.secTxtColor,
          },
        }}
        children={() => (
          <AboutScreen bkgStyle={bkgStyle} isDarkMode={isDarkMode} />
        )}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
