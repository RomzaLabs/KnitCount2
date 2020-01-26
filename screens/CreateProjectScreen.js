import React from 'react';
import {Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";

const CreateProjectScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <View>
        <Text>Create Project</Text>
        <Button
          color={AppSettingsStore.mainTextColor}
          title="Enter Name"
          onPress={() => props.navigation.navigate("ProjectDetails")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

CreateProjectScreen.navigationOptions = (navData) => {
  return (
    {
      headerStyle: { ...navData.navigationOptions.headerStyle, backgroundColor: AppSettingsStore.mainColor },
      headerTitleStyle: { ...navData.navigationOptions.headerTitleStyle, color: AppSettingsStore.mainTextColor },
      headerBackTitleStyle: { ...navData.navigationOptions.headerBackTitleStyle, color: AppSettingsStore.mainTextColor },
      headerTintColor: AppSettingsStore.mainTextColor
    }
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default observer(CreateProjectScreen);
