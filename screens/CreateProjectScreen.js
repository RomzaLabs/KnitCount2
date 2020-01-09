import React from 'react';
import { View, Text, Button } from 'react-native';

import Colors from "../constants/Colors";

const CreateProjectScreen = (props) => {
  return (
    <View>
      <Text>Create Project</Text>
      <Button
        color={Colors.primaryColor}
        title="Enter Name"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      />
    </View>
  );
};

export default CreateProjectScreen;
