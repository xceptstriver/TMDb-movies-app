import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieHeaderIcons = () => {
  return (
    <View style={styles.iconsWrapper}>
      <Ionicons
        name={'bookmark-outline'}
        style={{...styles.icon}}
        color={'gray'}
        size={26}
      />
      <Ionicons
        name={'heart-outline'}
        style={{...styles.icon}}
        color={'gray'}
        size={28}
      />
      <Ionicons
        name={'share-social-outline'}
        style={{...styles.icon}}
        color={'gray'}
        size={28}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    marginHorizontal: 5,
  },
});

export default MovieHeaderIcons;
