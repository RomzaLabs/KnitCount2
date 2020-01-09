import React from 'react';
import { View, Text, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import Colors from "../constants/Colors";

const MyProjectsScreen = (props) => {
  return (
    <View>
      <Text>My Projects</Text>
      <Button
        color={Colors.primaryColor}
        title="Add Project"
        onPress={() => props.navigation.navigate("CreateProject")}
      />
      <Button
        color={Colors.primaryColor}
        title="Project Details"
        onPress={() => props.navigation.navigate("ProjectDetails")}
      />
    </View>
  );
};

MyProjectsScreen.navigationOptions = (navData) => {
  return (
    {
      headerTitle: "My Projects",
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton}>
            <Item
              title="Settings"
              iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
              onPress={() => navData.navigation.navigate('Settings')}
            />
          </HeaderButtons>
        );
      }
    }
  );
};

export default MyProjectsScreen;
