import React from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import {TMDB_API} from '../constants/index';

const WatchListScreen = (props) => {
  const {bkgStyle, navigation, watchListState} = props;

  const [watchListMovies, setWatchListMovies] = React.useState([]);

  const fetchMovies = async (movieId) => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API.API_KEY}&language=en-US`;
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWatchListMovies((state) => [data, ...state]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (
      watchListMovies.length === 0 ||
      watchListMovies.length != watchListState.length
    ) {
      setWatchListMovies([]);
      watchListState.forEach((item) => {
        fetchMovies(item);
      });
      console.log('setWatchListMovies', watchListMovies);
    }
  }, [watchListState]);

  const renderMovieItem = ({item}) => {
    return (
      <MovieCard
        key={item.id}
        movieId={item.id}
        title={item.title}
        rating={item.vote_average}
        poster={item.poster_path}
        bkgStyle={bkgStyle}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      {watchListMovies.length !== 0 ? (
        <View style={styles.flatlistWrapper}>
          <FlatList
            data={watchListMovies}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.flatlistContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text
          style={{
            color: bkgStyle.txtColor,
            fontFamily: 'OpenSans-Regular',
            fontSize: 13,
          }}>
          Your WatchList will be shown here.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingTop: 20,
    paddingBottom: 150,
    justifyContent: 'space-between',
  },
});

export default WatchListScreen;
