import React from 'react';
import {View, Text, Button} from 'react-native';

import Colors from "../constants/Colors";

const ProjectDetailsScreen = (props) => {
  return (
    <View>
      <Text>Project Details</Text>
      <Button
        color={Colors.primaryColor}
        title="Add A Counter"
        onPress={() => props.navigation.navigate("AddCounter")}
      />
    </View>
  );
};

export default ProjectDetailsScreen;
