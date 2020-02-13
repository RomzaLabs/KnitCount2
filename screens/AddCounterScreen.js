import React, {useState} from 'react';
import {View, Text, Button, SafeAreaView, KeyboardAvoidingView, StyleSheet, ScrollView} from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import {NavigationActions} from "react-navigation";
import Counter from "../models/Counter";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountActionButton from "../components/KnitCountActionButton";

const AddCounterScreen = observer((props) => {
  const projectId = ProjectsStore.selectedProject.id;
  const [counter, setCounter] = useState(new Counter(null, projectId, ""));
  const [customName, setCustomName] = useState('');
  const [disabled, setDisabled] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <ScrollView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]} >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: AppSettingsStore.mainTextColor}]}>Add A Counter</Text>
        </View>
        <View style={styles.submitContainer}>
          <View style={styles.saveContainer}>
            <KnitCountActionButton
              label="Save"
              onPress={async() => {
                const dbResult = await ProjectsStore.saveCounter(projectId, counter);
                const insertedCounter = {...counter, id: dbResult.insertId};
                ProjectsStore.appendCounterToSelectedProject(insertedCounter);
                props.navigation.navigate(
                  "Main",
                  {},
                  NavigationActions.navigate({ routeName: "ProjectDetails" })
                );
              }}
              bgColor={AppSettingsStore.mainTextColor}
              textColor={AppSettingsStore.mainColor}
              disabled={disabled}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

AddCounterScreen.navigationOptions = (navData) => {
  return (
    {
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="Cancel">
            <Item
              title="Cancel"
              iconName={Platform.OS === "android" ? "md-close" : "ios-close"}
              onPress={() => {
                navData.navigation.navigate(
                  "Main",
                  {},
                  NavigationActions.navigate({ routeName: "ProjectDetails" })
                );
              }}
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
  titleContainer: {
    margin: 12
  },
  title: {
    fontFamily: "avenir-black",
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  },
  submitContainer: {
    margin: 12
  },
  saveContainer: {
    margin: 12
  }
});

export default AddCounterScreen;
