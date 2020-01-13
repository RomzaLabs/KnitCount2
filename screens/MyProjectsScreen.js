import React from 'react';
import { View, Text, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import Colors from "../constants/Colors";

const MyProjectsScreen = (props) => {
  return (
    <View style={{marginLeft: 12, marginRight: 12}}>
      <Text>My Projects</Text>
      <View>
        <KnitCountAddButton onPress={() => props.navigation.navigate("CreateProject")} />
      </View>
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
