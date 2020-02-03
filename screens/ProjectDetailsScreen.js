import React, {useState, useEffect} from 'react';
import {Platform, SafeAreaView, SectionList, StyleSheet, Text, TextInput, View} from 'react-native';
import Modal from "react-native-modal";
import Confetti from 'reanimated-confetti';

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
import KnitCountActionButton from "../components/KnitCountActionButton";
import KnitCountDestructiveButton from "../components/KnitCountDestructiveButton";
import {ProjectStatus} from "../models/ProjectStatus";
import KnitCountProjectCard from "../components/KnitCountProjectCard";

const ProjectDetailsScreen = (props) => {
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState(undefined);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);
  const [isUpdateTitleModalVisible, setIsUpdateTitleModalVisible] = useState(false);

  useEffect(() => {
    setSelectedProject(ProjectsStore.selectedProject);
    setProjectStatus(ProjectsStore.selectedProject.status);
    setProjectName(ProjectsStore.selectedProject.name);
  }, [selectedProject]);

  const PROJECT_DETAILS_SECTIONS = [
    { key: SECTION_DETAILS.COUNTERS.key, title: SECTION_DETAILS.COUNTERS.title, data: SECTION_DETAILS.COUNTERS.data },
    { key: SECTION_DETAILS.PHOTOS.key, title: SECTION_DETAILS.PHOTOS.title, data: SECTION_DETAILS.PHOTOS.data },
    { key: SECTION_DETAILS.NOTES.key, title: SECTION_DETAILS.NOTES.title, data: SECTION_DETAILS.NOTES.data },
    { key: SECTION_DETAILS.ACTIONS.key, title: SECTION_DETAILS.ACTIONS.title, data: SECTION_DETAILS.ACTIONS.data }
  ];

  const toggleFinishedModalVisible = () => setIsFinishedModalVisible(!isFinishedModalVisible);
  const toggleUpdateTitleModalVisible = () => setIsUpdateTitleModalVisible(!isUpdateTitleModalVisible);

  const handleMarkFinished = () => {
    ProjectsStore.toggleStatusForProject(ProjectsStore.selectedProject.id);
    setProjectStatus(projectStatus === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP);
    toggleFinishedModalVisible();
  };

  const handleMarkInProgress = () => {
    ProjectsStore.toggleStatusForProject(ProjectsStore.selectedProject.id);
    setProjectStatus(projectStatus === ProjectStatus.WIP ? ProjectStatus.FO : ProjectStatus.WIP);
  };

  const handleUpdateTitle = () => toggleUpdateTitleModalVisible();

  const handleDeleteProject = () => { console.log("TODO: Delete Project!") }; // TODO: Implement delete project.

  const getHandlerForBtn = (btnName) => {
    switch (btnName) {
      case MARK_FINISHED_BTN_ID:
        if (projectStatus === ProjectStatus.WIP) return handleMarkFinished;
        return handleMarkInProgress;
      case UPDATE_TITLE_BTN_ID: return handleUpdateTitle;
      case DELETE_PROJECT_BTN_ID: return handleDeleteProject;
      default: return handleDeleteProject;
    }
  };

  const renderActionBtn = (btnName) => {
    const btnTitle = ACTION_BUTTONS[btnName];
    const updatedTitle = btnTitle === "Mark Finished" && projectStatus === ProjectStatus.FO ? "Mark In Progress" : btnTitle;
    const handleOnPress = getHandlerForBtn(btnName);

    let btnComponent;
    if (btnName === DELETE_PROJECT_BTN_ID) {
      btnComponent = <KnitCountDestructiveButton onPress={handleOnPress} label={btnTitle} />;
    } else {
      btnComponent = (
        <KnitCountActionButton
          onPress={handleOnPress}
          label={updatedTitle}
          bgColor={AppSettingsStore.mainTextColor}
          textColor={AppSettingsStore.mainColor}
        />
      );
    }

    return <View style={styles.actionBtnContainer}>{btnComponent}</View>;
  };

  const renderSectionHeader = (title, fontColor) => {
    return <Text style={[styles.header, {color: fontColor}]}>{title}</Text>;
  };

  return (
    <SafeAreaView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]} >
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
        renderSectionHeader={({ section: { title } }) => renderSectionHeader(title, AppSettingsStore.mainTextColor)}
      />

      <Modal isVisible={isFinishedModalVisible} onBackdropPress={toggleFinishedModalVisible}>
        <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
          <KnitCountProjectCard
            onPress={() => {}}
            image={null}
            title={projectName}
            status={projectStatus}
            textColor={AppSettingsStore.mainTextColor}
            hideShadows={true}
          />
          {Platform.OS === "ios" && <Confetti duration={4000} />}
          <View style={styles.finishedModalActionContainer}>
            <KnitCountActionButton
              onPress={() => {
                toggleFinishedModalVisible();
                props.navigation.navigate("MyProjects");
              }}
              label={"Go to My Projects"}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
            />
          </View>
        </View>
      </Modal>

      <Modal isVisible={isUpdateTitleModalVisible} onBackdropPress={toggleUpdateTitleModalVisible}>
        <View style={[styles.modalContainer, {backgroundColor: AppSettingsStore.mainColor}]}>
          <View style={{alignItems: "center", margin: 12}}>
            <Text style={[styles.updateTitleHeader, {color: AppSettingsStore.mainTextColor}]}>Enter new title</Text>
            <TextInput
              style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
              placeholder="Enter project name"
              value={projectName}
              onChangeText={(e) => setProjectName(e)}
              onSubmitEditing={(e) => {
                ProjectsStore.updateProjectName(selectedProject.id, e.nativeEvent.text);
                toggleUpdateTitleModalVisible();
              }}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
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
    fontSize: 16,
    marginHorizontal: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  actionBtnContainer: {
    marginHorizontal: 12,
    marginVertical: 2
  },
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  finishedModalActionContainer: {
    margin: 6
  },
  updateTitleHeader: {
    fontSize: 16,
    marginTop: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  input: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    width: "100%",
    marginTop: 8,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5
  }
});

export default ProjectDetailsScreen;
