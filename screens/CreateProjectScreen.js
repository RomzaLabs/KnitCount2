import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import AppSettingsStore from "../store/AppSettingsStore";

const CreateProjectScreen = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <View>
        <Text>Create Project</Text>
        <Button
          color={AppSettingsStore.mainColor}
          title="Enter Name"
          onPress={() => props.navigation.navigate("ProjectDetails")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppSettingsStore.mainColor,
  }
});

export default CreateProjectScreen;
