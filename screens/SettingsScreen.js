import React from 'react';
import {View, Text, Platform, SafeAreaView, SectionList, StyleSheet} from 'react-native';
import { observer } from "mobx-react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import AppSettingsStore from "../store/AppSettingsStore";
import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import SECTION_SETTINGS, {SECTION_SETTINGS_DATA} from "../constants/SECTION_SETTINGS";

const SettingsScreen = observer((props) => {

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  const renderPremium = () => {
    return <View><Text>TODO: Premium</Text></View>;
  };

  const renderAppColor = () => {
    return <View><Text>TODO: App Color</Text></View>;
  };

  const renderGeneral = (item) => {
    return <View><Text>TODO: General: {item}</Text></View>;
  };

  const renderAppVersion = () => {
    return <View><Text>TODO: Version</Text></View>;
  };

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}>
      <SectionList
        style={[styles.settingsList, {backgroundColor: AppSettingsStore.mainColor}]}
        sections={SECTION_SETTINGS_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section, item }) => {
          switch (section.key) {
            case SECTION_SETTINGS.PREMIUM.key: return renderPremium();
            case SECTION_SETTINGS.APP_COLOR.key: return renderAppColor();
            case SECTION_SETTINGS.GENERAL.key: return renderGeneral(item);
            case SECTION_SETTINGS.APP_VERSION.key: return renderAppVersion();
            default: return null;
          }
        }}
        renderSectionHeader={({ section: { title } }) => renderSectionHeader(title, AppSettingsStore.mainTextColor)}
      />
    </SafeAreaView>
  );
});

SettingsScreen.navigationOptions = (navData) => {
  return (
    {
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="My Projects">
            <Item
              title="My Projects"
              iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
              onPress={() => navData.navigation.popToTop()}
            />
          </HeaderButtons>
        );
      },
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor,
      gestureDirection: "horizontal-inverted"
    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  settingsList: {
    margin: 12
  },
  header: {
    fontSize: 16,
    marginHorizontal: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  }
});

export default SettingsScreen;
