import React, { useState, useEffect } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import PropTypes from "prop-types";

const KnitCountNumberStepper = (props) => {
  const [value, setValue] = useState(props.value);

  const renderButton = ({ flex, label, onPress }) => {
    let { buttonsBackgroundColor, cornerRadius, buttonsTextColor, buttonsContainerWidth } = props;
    return (
      <View
        style={
          [
            styles.buttonContainer,
            {
              backgroundColor: buttonsBackgroundColor,
              borderTopRightRadius: flex === "right" ? cornerRadius : 0,
              borderTopLeftRadius: flex === "left" ? cornerRadius : 0,
              borderBottomRightRadius: flex === "right" ? cornerRadius : 0,
              borderBottomLeftRadius: flex === "left" ? cornerRadius : 0,
              width: buttonsContainerWidth
            }
            ]
        }
      >
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
          <View style={[styles.buttonSubContainer]}>
            <Text
              style={[styles.buttonLabelContainer, { color: buttonsTextColor }]}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLeftButton = () => {
    let { stepValue, minValue, maxValue, onChange } = props;
    return renderButton({
      flex: 'left',
      label: '-',
      onPress: () => {
        let newValue = value - stepValue;
        if (newValue < minValue) newValue = value;
        setValue(newValue);
        onChange(newValue);
      }
    });
  };

  const renderRightButton = () => {
    let { stepValue, minValue, maxValue, onChange } = props;
    return renderButton({
      flex: 'right',
      label: '+',
      onPress: () => {
        let newValue = value + stepValue;
        if (newValue > maxValue) newValue = value;
        setValue(newValue);
        onChange(newValue);
      }
    });
  };

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