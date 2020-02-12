import React from 'react';
import {View, Text, Button} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {NavigationActions} from "react-navigation";

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
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="Cancel">
            <Item
              title="Cancel"
              iconName={Platform.OS === "android" ? "md-close" : "ios-close"}
              onPress={() => {
                navData.navigation.navigate(
                  "Main",
                  {},
                  NavigationActions.navigate({ routeName: "ProjectDetails" })
                );
              }}
            />
          </HeaderButtons>
        );
      },
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor
    }
  );
};

export default observer(AddCounterScreen);
