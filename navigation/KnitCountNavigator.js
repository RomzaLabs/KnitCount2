import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AppSettingsStore from "../store/AppSettingsStore";

import AddCounterScreen from "../screens/AddCounterScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import MyProjectsScreen from "../screens/MyProjectsScreen";
import ProjectDetailsScreen from "../screens/ProjectDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";

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

const MainNavigator = createStackNavigator(
  {
    AddCounter: {
      screen: AddCounterScreen,
      navigationOptions: {
        headerTitle: "Add A Counter"
      }
    },
    MyProjects: {
      screen: MyProjectsScreen,
    },
    ProjectDetails: ProjectDetailsScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "MyProjects",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const KnitCountNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
    Create: ProjectCreateNavigator
  }
);

export default createAppContainer(KnitCountNavigator);
