import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

const KnitCountDestructiveButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {props.label}
          </Text>
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
    paddingTop: Platform.OS === "ios" ? 16 : 10, // lame...
    paddingBottom: 10,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: 'rgba(255, 59, 48, 1.0)'
  },
  buttonText: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    textTransform: "uppercase",
    color: "#FDFDFD"
  }
});

export default KnitCountDestructiveButton;
