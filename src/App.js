import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import TabsNavigator from './navigation/TabsNavigator';
import {TMDB_API} from './constants/index';

const App = () => {
  //Theme -- coloring

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const bkgStyle = {
    titleColor: isDarkMode ? '#888' : '#6930C3',
    bkgColor: isDarkMode ? '#262626' : '#EBEBEB',
    secBkgColor: isDarkMode ? '#221F3B' : 'white',
    txtColor: isDarkMode ? '#EBEBEB' : '#050505',
    secTxtColor: isDarkMode ? '#EBEBEB' : '#4f4f4f',
    placeholderColor: isDarkMode ? '#888' : '#888',
    searchIcon: isDarkMode ? '#EBEBEB' : '#6930C3',
    cardBlurBkg: isDarkMode
      ? 'rgba(52, 52, 52, 0.7)'
      : 'rgba(152, 152, 152, 0.8)',
    backdropGradient: isDarkMode
      ? ['#26262600', '#262626']
      : ['#EBEBEB00', '#EBEBEB'],
  };
  //-- state handling

  const [moviesState, setMoviesState] = React.useState({
    trending: [],
    upcoming: [],
    popular: [],
    topRated: [],
  });

  //TMDB API
  const fetchMovies = async (setMoviesState, category) => {
    let url;
    switch (category) {
      case 'trending':
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API.API_KEY}`;
        break;
      case 'upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API.API_KEY}&language=en-US&page=1&region=us`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API.API_KEY}&language=en-US&page=1`;
        break;
      case 'topRated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API.API_KEY}&language=en-US&page=1`;
        break;
      default:
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API.API_KEY}`;
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMoviesState((state) => {
          let movies = data.results;
          switch (category) {
            case 'trending':
              return {...state, trending: movies};
            case 'upcoming':
              return {...state, upcoming: movies};
            case 'popular':
              return {...state, popular: movies};
            case 'topRated':
              return {...state, topRated: movies};
            default:
              return {...state};
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    SplashScreen.hide();
    fetchMovies(setMoviesState, 'trending');
    fetchMovies(setMoviesState, 'upcoming');
    fetchMovies(setMoviesState, 'popular');
    fetchMovies(setMoviesState, 'topRated');
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bkgStyle.bkgColor}
      />
      <TabsNavigator
        bkgStyle={bkgStyle}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        moviesState={moviesState}
      />
    </NavigationContainer>
  );
};

export default App;
