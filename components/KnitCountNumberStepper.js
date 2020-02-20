import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from "prop-types";

const KnitCountNumberStepper = (props) => {
  const [value, setValue] = useState(props.value);
  let {
    minValue,
    maxValue,
    stepValue,
    buttonsTextColor,
    buttonsBackgroundColor,
    labelTextColor,
    labelBackgroundColor,
    cornerRadius,
    onChange
  } = props;

  const renderButton = ({ flex, label, onPress }) => {
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
            }
          ]
        }
      >
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
          <View style={[styles.buttonSubContainer]}>
            <Text
              style={[styles.buttonLabelContainer, { color: buttonsTextColor }]}
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
    return renderButton({
      flex: 'left',
      label: '−',
      onPress: () => {
        let newValue = value - stepValue;
        if (newValue < minValue) newValue = value;
        setValue(newValue);
        onChange(newValue);
      }
    });
  };

  const renderRightButton = () => {
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

  const renderLabelContainer = () => {
    return (
      <View style={[styles.labelContainer, { backgroundColor: labelBackgroundColor }]}>
        <Text
          style={[styles.valueStyle, { color: labelTextColor }]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {value.toString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { borderRadius: cornerRadius, borderColor: labelTextColor }]} >
      {renderLeftButton()}
      {renderLabelContainer()}
      {renderRightButton()}
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
    justifyContent: "space-between",
    width: 200,
    height: 50,
    borderWidth: 1
  },
  buttonContainer: {
    height: "100%",
    width: 50
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
    fontFamily: "avenir-black",
    marginTop: 6
  },
  labelContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  valueStyle: {
    marginTop: 6,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontFamily: "avenir-black"
  }
});

export default KnitCountNumberStepper;