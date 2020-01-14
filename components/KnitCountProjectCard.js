import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Card from "./Card";

const KnitCountProjectCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) TouchableCmp = TouchableNativeFeedback;

  // TODO: Use default image if project doesn't have an image.

  /*
  <View style={styles.titleContainer}>
              <Text style={styles.title} >{props.title}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.status} >{props.status}</Text>
            </View>
   */

  return (
    <Card style={styles.project}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onPress} useForeground >
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: 250
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 3
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  titleContainer: {
    height: "20%",
  },
  title: {
    fontSize: 24,
    fontFamily: "avenir-roman"
  },
  statusContainer: {
    alignItems: "center",
    height: "17%",
    padding: 10
  },
  status: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "avenir-roman"
  },
});

export default KnitCountProjectCard;
