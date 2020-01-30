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
import { init, fetchProjects, fetchCountersForProject, fetchImageUrisForProject } from './store/db';
import Counter from "./models/Counter";
import Project from "./models/Project";

init().then(async() => {
  console.log('Initialized database');
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
}).catch((err) => {
  console.log('Received error: ', err);
});

enableScreens();

const fetchFonts = async () => {
  await Font.loadAsync({
    'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
    'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />;
  }

  // Temporary handling.
  const appSettings = new AppSettings(
    true,
    Colors.primaryColor,
    Colors.primaryTextColor,
    Colors.primaryBGColor,
    FilterPreference.WIP
  );
  AppSettingsStore.setSettings(appSettings);
  // End temporary handling.

  return <KnitCountNavigator/>;
}
