import React from 'react';
import {View, Text, Button} from 'react-native';

import Colors from "../constants/Colors";
import ProjectsStore from "../store/ProjectsStore";

const ProjectDetailsScreen = (props) => {
  const { selectedProject } = ProjectsStore;

  return (
    <View>
      <Text>Project Details: { selectedProject.name }</Text>
      <Button
        color={Colors.primaryColor}
        title="Add A Counter"
        onPress={() => props.navigation.navigate("AddCounter")}
      />
    </View>
  );
};

ProjectDetailsScreen.navigationOptions = (navData) => {
  return (
    {
      headerTitle: ""
    }
  );
};

export default ProjectDetailsScreen;
