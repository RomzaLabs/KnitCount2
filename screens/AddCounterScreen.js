import React from 'react';
import {View, Text, Button} from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";

const AddCounterScreen = (props) => {
  return (
    <View>
      <Text>Add Counter</Text>
      <Button
        color={AppSettingsStore.mainColor}
        title="Preset"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      />
    </View>
  );
};

export default AddCounterScreen;
