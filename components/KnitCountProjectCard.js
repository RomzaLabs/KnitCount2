import React from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Card from "./Card";

const KnitCountProjectCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) TouchableCmp = TouchableNativeFeedback;

  return (
    <Card style={styles.project}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onPress} useForeground >
          <View style={styles.projectDetail}>
            <View>
              <ImageBackground
                source={props.image ? {uri: props.image} : require('../assets/ProjectPlaceholder.png')}
                style={styles.bgImageContainer}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {props.title}
                  </Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={styles.status} numberOfLines={1}>
                    {props.status}
                  </Text>
                </View>
              </ImageBackground>
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
  projectDetail: {
    flexDirection: 'column'
  },
  bgImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "space-between"
  },
  titleContainer: {
    padding: 12
  },
  title: {
    fontFamily: 'avenir-black',
    fontSize: 32,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  },
  statusContainer: {
    padding: 12
  },
  status: {
    fontSize: 16,
    fontFamily: 'avenir-black',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  }
});

export default KnitCountProjectCard;
