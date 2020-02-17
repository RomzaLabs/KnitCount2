import React from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";

const KnitCountColorButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.circleContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={[styles.circle, {backgroundColor: props.color}]}/>
      </ButtonComponent>
    </View>
  );
};

KnitCountColorButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  circleContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowRadius: 3,
    elevation: 5
  }
});

export default KnitCountColorButton;
