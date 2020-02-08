import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const MAX_ZEROES = 5;

const KnitCountCounterButton = (props) => {
  const digitsForCount = (count) => count.toString().length;
  const leadingZeroes = (count) => "0".repeat(MAX_ZEROES - digitsForCount(count));

  const onSingleTapEvent = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.END) {
      props.onCountValueChange();
    }
  };

  return (
    <TapGestureHandler numberOfTaps={1} onHandlerStateChange={onSingleTapEvent}>
      <View style={[styles.countButton, {borderColor: props.mainTextColor, backgroundColor: props.mainColor}]}>
        <Text style={styles.countLabel}>
          <Text style={{color: props.mainBGColor}}>{leadingZeroes(props.count)}</Text>
          <Text style={{color: props.mainTextColor}}>{props.count}</Text>
        </Text>
      </View>
    </TapGestureHandler>
  );
};

KnitCountCounterButton.propTypes = {
  mainTextColor: PropTypes.string.isRequired,
  mainColor: PropTypes.string.isRequired,
  mainBGColor: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onCountValueChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  countButton: {
    width: Dimensions.get('window').width * 0.33,
    aspectRatio: 1,
    borderRadius: Math.round(Dimensions.get('window').width * 0.33) / 2,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 3,
    elevation: 5
  },
  countLabel: {
    fontFamily: "avenir-roman",
    fontSize: 30,
    marginTop: Platform.OS === "ios" ? 15 : 0
  }
});

export default KnitCountCounterButton;
