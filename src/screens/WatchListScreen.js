import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';

const WatchListScreen = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;
  return (
    <>
      <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
        WatchListScreen
      </Text>
    </>
  );
};
export default WatchListScreen;
