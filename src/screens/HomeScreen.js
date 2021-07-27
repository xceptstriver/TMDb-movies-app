import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode, navigation} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('About');
        }}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
          HomeScreen
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default HomeScreen;
