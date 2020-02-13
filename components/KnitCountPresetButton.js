import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from "prop-types";
import {Ionicons} from "@expo/vector-icons";

const KnitCountPresetButton = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.presetCell, {borderColor: props.bgColor}]}>
        <Text style={[styles.cellLabel, {color: props.textColor}]}>
          {props.label}
        </Text>
        <View style={styles.cellIcon}>
          <Ionicons name={"ios-arrow-forward"} size={24} color={props.textColor} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

KnitCountPresetButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired
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

export default KnitCountPresetButton;
