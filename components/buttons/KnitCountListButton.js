import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from "prop-types";
import {Ionicons} from "@expo/vector-icons";

const KnitCountListButton = (props) => {
  const hideChevron = props.hideChevron ? props.hideChevron : false;
  const showIcon = !!props.iconName;

  const renderChevron = () => {
    if (hideChevron) return undefined;
    return (
      <View style={styles.cellIcon}>
        <Ionicons name={"ios-arrow-forward"} size={24} color={props.textColor} />
      </View>
    );
  };

  const renderIcon = () => {
    if (!showIcon) return undefined;
    return (
      <View style={styles.cellIcon}>
        <Ionicons name={props.iconName} size={24} color={props.textColor} />
      </View>
    );
  };

  const renderLabel = () => {
    return (
      <View style={styles.labelContainer}>
        {renderIcon()}
        <Text style={[styles.cellLabel, {color: props.textColor}]}>
          {props.label}
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.presetCell, {borderColor: props.bgColor}]}>
        {renderLabel()}
        {renderChevron()}
      </View>
    </TouchableWithoutFeedback>
  );
};

KnitCountListButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  hideChevron: PropTypes.bool,
  iconName: PropTypes.string
};

const styles = StyleSheet.create({
  presetCell: {
    flexDirection: "row",
    marginLeft: 12,
    borderBottomWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between"
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cellLabel: {
    fontFamily: "avenir-roman",
    fontSize: 18,
    paddingTop: 8,
    textTransform: "capitalize"
  },
  cellIcon: {
    marginRight: 12
  }
});

export default KnitCountListButton;
