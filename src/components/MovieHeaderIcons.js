import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieHeaderIcons = (props) => {
  const {
    movieId,
    movieTitle,
    handleAddWatchList,
    handleRemoveWatchList,
    watchListState,
  } = props;

  const [isWatchListed, setIsWatchListed] = React.useState(false);

  const handleWatchListMovie = () => {
    let findFlag = false;

    watchListState.forEach((item) => {
      if (item == movieId) {
        handleRemoveWatchList(movieId);
        findFlag = true;
        return;
      }
    });

    if (!findFlag) {
      handleAddWatchList(movieId);
    }
  };

  React.useEffect(() => {
    watchListState.forEach((item) => {
      if (item === movieId) {
        setIsWatchListed(true);
      }
    });
  }, []);

  return (
    <View style={styles.iconsWrapper}>
      <Ionicons
        name={isWatchListed ? 'bookmark' : 'bookmark-outline'}
        style={{...styles.icon}}
        color={isWatchListed ? '#9470ff' : 'gray'}
        size={26}
        onPress={() => {
          setIsWatchListed(!isWatchListed);
          handleWatchListMovie();
        }}
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
