import React from 'react';
import {Image, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";

const KnitCountImageButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.photosItem}>
      <ButtonComponent onPress={props.onPress}>
        <Image style={styles.image} source={{uri: props.image.imageUri}} />
      </ButtonComponent>
    </View>
  );
};

KnitCountImageButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.object
};

const styles = StyleSheet.create({
  photosItem: {
    width: 160,
    height: 90,
    marginHorizontal: 6
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    resizeMode: "center"
  }
});

export default KnitCountImageButton;
