import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const MovieCarousel = (props) => {
  const {movies, bkgStyle, isDarkMode, navigation} = props;
  let topMovies = movies.slice(0, 5);
  const getPosterPath = (poster) => `https://image.tmdb.org/t/p/w500/${poster}`;

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  const carouselItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('Movie', {movieId: item.id});
        }}>
        <Image
          source={{
            uri: getPosterPath(item.backdrop_path),
          }}
          style={styles.image}
          placeholderStyle={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  if (topMovies && topMovies.length) {
    return (
      <View>
        <FlatList
          data={topMovies}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={carouselItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
        <View style={styles.dotView}>
          {topMovies && topMovies.length > 1
            ? topMovies.map((item, i) => {
                let opacity = position.interpolate({
                  inputRange: [i - 2, i - 1, i, i + 1, i + 2],
                  outputRange: [0.4, 0.4, 1, 0.4, 0.4],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View
                    key={i}
                    style={{
                      opacity,
                      height: 10,
                      width: 10,
                      backgroundColor: '#595959',
                      margin: 8,
                      borderRadius: 5,
                    }}
                  />
                );
              })
            : null}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 3,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 5,
    margin: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MovieCarousel;
