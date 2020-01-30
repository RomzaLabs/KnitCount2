import React, {useState} from 'react';
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';
import ProjectsStore from "./store/ProjectsStore";

import KnitCountNavigator from "./navigation/KnitCountNavigator";
import AppSettingsStore from "./store/AppSettingsStore";
import AppSettings from "./models/AppSettings";
import {FilterPreference} from "./models/FilterPreference";
import Colors from "./constants/Colors";
import { initProjects, fetchProjects, fetchCountersForProject, fetchImageUrisForProject } from './store/db';
import Counter from "./models/Counter";
import Project from "./models/Project";

enableScreens();
initProjects();

const loadFonts = async () => {
  return await Font.loadAsync({
    'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
    'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf')
  });
};

const loadSettings = async() => {
  // Temporary handling.
  const appSettings = new AppSettings(
    true,
    Colors.primaryColor,
    Colors.primaryTextColor,
    Colors.primaryBGColor,
    FilterPreference.ALL
  );
  AppSettingsStore.setSettings(appSettings);
  // End temporary handling.
};

const loadProjects = async() => {
  const dbResult = await fetchProjects(0, 20);
  const dbProjects = dbResult.rows._array;

  let projects = [];
  for (const dbProject of dbProjects) {
    const projectId = dbProject.id;

    const dbCountersResult = await fetchCountersForProject(projectId);
    const dbCounters = dbCountersResult.rows._array;
    const counters = dbCounters.map(c => new Counter(c.id, c.project_id, c.label, c.value, c.stepsPerCount));

    const dbImageUrisResult = await fetchImageUrisForProject(projectId);
    const dbImageUris = dbImageUrisResult.rows._array;
    const imageUris = dbImageUris.map(i => i.imageUri);

    const project = new Project(
      projectId,
      dbProject.name,
      dbProject.status,
      counters,
      dbProject.notes,
      imageUris,
      dbProject.startDate,
      dbProject.modifiedDate,
      dbProject.endDate
    );
    projects.push(project);
  }
  ProjectsStore.loadProjects(projects);
};

const loadKnitCount = async () => {
  try {
    await loadFonts();
  } catch (e) {
    console.error("Error loading fonts.", e);
  }

  try {
    await Promise.resolve("settings");
  } catch (e) {
    console.error("Error loading settings.", e);
  }

  try {
    await loadProjects();
  } catch (e) {
    console.error("Error loading projects.", e);
  }
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) {
    return (
      <AppLoading
        startAsync={loadKnitCount}
        onFinish={() => setAppLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <KnitCountNavigator/>;
}
