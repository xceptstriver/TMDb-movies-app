import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TMDB_API} from '../constants/index';
import MovieCard from './MovieCard';

const CastKnownForMovies = (props) => {
  const {castId, bkgStyle, navigation} = props;
  const [knownForMovies, setKnownForMovies] = React.useState(null);

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API.API_KEY}&with_people=${castId}&sort_by=popularity.desc`;
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setKnownForMovies(data.results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return knownForMovies != null && knownForMovies.length != 0 ? (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={{...styles.title, color: bkgStyle.txtColor}}>
          Known For
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}>
        {knownForMovies ? (
          knownForMovies.map((item) => (
            <MovieCard
              key={item.id}
              movieId={item.id}
              title={item.title}
              rating={item.vote_average}
              poster={item.poster_path}
              bkgStyle={bkgStyle}
              navigation={navigation}
            />
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <ActivityIndicator
              size={'large'}
              color={bkgStyle.titleColor}
              style={{
                borderRadius: 8,
                width: '100%',
              }}
            />
          </View>
        )}
        <View style={styles.paddingRightEnd}></View>
      </ScrollView>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  horizontalScroll: {
    paddingLeft: 10,
    height: 280,
  },
  paddingRightEnd: {
    width: 50,
  },
});
export default CastKnownForMovies;
