import React from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KnitCountAddButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;
  const addIconName = Platform.OS === "android" ? "md-add" : "ios-add";

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.mainColor}]}>
          <Ionicons name={addIconName} size={60} color={props.mainTextColor} />
        </View>
      </ButtonComponent>
    </View>
  );
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
    paddingVertical: 12,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default KnitCountAddButton;
