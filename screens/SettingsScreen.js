import React from 'react';
import {View, Text, Platform, SafeAreaView, SectionList, StyleSheet, ScrollView} from 'react-native';
import { observer } from "mobx-react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Constants from 'expo-constants';

import AppSettingsStore from "../store/AppSettingsStore";
import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import SECTION_SETTINGS, {
  INSTAGRAM, RATE,
  SECTION_SETTINGS_DATA,
  SEND_FEEDBACK,
  TUTORIAL
} from "../constants/SECTION_SETTINGS";
import KnitCountListButton from "../components/buttons/KnitCountListButton";
import Colors from "../constants/Colors";
import KnitCountColorButton from "../components/buttons/KnitCountColorButton";

const SettingsScreen = observer((props) => {

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  const renderPremium = () => {
    return (
      <View>
        <KnitCountListButton
          onPress={() => console.log("Unlock Premium")}
          label="Unlock Premium"
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          iconName={Platform.OS === "android" ? "md-star" : "ios-star"}
        />
      </View>
    );
  };

  const renderAppColor = () => {

    const onColorPress = (color) => {
      AppSettingsStore.setColor(color);
      props.navigation.setParams({
        mainColor: AppSettingsStore.mainColor,
        mainTextColor: AppSettingsStore.mainTextColor
      });
    };

    const renderColorCircles = () => {
      const supportedColors = [
        Colors.clearChillColor,
        Colors.watermelonColor,
        Colors.brightGreekColor,
        Colors.coralColor,
        Colors.ufoColor
      ];

      return supportedColors.map((color, idx) => {
        return <KnitCountColorButton key={idx} onPress={() => onColorPress(color)} color={color} />;
      });
    };

    return (
      <ScrollView horizontal style={styles.circlesScrollView}>
        {renderColorCircles()}
      </ScrollView>
    );
  };

  const renderGeneral = (item) => {
    let label;
    let iconName;
    switch (item) {
      case SEND_FEEDBACK:
        label = "Send Feedback";
        iconName = Platform.OS === "android" ? "md-at" : "ios-at";
        break;
      case TUTORIAL:
        label = "Tutorial";
        iconName = Platform.OS === "android" ? "md-school" : "ios-school";
        break;
      case INSTAGRAM:
        label = "Instagram";
        iconName = "logo-instagram";
        break;
      case RATE:
      default:
        label = "Rate KnitCount";
        iconName = Platform.OS === "android" ? "md-heart" : "ios-heart";
    }

    return (
      <View>
        <KnitCountListButton
          onPress={() => console.log(`TODO: Handle action for ${item}`)}
          label={label}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          iconName={iconName}
        />
      </View>
    );
  };

  const renderAppVersion = () => {
    const version = Constants.manifest.version;
    return (
      <View>
        <KnitCountListButton
          onPress={() => {}}
          label={`KnitCount ${version}`}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          hideChevron={true}
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
  const mainColor = navData.navigation.getParam("mainColor");
  const mainTextColor = navData.navigation.getParam("mainTextColor");
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
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: mainTextColor },
      headerTintColor: mainTextColor,
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
  },
  circlesScrollView: {
    marginTop: 6,
    marginBottom: 12,
    marginHorizontal: 12
  }
});

export default SettingsScreen;
