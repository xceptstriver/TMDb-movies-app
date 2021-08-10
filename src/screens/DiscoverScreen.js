import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GenreView from '../components/GenreView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DiscoverScreen = (props) => {
  const {bkgStyle, isDarkMode, navigation} = props;
  const [isDiscover, setIsDiscover] = React.useState(false);
  const genresList = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'TV Movie',
    'War',
    'Western',
  ];

  const [genresSelected, setGenresSelected] = React.useState({
    Action: false,
    Adventure: false,
    Animation: false,
    Comedy: false,
    Crime: false,
    Documentary: false,
    Drama: false,
    Family: false,
    Fantasy: false,
    History: false,
    Horror: false,
    Music: false,
    Mystery: false,
    Romance: false,
    'Science Fiction': false,
    Thriller: false,
    'TV Movie': false,
    War: false,
    Western: false,
  });

  const handleSelectGenre = (genre, isSelected) => {
    if (isSelected) {
      setGenresSelected((state) => {
        return {...state, [genre]: true};
      });
    } else {
      setGenresSelected((state) => {
        return {...state, [genre]: false};
      });
    }
  };

  let genreIds = '';

  const getGenreIds = () => {
    for (const genre in genresSelected) {
      if (genresSelected[[genre]]) {
        switch (genre) {
          case 'Action':
            genreIds += ',28';
            break;
          case 'Adventure':
            genreIds += ',12';
            break;
          case 'Animation':
            genreIds += ',16';
            break;
          case 'Comedy':
            genreIds += ',35';
            break;
          case 'Crime':
            genreIds += ',80';
            break;
          case 'Documentary':
            genreIds += ',99';
            break;
          case 'Drama':
            genreIds += ',18';
            break;
          case 'Family':
            genreIds += ',10751';
            break;
          case 'Fantasy':
            genreIds += ',14';
            break;
          case 'History':
            genreIds += ',36';
            break;
          case 'Horror':
            genreIds += ',27';
            break;
          case 'Music':
            genreIds += ',10402';
            break;
          case 'Mystery':
            genreIds += ',9648';
            break;
          case 'Romance':
            genreIds += ',10749';
            break;
          case 'Science Fiction':
            genreIds += ',878';
            break;
          case 'Thriller':
            genreIds += ',53';
            break;
          case 'TV Movie':
            genreIds += ',10770';
            break;
          case 'War':
            genreIds += ',10752';
            break;
          case 'Western':
            genreIds += ',37';
            break;
          default:
            genreIds += '';
        }
      }
    }
    genreIds = genreIds.slice(1);
  };

  return (
    <View style={{...styles.screen, backgroundColor: bkgStyle.bkgColor}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        style={{width: '90%'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleWrapper}>
          <Ionicons name="search-circle" size={35} color={bkgStyle.txtColor} />
          <Text style={{...styles.title, color: bkgStyle.txtColor}}>
            Discover movies by genre
          </Text>
        </View>
        <View style={styles.genreListWrapper}>
          {genresList.map((item) => {
            return (
              <GenreView
                key={item}
                bkgStyle={bkgStyle}
                isDarkMode={isDarkMode}
                genre={item}
                onSelect={handleSelectGenre}
              />
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setIsDiscover(true);
            getGenreIds();
            navigation.navigate('Search', {genreIds});
          }}>
          <View
            style={{
              ...styles.searchButton,
              backgroundColor: bkgStyle.secBkgColor,
            }}>
            <Ionicons name="search" color={bkgStyle.searchIcon} size={40} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '90%',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Roboto-Medium',
    marginLeft: 10,
  },
  genreListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 10,
  },
  searchButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    // shadow
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
});

export default DiscoverScreen;
