import React from 'react';
import { Button, KeyboardAvoidingView, Platform, SectionList, StyleSheet, Text, View} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import
  SECTION_DETAILS,
  {
    MARK_FINISHED_BTN_ID,
    UPDATE_TITLE_BTN_ID,
    DELETE_PROJECT_BTN_ID
  } from "../constants/SECTION_DETAILS";

const ProjectDetailsScreen = (props) => {
  const { selectedProject } = ProjectsStore;

  const PROJECT_DETAILS_SECTIONS = [
    { key: SECTION_DETAILS.COUNTERS.key, title: SECTION_DETAILS.COUNTERS.title, data: SECTION_DETAILS.COUNTERS.data },
    { key: SECTION_DETAILS.PHOTOS.key, title: SECTION_DETAILS.PHOTOS.title, data: SECTION_DETAILS.PHOTOS.data },
    { key: SECTION_DETAILS.NOTES.key, title: SECTION_DETAILS.NOTES.title, data: SECTION_DETAILS.NOTES.data },
    { key: SECTION_DETAILS.ACTIONS.key, title: SECTION_DETAILS.ACTIONS.title, data: SECTION_DETAILS.ACTIONS.data }
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
        sections={PROJECT_DETAILS_SECTIONS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ section, item }) => {
          if (section.key === SECTION_DETAILS.ACTIONS.key) return renderActionBtn(item);
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
