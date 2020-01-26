import React from 'react';
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
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: "avenir-black",
    fontSize: 32,
    color: Colors.primaryTextColor
  },
  headerBackTitleStyle: {
    fontFamily: "avenir-roman",
    color: "white"
  },
  headerTintColor: Colors.primaryTextColor
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
