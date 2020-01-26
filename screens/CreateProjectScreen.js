import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import Project from "../models/Project";
import ProjectsStore from "../store/ProjectsStore";

const CreateProjectScreen = (props) => {
  const [project, setProject] = useState(null);

  if (!project) setProject(new Project(0, "My new project"));

  const renderProjectName = () => project ? project.name : "";
  const handleChangeName = (text) => {
    const updateProject = {...project, name: text};
    setProject(updateProject);
  };
  const handleSubmit = () => {
    ProjectsStore.setSelectedProject(project);
    props.navigation.navigate("ProjectDetails");
  };

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
        <TextInput
          style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
          value={project ? project.name : ''}
          onChangeText={handleChangeName}
          onSubmitEditing={handleSubmit}
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
  },
  input: {
    fontFamily: "avenir-roman",
    fontSize: 18,
    margin: 20,
    padding: 20,
    width: "90%",
    borderRadius: 5
  }
});

export default observer(CreateProjectScreen);
