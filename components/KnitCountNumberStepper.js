import React, { useState, useEffect } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import PropTypes from "prop-types";

const KnitCountNumberStepper = (props) => {
  const [value, setValue] = useState(props.value);
  
  return (
    <View>
      <Text style={{color: "red"}}>Hello World</Text>
    </View>
  );
};

KnitCountNumberStepper.propTypes = {
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  stepValue: PropTypes.number.isRequired,
  buttonsTextColor: PropTypes.string.isRequired,
  buttonsBackgroundColor: PropTypes.string.isRequired,
  labelTextColor: PropTypes.string.isRequired,
  labelBackgroundColor: PropTypes.string.isRequired,
  cornerRadius: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  containerSmall: {
    width: 150,
    height: 35
  },
  containerMedium: {
    width: 160,
    height: 40
  },
  containerLarge: {
    width: 170,
    height: 45
  },
  buttonContainer: {
    height: "100%"
  },
  buttonSubContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLabelContainer: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  labelContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  valueStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold"
  },
  valueStyleSmall: {
    fontSize: 14
  },
  valueStyleMedium: {
    fontSize: 16
  },
  valueStyleLarge: {
    fontSize: 18
  }
});

export default KnitCountNumberStepper;