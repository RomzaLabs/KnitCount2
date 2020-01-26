import React from 'react';
import { createAppContainer } from "react-navigation";
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
    fontSize: 32,
    color: AppSettingsStore.mainTextColor
  },
  headerBackTitleStyle: {
    fontFamily: "avenir-roman",
    color: AppSettingsStore.mainTextColor
  },
  headerTintColor: AppSettingsStore.mainTextColor
};

const KnitCountNavigator = createStackNavigator(
  {
    AddCounter: {
      screen: AddCounterScreen,
      navigationOptions: {
        headerTitle: "Add A Counter"
      }
    },
    CreateProject: {
      screen: CreateProjectScreen,
      navigationOptions: {
        headerTitle: ""
      }
    },
    MyProjects: {
      screen: MyProjectsScreen,
      navigationOptions: {
        headerTitle: "My Projects"
      }
    },
    ProjectDetails: ProjectDetailsScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "MyProjects",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

export default createAppContainer(KnitCountNavigator);
