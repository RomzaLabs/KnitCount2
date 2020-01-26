import React from 'react';
import {View, Text, Button} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";

const AddCounterScreen = (props) => {
  return (
    <View>
      <Text>Add Counter</Text>
      <Button
        color={AppSettingsStore.mainColor}
        title="Preset"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      />
    </View>
  );
};

AddCounterScreen.navigationOptions = (navData) => {
  return (
    {
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor
    }
  );
};

export default observer(AddCounterScreen);
