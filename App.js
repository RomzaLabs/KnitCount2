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
import { initProjects, fetchProjects, fetchCountersForProject, fetchImagesForProject } from './store/projectsDbHelper';
import { initSettings, fetchSettings, insertSettings } from './store/settingsDbHelper';
import Counter from "./models/Counter";
import Project from "./models/Project";
import Image from "./models/Image";

enableScreens();
initProjects();
initSettings();

const loadFonts = async () => {
  return await Font.loadAsync({
    'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
    'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf')
  });
};

const loadSettings = async() => {
  const dbResult = await fetchSettings();
  const isBrandNewUser = dbResult.rows.length === 0;
  if (isBrandNewUser) {
    const defaultSettings = new AppSettings(
      1,
      false,
      Colors.primaryColor,
      Colors.primaryTextColor,
      Colors.primaryBGColor,
      FilterPreference.WIP,
      0,
      null
    );
    AppSettingsStore.setSettings(defaultSettings);
    await insertSettings(defaultSettings);
  } else {
    const dbSettings = dbResult.rows._array[0];
    const userSettings = new AppSettings(
      dbSettings.id,
      dbSettings.is_premium,
      dbSettings.main_color,
      dbSettings.main_text_color,
      dbSettings.main_bg_color,
      dbSettings.filter_preference,
      dbSettings.interactions_towards_review_ask,
      dbSettings.last_asked_to_review_date
    );
    AppSettingsStore.setSettings(userSettings);
  }
};

const loadProjects = async() => {
  const dbResult = await fetchProjects(0, 20);
  const dbProjects = dbResult.rows._array;

  let projects = [];
  for (const dbProject of dbProjects) {
    const projectId = dbProject.id;

    const dbCountersResult = await fetchCountersForProject(projectId);
    const dbCounters = dbCountersResult.rows._array;
    const counters = dbCounters.map(c => new Counter(c.id, c.project_id, c.label, c.value, c.steps_per_count));

    const dbImagesResult = await fetchImagesForProject(projectId);
    const dbImages = dbImagesResult.rows._array;
    const images = dbImages.map(i => new Image(i.id, i.project_id, i.image_uri, i.date_added));

    const project = new Project(
      projectId,
      dbProject.name,
      dbProject.status,
      counters,
      dbProject.notes,
      images,
      dbProject.start_date,
      dbProject.modified_date,
      dbProject.end_date
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
    await loadSettings();
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
