import React, {useEffect, useState} from 'react';
import {View, Text, Platform, SafeAreaView, SectionList, StyleSheet, ScrollView} from 'react-native';
import { observer } from "mobx-react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Constants from 'expo-constants';
import { Linking } from 'expo';

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
import Sounds from "../constants/Sounds";

const SettingsScreen = observer((props) => {
  const [audioPack, setAudioPack] = useState(Sounds.default);
  const settingsRef = AppSettingsStore.settings;

  useEffect(() => {
    props.navigation.setParams({
      mainColor: AppSettingsStore.mainColor,
      mainTextColor: AppSettingsStore.mainTextColor
    });
  }, []);

  useEffect(() => { setAudioPack(settingsRef.audioPack) }, [settingsRef]);

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor, backgroundColor: AppSettingsStore.mainColor}]}>{title}</Text>;
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
          rightIconName={Platform.OS === "android" ? "md-arrow-forward" : "ios-arrow-forward"}
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

  const renderSounds = () => {
    return (
      <View>
        <KnitCountListButton
          onPress={() => props.navigation.navigate("SoundPacks")}
          label="Sound Pack"
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          iconName={Platform.OS === "android" ? "md-volume-low" : "ios-volume-low"}
          rightSelectionText={audioPack}
          rightIconName={Platform.OS === "android" ? "md-arrow-forward" : "ios-arrow-forward"}
        />
      </View>
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
          onPress={() => {
            switch (item) {
              case SEND_FEEDBACK:
                Linking.openURL('mailto:knitcount@romzalabs.com');
                break;
              case TUTORIAL: // TODO: Make the video.
              case INSTAGRAM:
                Linking.openURL('https://www.instagram.com/lizamakesthings/');
                break;
              case RATE:
                // These won't work properly until the app is Public.
                const androidURL = "https://play.google.com/store/apps/details?id=com.romzalabs.knitcount";
                const iosURL = "itms-apps://itunes.apple.com/app/apple-store/id1499418814?mt=8&action=write-review";
                const storeURL = Platform.OS === "android" ? androidURL : iosURL;
                Linking.openURL(storeURL);
                break;
              default:
                console.log(`TODO: Handle action for ${item}`)
            }
          }}
          label={label}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          iconName={iconName}
          rightIconName={Platform.OS === "android" ? "md-arrow-forward" : "ios-arrow-forward"}
        />
      </View>
    );
  };

  const renderAppVersion = () => {
    const version = Constants.nativeAppVersion;
    return (
      <View>
        <KnitCountListButton
          onPress={() => {}}
          label={`KnitCount ${version}`}
          textColor={AppSettingsStore.mainTextColor}
          bgColor={AppSettingsStore.mainBGColor}
          hideRightIcon={true}
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
            // case SECTION_SETTINGS.PREMIUM.key: return renderPremium();
            case SECTION_SETTINGS.APP_COLOR.key: return renderAppColor();
            case SECTION_SETTINGS.SOUNDS.key: return renderSounds();
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
    textTransform: "uppercase"
  },
  circlesScrollView: {
    marginTop: 6,
    marginBottom: 12,
    marginHorizontal: 12
  }
});

export default SettingsScreen;
