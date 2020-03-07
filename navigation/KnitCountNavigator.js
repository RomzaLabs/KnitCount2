import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AppSettingsStore from "../store/AppSettingsStore";

import AddCounterScreen from "../screens/AddCounterScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import MyProjectsScreen from "../screens/MyProjectsScreen";
import ProjectDetailsScreen from "../screens/ProjectDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SoundPackSelectionScreen from "../screens/SoundPackSelectionScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: AppSettingsStore.mainColor,
    opacity: 0.95
  },
  headerTitleStyle: {
    fontFamily: "avenir-black",
    fontSize: 22,
    color: AppSettingsStore.mainTextColor,
    width: '100%',
    maxWidth: 250
  },
  headerBackTitleStyle: {
    fontFamily: "avenir-roman",
    color: AppSettingsStore.mainTextColor
  },
  headerTintColor: AppSettingsStore.mainTextColor
};

const ProjectCreateNavigator = createStackNavigator(
  {
    CreateProject: {
      screen: CreateProjectScreen,
      navigationOptions: {
        headerTitle: ""
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const CounterCreateNavigator = createStackNavigator(
  {
    AddCounter: {
      screen: AddCounterScreen,
      navigationOptions: {
        headerTitle: ""
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createStackNavigator(
  {
    MyProjects: {
      screen: MyProjectsScreen,
    },
    ProjectDetails: ProjectDetailsScreen,
    Settings: SettingsScreen,
    SoundPacks: {
      screen: SoundPackSelectionScreen,
      navigationOptions: {
        headerTitle: "Sound Packs"
      }
    }
  },
  {
    initialRouteName: "MyProjects",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const KnitCountNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Create: ProjectCreateNavigator,
    CreateCounter: CounterCreateNavigator
  }
);

export default createAppContainer(KnitCountNavigator);
