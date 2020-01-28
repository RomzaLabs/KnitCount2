import React from 'react';
import {View, Text, Platform} from 'react-native';
import { observer } from "mobx-react";
import AppSettingsStore from "../store/AppSettingsStore";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";

const SettingsScreen = (props) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

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

export default observer(SettingsScreen);
