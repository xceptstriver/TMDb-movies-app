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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [watchListState, setWatchListState] = React.useState([]);
  const [favouritesState, setFavouritesState] = React.useState([]);

  const handleAddWatchList = (movieId) => {
    setWatchListState((state) => {
      return [...state, movieId];
    });
  };

  const handleAddFavourites = (movieId) => {
    setFavouritesState((state) => {
      return [...state, movieId];
    });
  };

  const handleRemoveWatchList = (movieId) => {
    setWatchListState((state) => state.filter((item) => item !== movieId));
  };

  const handleRemoveFavourites = (movieId) => {
    setFavouritesState((state) => state.filter((item) => item !== movieId));
  };
  //storing watchList and favourites data locally
  const saveWatchListAndFavouriteStateData = async () => {
    try {
      const jsonValue = JSON.stringify({
        watchListState: await watchListState,
        favouritesState: await favouritesState,
      });
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
      console.log('storing data doesnt work', e);
    }
  };
  //reading watchlist and favourites data
  const readWatchListAndFavouriteStateData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const tasksObj =
        jsonValue != null
          ? JSON.parse(jsonValue)
          : console.log('watchlist and favourites are empty');
      setWatchListState(tasksObj.watchListState);
      setFavouritesState(tasksObj.favouritesState);
      // console.log('loaded stored data successfully');
    } catch (e) {
      // error reading value
      console.log('loading stored data doesnt work');
    }
  };

  React.useEffect(() => {
    saveWatchListAndFavouriteStateData();
  }, [watchListState, favouritesState]);

  React.useEffect(() => {
    readWatchListAndFavouriteStateData();
  }, []);

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

  // storing theme preference
  const onSetTheme = async (isDark) => {
    try {
      setIsDarkMode(isDark);
      const val = isDark.toString();
      await AsyncStorage.setItem('@isDarkMode', val);
    } catch (e) {
      console.log('storing theme doesnt work', e);
    }
  };
  // loading stored theme preference
  const getStoredDarkThemeData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isDarkMode');
      if (value !== null) {
        // value previously stored
        const isTrueSet = value === 'true';
        setIsDarkMode(isTrueSet);
      }
    } catch (e) {
      // error reading value
      console.log('loading stored theme doesnt work', e);
    }
  };
  React.useEffect(() => {
    SplashScreen.hide();
    fetchMovies(setMoviesState, 'trending');
    fetchMovies(setMoviesState, 'upcoming');
    fetchMovies(setMoviesState, 'popular');
    fetchMovies(setMoviesState, 'topRated');

    //async storage
    getStoredDarkThemeData();
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
        handleAddWatchList={handleAddWatchList}
        handleAddFavourites={handleAddFavourites}
        handleRemoveWatchList={handleRemoveWatchList}
        handleRemoveFavourites={handleRemoveFavourites}
        watchListState={watchListState}
        favouritesState={favouritesState}
        onSetTheme={onSetTheme}
      />
    </NavigationContainer>
  );
};

export default App;
