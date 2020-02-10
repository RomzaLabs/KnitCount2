import React, { useState, useEffect } from 'react';
import {Animated, Dimensions, Platform, StyleSheet} from 'react-native';
import PropTypes from "prop-types";
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const KnitCountCounterAddButton = (props) => {
  const [bounceAnim, setBounceAnim] = useState(new Animated.Value(1));
  const addIconName = Platform.OS === "android" ? "md-add" : "ios-add";

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }, [bounceAnim]);

  const onSingleTapEvent = (e) => {
    const { state } = e.nativeEvent;
    if (state === State.ACTIVE) {
      setBounceAnim(new Animated.Value(0.9));
    }
    if (state === State.END) {
      props.onPress();
    }
  };

  return (
    <TapGestureHandler numberOfTaps={1} onHandlerStateChange={onSingleTapEvent}>
      <Animated.View style={
        [
          styles.button,
          { transform: [{scale: bounceAnim}], borderColor: props.mainTextColor, backgroundColor: props.mainColor }
        ]
      }>
        <Ionicons name={addIconName} size={60} color={props.mainTextColor} />
      </Animated.View>
    </TapGestureHandler>
  );
};

KnitCountCounterAddButton.propTypes = {
  mainTextColor: PropTypes.string.isRequired,
  mainColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width * 0.33,
    aspectRatio: 1,
    borderRadius: Math.round(Dimensions.get('window').width * 0.33) / 2,
    borderWidth: 3,
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
  }
});

export default KnitCountCounterAddButton;
