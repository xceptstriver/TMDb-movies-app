import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';

const SearchScreen = (props) => {
  const {bkgStyle, isDarkMode, setIsDarkMode} = props;
  return (
    <>
      <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
        SearchScreen
      </Text>
    </>
  );
};
export default SearchScreen;
