import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import Colors from "../constants/Colors";

const CreateProjectScreen = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <View>
        <Text>Create Project</Text>
        <Button
          color={Colors.primaryColor}
          title="Enter Name"
          onPress={() => props.navigation.navigate("ProjectDetails")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default CreateProjectScreen;
