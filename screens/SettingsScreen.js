import React from 'react';
import { View, Text } from 'react-native';
import { observer } from "mobx-react";
import AppSettingsStore from "../store/AppSettingsStore";

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
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor
    }
  );
};

export default observer(SettingsScreen);
