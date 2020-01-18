import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { inject, observer } from "mobx-react";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";

import PROJECTS from "../constants/DummyData";

const MyProjectsScreen = (props) => {
  const dummyProject = PROJECTS[0];
  const { projects } = props.projectsStore;

  return (
    <View>
      <View style={styles.section}>
        <KnitCountAddButton onPress={() => props.navigation.navigate("CreateProject")} />
      </View>
      <View style={styles.section}>
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

const styles = StyleSheet.create({
  section: {
    margin: 12
  }
});

export default inject("projectsStore")(observer(MyProjectsScreen));
