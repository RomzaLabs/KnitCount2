import React from 'react';
import {View, Text, Platform, SafeAreaView, SectionList, StyleSheet} from 'react-native';
import { observer } from "mobx-react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import AppSettingsStore from "../store/AppSettingsStore";
import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import SECTION_SETTINGS, {
  INSTAGRAM, RATE,
  SECTION_SETTINGS_DATA,
  SEND_FEEDBACK,
  TUTORIAL
} from "../constants/SECTION_SETTINGS";
import KnitCountListButton from "../components/buttons/KnitCountListButton";

const SettingsScreen = observer((props) => {

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  const renderPremium = () => {
    // TODO: Make a more generic "KnitCountPresetButton" with option to hide chevron and add icon
    return (
      <View>
        <KnitCountListButton
          onPress={() => console.log("Unlock Premium")}
          label="Unlock Premium"
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
        />
      </View>
    );
  };

  const renderAppColor = () => {
    return <View><Text>TODO: App Color ScrollView</Text></View>;
  };

  const renderGeneral = (item) => {
    let label;
    switch (item) {
      case SEND_FEEDBACK:
        label = "Send Feedback";
        break;
      case TUTORIAL:
        label = "Tutorial";
        break;
      case INSTAGRAM:
        label = "Instagram";
        break;
      case RATE:
      default:
        label = "Rate KnitCount";
    }

    return (
      <View>
        <KnitCountListButton
          onPress={() => console.log(`TODO: Handle action for ${item}`)}
          label={label}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
        />
      </View>
    );
  };

  const renderAppVersion = () => {
    // TODO: Get app version
    const version = "1.0.0";
    return (
      <View>
        <KnitCountListButton
          onPress={() => {}}
          label={`KnitCount ${version}`}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
        />
      </View>
    );
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
    marginLeft: 12
  },
  header: {
    fontSize: 16,
    marginHorizontal: 12,
    marginTop: 24,
    fontFamily: "avenir-roman",
    textTransform: "uppercase",
  }
});

export default SettingsScreen;
