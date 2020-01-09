import React from 'react';
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";

import AddCounterScreen from "../screens/AddCounterScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import MyProjectsScreen from "../screens/MyProjectsScreen";
import ProjectDetailsScreen from "../screens/ProjectDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "avenir-black"
  },
  headerBackTitleStyle: {
    fontFamily: "avenir-roman"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

const KnitCountNavigator = createStackNavigator(
  {
    AddCounter: AddCounterScreen,
    CreateProject: CreateProjectScreen,
    MyProjects: MyProjectsScreen,
    ProjectDetails: ProjectDetailsScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "MyProjects",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

export default createAppContainer(KnitCountNavigator);
