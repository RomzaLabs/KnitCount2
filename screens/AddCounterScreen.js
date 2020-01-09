import React from 'react';
import {View, Text, Button} from 'react-native';

import Colors from "../constants/Colors";

const AddCounterScreen = (props) => {
  return (
    <View>
      <Text>Add Counter</Text>
      <Button
        color={Colors.primaryColor}
        title="Preset"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      />
    </View>
  );
};

export default AddCounterScreen;
