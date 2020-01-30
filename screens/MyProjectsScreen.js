import React, {useState, useEffect} from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import SafeAreaView from 'react-native-safe-area-view';
import { observer } from "mobx-react";
import Modal from "react-native-modal";

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";

import KnitCountHeaderButton from "../components/KnitCountHeaderButton";
import KnitCountAddButton from "../components/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";
import {ProjectStatus} from "../models/ProjectStatus";
import {FilterPreference} from "../models/FilterPreference";

const MyProjectsScreen = (props) => {
  const projectCount = ProjectsStore.projects.length;
  const [projects, setProjects] = useState([]);
  const [filterPreference, setFilterPreference] = useState(AppSettingsStore.filterPreference);

  useEffect(() => {
    const filteredProjects = ProjectsStore.projects.filter(p => {
      if (filterPreference === FilterPreference.WIP) return p.status === ProjectStatus.WIP;
      if (filterPreference === FilterPreference.FO) return p.status === ProjectStatus.FO;
      return true;
    });
    setProjects(filteredProjects);
  }, [projectCount, filterPreference]);

  const renderKnitCountCard = (project) => {
    return (
      <KnitCountProjectCard
        onPress={() => {
          ProjectsStore.setSelectedProject(project);
          props.navigation.navigate("ProjectDetails");
        }}
        image={project.images.length ? project.images[0] : null}
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
          onPress={() => props.navigation.navigate("Create")}
        />
      </View>
      <FlatList
        style={styles.projectsContainer}
        data={projects}
        keyExtractor={item => projects.indexOf(item).toString()}
        renderItem={({item}) => renderKnitCountCard(item)}
      />
      <Modal isVisible={ProjectsStore.isProjectModalVisible} onBackdropPress={ProjectsStore.toggleProjectModalVisible}>
        <View style={[styles.filterContent, {backgroundColor: AppSettingsStore.mainBGColor}]}>
          <Text style={[styles.popupTitle,{color: AppSettingsStore.mainTextColor}]}>Filter Projects</Text>
          <View style={styles.filterBtnContainer}>
            <Button
              style={[styles.filterButton]}
              title="💪 All Projects 💪"
              color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
              onPress={() => {
                setFilterPreference(FilterPreference.ALL);
                AppSettingsStore.updateFilterPreference(FilterPreference.ALL);
                ProjectsStore.toggleProjectModalVisible();
              }}
            />
          </View>
          <View style={styles.filterBtnContainer}>
            <Button
              style={[styles.filterButton]}
              title="🚧 Only WIPs 🚧"
              color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
              onPress={() => {
                setFilterPreference(FilterPreference.WIP);
                AppSettingsStore.updateFilterPreference(FilterPreference.WIP);
                ProjectsStore.toggleProjectModalVisible();
              }}
            />
          </View>
          <View style={styles.filterBtnContainer}>
            <Button
              style={[styles.filterButton]}
              title="✨ Only FOs ✨"
              color={Platform.OS === "android" ? AppSettingsStore.mainColor : AppSettingsStore.mainTextColor}
              onPress={() => {
                setFilterPreference(FilterPreference.FO);
                AppSettingsStore.updateFilterPreference(FilterPreference.FO);
                ProjectsStore.toggleProjectModalVisible();
              }}
            />
          </View>
        </View>
      </Modal>
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
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={KnitCountHeaderButton} title="Filter">
            <Item
              title="Filter"
              iconName={Platform.OS === "android" ? "md-funnel" : "ios-funnel"}
              onPress={() => ProjectsStore.toggleProjectModalVisible()}
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
  },
  filterContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  popupTitle: {
    fontFamily: "avenir-black",
    fontSize: 18,
    margin: 10
  },
  filterBtnContainer: {
    margin: 6,
    width: 200,
  },
  filterButton: {
    width: 200
  }
});

export default observer(MyProjectsScreen);
