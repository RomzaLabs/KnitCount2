import React from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import SafeAreaView from 'react-native-safe-area-view';
import { observer } from "mobx-react";

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";

const MyProjectsScreen = (props) => {
  const { projects } = ProjectsStore;

  const renderKnitCountCard = (project) => {
    return (
      <KnitCountProjectCard
        onPress={() => {
          ProjectsStore.setSelectedProject(project);
          props.navigation.navigate("ProjectDetails");
        }}
        image={project.imageUris.length ? project.imageUris[0] : null}
        title={project.name}
        status={project.status}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addProjectContainer}>
        <KnitCountAddButton
          mainColor={AppSettingsStore.mainColor}
          mainTextColor={AppSettingsStore.mainTextColor}
          onPress={() => props.navigation.navigate("CreateProject")}
        />
      </View>
      <FlatList
        style={styles.projectsContainer}
        data={projects}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={({item}) => renderKnitCountCard(item)}
      />
    </SafeAreaView>
  );
};

MyProjectsScreen.navigationOptions = (navData) => {
  return (
    {
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="My Projects">
            <Item
              title="Settings"
              iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
              onPress={() => navData.navigation.navigate('Settings')}
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
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  addProjectContainer: {
    margin: 12
  },
  projectsContainer: {
    marginHorizontal: 12
  }
});

export default observer(MyProjectsScreen);
