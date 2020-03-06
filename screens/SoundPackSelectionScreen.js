import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";

const SoundPackSelectionScreen = (props) => {

  useEffect(() => {
    props.navigation.setParams({
      mainColor: AppSettingsStore.mainColor,
      mainTextColor: AppSettingsStore.mainTextColor
    });
  }, []);

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}>
      <Text>Hello World</Text>
    </SafeAreaView>
  );

};

SoundPackSelectionScreen.navigationOptions = (navData) => {
  const mainColor = navData.navigation.getParam("mainColor");
  const mainTextColor = navData.navigation.getParam("mainTextColor");
  return (
    {
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: mainTextColor },
      headerTintColor: mainTextColor
    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default SoundPackSelectionScreen;
