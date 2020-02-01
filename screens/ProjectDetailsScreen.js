import React from 'react';
import { Button, KeyboardAvoidingView, Platform, SectionList, StyleSheet, Text, View} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const ProjectDetailsScreen = (props) => {
  const { selectedProject } = ProjectsStore;

  const DATA = [
    { title: "projects", data: [] },
    { title: 'photos', data: [] },
    { title: 'notes', data: [] },
    { title: 'actions', data: ['markFinishedBtn', 'updateTitleBtn', 'deleteProjectBtn'] }
  ];

  const renderActionBtn = (btnName) => {
    let btnTitle = ''; // TODO: Refactor this.
    if (btnName === 'markFinishedBtn') btnTitle = "Mark Finished";
    if (btnName === 'updateTitleBtn') btnTitle = "Update Title";
    if (btnName === 'deleteProjectBtn') btnTitle = "Delete Project";

    return <View><Button title={btnTitle} onPress={() => console.log("Button pressed!")} /></View>;
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <SectionList
        style={{backgroundColor: AppSettingsStore.mainColor}}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section, item }) => {
          if (section.title === 'actions') return renderActionBtn(item);
          return null;
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </KeyboardAvoidingView>
  );
};

ProjectDetailsScreen.navigationOptions = (navData) => {
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
      title: "",
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
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  }
});

export default observer(ProjectDetailsScreen);
