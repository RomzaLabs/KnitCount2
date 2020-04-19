import React, {useState, useEffect} from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import SafeAreaView from 'react-native-safe-area-view';
import { observer } from "mobx-react";
import * as StoreReview from 'expo-store-review';

import AppSettingsStore from "../store/AppSettingsStore";
import ProjectsStore from "../store/ProjectsStore";

import KnitCountHeaderButton from "../components/buttons/KnitCountHeaderButton";
import KnitCountAddButton from "../components/buttons/KnitCountAddButton";
import KnitCountProjectCard from "../components/KnitCountProjectCard";
import {ProjectStatus} from "../models/ProjectStatus";
import {FilterPreference} from "../models/FilterPreference";
import KnitCountTutorialModal from "../components/modals/KnitCountTutorialModal";
import KnitCountFilterModal from "../components/modals/KnitCountFilterModal";

const MyProjectsScreen = observer((props) => {
  const [projects, setProjects] = useState([]);
  const [filterPreference, setFilterPreference] = useState(ProjectStatus.WIP);
  const [isTutorialModalVisible, setIsTutorialModalVisible] = useState(true);
  const projectsRef = ProjectsStore.projects;

  const LIMIT = 20;
  const [offset, setOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (AppSettingsStore.allowedToAskForReview) {
    const _ = StoreReview.requestReview();
    AppSettingsStore.resetInteractionsTowardsReviewAsk();
    AppSettingsStore.doneWithAppOpened(); // Ask only once.
  }

  useEffect(() => {
    props.navigation.setParams({filterPreference});
  }, [filterPreference]);

  const setFilteredProjects = () => {
    const filteredProjects = ProjectsStore.projects
      .filter(p => {
        if (filterPreference === FilterPreference.WIP) return p.status === ProjectStatus.WIP;
        if (filterPreference === FilterPreference.FO) return p.status === ProjectStatus.FO;
        return true;
      })
      .sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
    setProjects(filteredProjects);
  };

  useEffect(() => { setFilteredProjects() }, [projectsRef]);

  useEffect(() => {
    setFilterPreference(AppSettingsStore.filterPreference);
    setFilteredProjects();
  }, [filterPreference]);

  const toggleTutorialModalVisible = () => {
    AppSettingsStore.resetInteractionsTowardsReviewAsk();
    setIsTutorialModalVisible(!isTutorialModalVisible);
  }

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
        textColor={AppSettingsStore.mainTextColor}
      />
    );
  };

  const renderFilterModal = () => {
    return (
      <KnitCountFilterModal
        isVisible={ProjectsStore.isProjectModalVisible}
        onBackdropPress={ProjectsStore.toggleProjectModalVisible}
        onFilterChosen={setFilterPreference}
      />
    );
  };

  const renderTutorialModal = () => {
    if (!AppSettingsStore.allowedToShowTutorial) return undefined;
    return <KnitCountTutorialModal isVisible={isTutorialModalVisible} onBackdropPress={toggleTutorialModalVisible}/>;
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
        refreshing={isRefreshing}
        onEndReachedThreshold={3}
        onEndReached={({distanceFromEnd}) => {
          if (projects.length % LIMIT === 0) {
            setIsRefreshing(true);
            const newOffset = offset + LIMIT;
            setOffset(newOffset);
            ProjectsStore.loadProjectsFromDB(newOffset, LIMIT).then(() => {
              setFilteredProjects();
              setIsRefreshing(false);
            })
          }
        }}
      />
      { renderFilterModal() }
      { renderTutorialModal() }
    </SafeAreaView>
  );
});

MyProjectsScreen.navigationOptions = (navData) => {
  const filterPreference = navData.navigation.getParam("filterPreference");
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
      headerTitle: () => (
        <View style={styles.myProjectsCustomHeader}>
          <Text style={[styles.myProjectsTitle, {color: AppSettingsStore.mainTextColor}]}>My Projects</Text>
          <Text style={[styles.myProjectsSubtitle, {color: AppSettingsStore.mainTextColor}]}>{filterPreference}</Text>
        </View>
      ),
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
  myProjectsCustomHeader: {
    width: '100%',
    maxWidth: 250,
    justifyContent: "center",
    alignItems: Platform.OS === "android" ? "flex-start" : "center"
  },
  myProjectsTitle: {
    fontFamily: "avenir-black",
    fontSize: 22
  },
  myProjectsSubtitle: {
    fontFamily: "avenir-roman",
    fontSize: 14
  }
});

export default MyProjectsScreen;
