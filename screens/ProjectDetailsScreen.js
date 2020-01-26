import React from 'react';
import {View, Text, Button} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";

const ProjectDetailsScreen = (props) => {
  const { selectedProject } = ProjectsStore;

  return (
    <View>
      <Text>Project Details: { selectedProject.name }</Text>
      <Button
        color={AppSettingsStore.mainColor}
        title="Add A Counter"
        onPress={() => props.navigation.navigate("AddCounter")}
      />
    </View>
  );
};

ProjectDetailsScreen.navigationOptions = (navData) => {
  return (
    {
      headerTitle: ProjectsStore.selectedProject.name
    }
  );
};

export default ProjectDetailsScreen;
