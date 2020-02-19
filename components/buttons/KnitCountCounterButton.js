import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";
import { TapGestureHandler, PanGestureHandler, LongPressGestureHandler, State } from 'react-native-gesture-handler';

const MAX_ZEROES = 5;

const KnitCountCounterButton = (props) => {
  const [value, setValue] = useState(props.counter.value);
  const [bounceAnim, setBounceAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }, [bounceAnim]);

  const digitsForCount = (count) => count.toString().length;
  const leadingZeroes = (count) => "0".repeat(MAX_ZEROES - digitsForCount(count));

  const onSingleTapEvent = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.ACTIVE) {
      setBounceAnim(new Animated.Value(0.9));
    }
    if (state === State.END) {
      const newValue = value + props.counter.stepsPerCount;
      setValue(newValue);
      const newCounter = {...props.counter, value: newValue};
      props.onCounterChanged(newCounter);
    }
  };

  const onDragEvent = (e) => e.nativeEvent.translationX > 0 ? onDragRight(e) : onDragLeft(e);
  const onDragRight = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.ACTIVE) {
      setBounceAnim(new Animated.Value(0.9));
    }
    if (state === State.END) {
      const newValue = value + props.counter.stepsPerCount;
      setValue(newValue);
      const newCounter = {...props.counter, value: newValue};
      props.onCounterChanged(newCounter);
    }
  };
  const onDragLeft = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.ACTIVE) {
      setBounceAnim(new Animated.Value(0.9));
    }
    if (state === State.END) {
      const newValue = value - props.counter.stepsPerCount;
      const newValueOrZero = newValue < 0 ? 0 : newValue;
      setValue(newValueOrZero);
      const newCounter = {...props.counter, value: newValueOrZero};
      props.onCounterChanged(newCounter);
    }
  };

  const onLongPressEvent = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.ACTIVE) {
      setBounceAnim(new Animated.Value(0.9));
      props.onLongPress(props.counter.id);
    }
  };

  return (
    <LongPressGestureHandler minDurationMs={600} onHandlerStateChange={onLongPressEvent}>
      <PanGestureHandler activeOffsetX={[-10, 10]} onHandlerStateChange={onDragEvent}>
        <TapGestureHandler numberOfTaps={1} onHandlerStateChange={onSingleTapEvent}>
          <Animated.View style={
            [
              styles.countButton,
              { transform: [{scale: bounceAnim}], borderColor: props.mainTextColor, backgroundColor: props.mainColor }
            ]
          }>
            <Text style={styles.countLabel}>
              <Text style={{color: props.mainBGColor}}>{leadingZeroes(value)}</Text>
              <Text style={{color: props.mainTextColor}}>{value}</Text>
            </Text>
          </Animated.View>
        </TapGestureHandler>
      </PanGestureHandler>
    </LongPressGestureHandler>
  );
};

KnitCountCounterButton.propTypes = {
  mainTextColor: PropTypes.string.isRequired,
  mainColor: PropTypes.string.isRequired,
  mainBGColor: PropTypes.string.isRequired,
  counter: PropTypes.object.isRequired,
  onCounterChanged: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  countButton: {
    width: Dimensions.get('window').width * 0.33,
    aspectRatio: 1,
    borderRadius: Math.round(Dimensions.get('window').width * 0.33) / 2,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    elevation: 5
  },
  countLabel: {
    fontFamily: "avenir-roman",
    fontSize: 36,
    marginTop: Platform.OS === "ios" ? 15 : 0
  }
});

export default KnitCountCounterButton;
