import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import PropTypes from "prop-types";

const KnitCountActionButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.bgColor}]}>
          <Text style={[styles.buttonText, {color: props.textColor}]}>
            {props.label}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

KnitCountActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 3
  },
  button: {
    paddingTop: Platform.OS === "ios" ? 16 : 10, // lame...
    paddingBottom: 10,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  buttonText: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    textTransform: "uppercase"
  }
});

export default KnitCountActionButton;
