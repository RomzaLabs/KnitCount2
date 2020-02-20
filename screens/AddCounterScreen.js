import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, ScrollView, TextInput } from 'react-native';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import {NavigationActions} from "react-navigation";
import Counter from "../models/Counter";
import ProjectsStore from "../store/ProjectsStore";
import KnitCountActionButton from "../components/buttons/KnitCountActionButton";
import KnitCountListButton from "../components/buttons/KnitCountListButton";
import {PRESET_COUNTERS} from "../models/Counter";
import KnitCountNumberStepper from "../components/KnitCountNumberStepper";

const AddCounterScreen = observer((props) => {
  const projectId = ProjectsStore.selectedProject.id;
  const [counter, setCounter] = useState(new Counter(null, projectId, ""));
  const [customName, setCustomName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [stepsPerCount, setStepsPerCount] = useState(1);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]}
    >
      <ScrollView style={[styles.screen, {backgroundColor: AppSettingsStore.mainColor}]} >
        <View style={styles.container}>
          <Text style={[styles.title, {color: AppSettingsStore.mainTextColor}]}>Add A Counter</Text>
        </View>

        <View style={styles.container}>
          <Text style={[styles.header, {color: AppSettingsStore.mainTextColor}]}>
            Create your own
          </Text>
          <View>
            <TextInput
              style={[styles.input, {backgroundColor: AppSettingsStore.mainBGColor, color: AppSettingsStore.mainTextColor}]}
              placeholder="Enter counter label"
              value={customName}
              onChangeText={(e) => {
                setCustomName(e);
                const newCounter = {...counter, label: e};
                setCounter(newCounter);
                setDisabled(false);
              }}
            />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={[styles.header, {color: AppSettingsStore.mainTextColor}]}>
            Steps per count
          </Text>
          <View style={styles.container}>
            <KnitCountNumberStepper
              value={stepsPerCount}
              minValue={1}
              maxValue={50}
              stepValue={1}
              buttonsTextColor={AppSettingsStore.mainTextColor}
              buttonsBackgroundColor={AppSettingsStore.mainColor}
              labelTextColor={AppSettingsStore.mainTextColor}
              labelBackgroundColor={AppSettingsStore.mainBGColor}
              cornerRadius={5}
              onChange={(e) => {
                setStepsPerCount(e);
                const newCounter = {...counter, stepsPerCount: e};
                setCounter(newCounter);
              }}
            />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={[styles.header, {color: AppSettingsStore.mainTextColor}]}>
            Or choose a preset
          </Text>
        </View>
        <View style={styles.cellContainer}>
          {
            PRESET_COUNTERS.map((counter, idx) => {
              return (
                <KnitCountListButton
                  key={idx}
                  onPress={() => {
                    const newCounter = {...counter, projectId, stepsPerCount};
                    setCounter(newCounter);
                    setCustomName(newCounter.label);
                    setDisabled(false);
                  }}
                  label={counter.label}
                  textColor={AppSettingsStore.mainTextColor}
                  bgColor={AppSettingsStore.mainBGColor}
                />
              );
            })
          }
        </View>

        <View style={styles.container}>
          <View style={styles.container}>
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
  container: {
    margin: 12
  },
  cellContainer: {
    marginLeft: 12,
    marginBottom: 12
  },
  title: {
    fontFamily: "avenir-black",
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 3
  },
  header: {
    fontSize: 16,
    marginHorizontal: 12,
    fontFamily: "avenir-roman",
    textTransform: "uppercase"
  },
  input: {
    fontFamily: "avenir-roman",
    fontSize: 16,
    padding: 8,
    borderRadius: 5,
    margin: 12,
    height: 50
  }
});

export default AddCounterScreen;
