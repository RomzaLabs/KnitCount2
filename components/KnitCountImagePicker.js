import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";

const KnitCountImagePicker = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;
  const addIconName = Platform.OS === "android" ? "md-camera" : "ios-camera";

  return (
    <View style={[styles.buttonContainer, {borderColor: props.mainTextColor}]}>
      <ButtonComponent onPress={props.onPress} >
        <View style={[styles.button, {backgroundColor: props.mainColor}]}>
          <Ionicons name={addIconName} size={60} color={props.mainTextColor} />
        </View>
      </ButtonComponent>
    </View>
  );
};

KnitCountImagePicker.propTypes = {
  mainColor: PropTypes.string.isRequired,
  mainTextColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 3,
    borderWidth: 2
  },
  button: {
    paddingVertical: 12,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});

export default KnitCountImagePicker;
