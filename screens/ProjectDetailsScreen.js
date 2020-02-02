import React, {useState, useEffect} from 'react';
import { Button, KeyboardAvoidingView, Platform, SectionList, StyleSheet, Text, View} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import
  SECTION_DETAILS,
  {
    ACTION_BUTTONS,
    MARK_FINISHED_BTN_ID,
    UPDATE_TITLE_BTN_ID,
    DELETE_PROJECT_BTN_ID
  } from "../constants/SECTION_DETAILS";

const ProjectDetailsScreen = (props) => {
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    setProjectName(ProjectsStore.selectedProject.name);
  }, [projectName]);

  const PROJECT_DETAILS_SECTIONS = [
    { key: SECTION_DETAILS.COUNTERS.key, title: SECTION_DETAILS.COUNTERS.title, data: SECTION_DETAILS.COUNTERS.data },
    { key: SECTION_DETAILS.PHOTOS.key, title: SECTION_DETAILS.PHOTOS.title, data: SECTION_DETAILS.PHOTOS.data },
    { key: SECTION_DETAILS.NOTES.key, title: SECTION_DETAILS.NOTES.title, data: SECTION_DETAILS.NOTES.data },
    { key: SECTION_DETAILS.ACTIONS.key, title: SECTION_DETAILS.ACTIONS.title, data: SECTION_DETAILS.ACTIONS.data }
  ];

  const handleMarkFinished = () => { console.log("TODO: Mark Finished!") }; // TODO: Implement mark finished.
  const handleUpdateTitle = () => { console.log("TODO: Update Title!") }; // TODO: Implement update title.
  const handleDeleteProject = () => { console.log("TODO: Delete Project!") }; // TODO: Implement delete project.

  const getHandlerForBtn = (btnName) => {
    switch (btnName) {
      case MARK_FINISHED_BTN_ID: return handleMarkFinished;
      case UPDATE_TITLE_BTN_ID: return handleUpdateTitle;
      case DELETE_PROJECT_BTN_ID: return handleDeleteProject;
      default: return handleDeleteProject;
    }
  };

  const renderActionBtn = (btnName) => {
    const btnTitle = ACTION_BUTTONS[btnName];
    const handleOnPress = getHandlerForBtn(btnName);
    return <View><Button title={btnTitle} onPress={handleOnPress} /></View>;
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: AppSettingsStore.mainTextColor}]}>{projectName}</Text>
      </View>
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
  titleContainer: {
    margin: 12
  },
  title: {
    fontFamily: "avenir-black",
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  },
  header: {
    fontSize: 32,
  }
});

export default ProjectDetailsScreen;
