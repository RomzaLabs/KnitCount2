import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { observer } from "mobx-react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import AppSettingsStore from "../store/AppSettingsStore";
import Project from "../models/Project";
import ProjectsStore from "../store/ProjectsStore";

const CreateProjectScreen = (props) => {
  const [project, setProject] = useState(null);
  const [touched, setTouched] = useState(false);

  if (!project) setProject(new Project());

  const renderProjectName = () => project ? project.name : "";
  const handleChangeName = (text) => {
    const updateProject = {...project, name: text};
    setProject(updateProject);
    setTouched(true);
  };
  const handleSubmit = async() => {
    await ProjectsStore.createNewProject(project);
    props.navigation.navigate("Main", {}, NavigationActions.navigate({ routeName: "ProjectDetails" }));
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
          placeholder="Enter project name"
          value={touched ? project.name : ''}
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
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="Cancel">
            <Item
              title="Cancel"
              iconName={Platform.OS === "android" ? "md-close" : "ios-close"}
              onPress={() => navData.navigation.navigate('Main')}
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
    borderRadius: 5,
    minHeight: 60
  }
});

export default observer(CreateProjectScreen);
