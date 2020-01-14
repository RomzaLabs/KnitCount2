import React from 'react';
import { View, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";

import PROJECTS from "../constants/DummyData";

const MyProjectsScreen = (props) => {
  const dummyProject = PROJECTS[0];

  return (
    <View>
      <View style={{margin: 12}}>
        <KnitCountAddButton onPress={() => props.navigation.navigate("CreateProject")} />
      </View>
      <View style={{margin: 12}}>
        <KnitCountProjectCard
          onPress={() => props.navigation.navigate("ProjectDetails")}
          image={dummyProject.imageUris[0]}
          title={dummyProject.name}
          status={dummyProject.status}
        />
      </View>
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
