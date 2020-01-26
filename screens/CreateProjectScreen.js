import React, {useState} from 'react';
import {Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import Project from "../models/Project";

const CreateProjectScreen = (props) => {
  const [project, setProject] = useState(null);

  if (!project) setProject(new Project(0, "My new project"));

  const renderProjectName = () => project ? project.name : "";

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <View style={styles.projectContainer}>
        <Text style={[styles.projectName, {color: AppSettingsStore.mainTextColor}]}>
          {renderProjectName()}
        </Text>
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
  },
  projectContainer: {
    height: '100%',
    maxHeight: '40%',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 32,
    fontFamily: "avenir-roman",
    width: "100%",
    textAlign: "center"
  }
});

export default observer(CreateProjectScreen);
