import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  const hideShadows = !!props.hideShadows;
  return <View style={[hideShadows ? {} : styles.card, {...props.style}]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    elevation: 5
  }
});

export default Card;
