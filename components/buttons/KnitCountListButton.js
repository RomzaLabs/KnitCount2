import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from "prop-types";
import {Ionicons} from "@expo/vector-icons";
import Sounds from "../../constants/Sounds";

const KnitCountListButton = (props) => {
  const hideRightIcon = props.hideRightIcon ? props.hideRightIcon : false;
  const hideRightSelectionText = !props.rightSelectionText;
  const showIcon = !!props.iconName;
  const rightIconName = props.rightIconName ? props.rightIconName : "ios-arrow-forward";
  const isPlayIcon = rightIconName.endsWith("play-circle");

  const renderRightSelection = () => {
    if (hideRightSelectionText) return undefined;
    const niceText = props.rightSelectionText.charAt(0).toUpperCase() + props.rightSelectionText.slice(1);
    return (
      <View style={styles.rightSelectionTextContainer}>
        <Text style={[styles.rightSelectionText, {color: props.textColor}]} >{niceText}</Text>
      </View>
    );
  };

  const handleIconPress = (rightIconName) => {
    if (rightIconName.endsWith("play-circle")) return props.onPreviewSoundPack();
    return props.onPress();
  };

  const renderRightIcon = () => {
    if (hideRightIcon) return undefined;
    if (props.label.toLowerCase() === Sounds.none && isPlayIcon) return undefined;
    return (
      <View style={styles.rightContainer}>
        {renderRightSelection()}
        <TouchableWithoutFeedback onPress={() => handleIconPress(rightIconName)}>
          <View style={styles.cellIcon}>
            <Ionicons name={rightIconName} size={isPlayIcon ? 50 : 24} color={props.textColor} />
          </View>
        </TouchableWithoutFeedback>
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
      <View style={[styles.presetCell, {borderColor: props.bgColor, height: isPlayIcon ? 60 : 50}]}>
        {renderLabel()}
        {renderRightIcon()}
      </View>
    </TouchableWithoutFeedback>
  );
};

KnitCountListButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  rightIconName: PropTypes.string,
  hideRightIcon: PropTypes.bool,
  rightSelectionText: PropTypes.string,
  onPreviewSoundPack: PropTypes.func
};

const styles = StyleSheet.create({
  presetCell: {
    flexDirection: "row",
    marginLeft: 12,
    borderBottomWidth: 1,
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
    paddingTop: 8
  },
  rightContainer: {
    flexDirection: "row"
  },
  cellIcon: {
    marginRight: 12,
  },
  rightSelectionTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    marginTop: 2
  },
  rightSelectionText: {
    fontFamily: "avenir-roman",
    fontSize: 14
  }
});

export default KnitCountListButton;
