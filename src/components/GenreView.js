import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
const GenreView = (props) => {
  const {bkgStyle, isDarkMode, genre, onSelect} = props;
  const [isSelected, setIsSelected] = React.useState(false);

  const color = {
    bkgColor: isSelected
      ? isDarkMode
        ? '#EBEBEB'
        : '#6930C3'
      : bkgStyle.bkgColor,
    txtColor: isSelected
      ? isDarkMode
        ? '#050505'
        : '#EBEBEB'
      : bkgStyle.txtColor,
    borderColor: isSelected
      ? isDarkMode
        ? '#EBEBEB'
        : '#6930C3'
      : bkgStyle.txtColor,
  };

  React.useEffect(() => {
    onSelect(genre, isSelected);
  }, [isSelected]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setIsSelected(!isSelected);
      }}
      style={{
        ...styles.genreWrapper,
        borderColor: color.borderColor,
        backgroundColor: color.bkgColor,
      }}>
      <Text
        style={{
          ...styles.genreTxt,
          color: color.txtColor,
        }}>
        {genre === 'Science_Fiction'
          ? 'Science Fiction'
          : genre === 'TV_Movie'
          ? 'TV Movie'
          : genre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genreWrapper: {
    alignSelf: 'center', // similar to inline-block
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  genreTxt: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});

export default GenreView;
