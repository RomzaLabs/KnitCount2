import React, {useEffect} from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, Text} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";
import { SOUND_DATA } from "../constants/Sounds";
import KnitCountListButton from "../components/buttons/KnitCountListButton";

const SoundPackSelectionScreen = (props) => {

  useEffect(() => {
    props.navigation.setParams({
      mainColor: AppSettingsStore.mainColor,
      mainTextColor: AppSettingsStore.mainTextColor
    });
  }, []);

  const SoundPackCell = ({ title }) => {
    const friendlyTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
      <KnitCountListButton
        onPress={() => console.log("TODO: On Press")}
        label={friendlyTitle}
        textColor={AppSettingsStore.mainTextColor}
        bgColor={AppSettingsStore.mainBGColor}
        rightIconName={Platform.OS === "android" ? "md-play-circle" : "ios-play-circle"}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}>
      <FlatList
        data={SOUND_DATA}
        renderItem={({ item }) => <SoundPackCell title={item.title} />}
        keyExtractor={item => item.id}
      />
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
