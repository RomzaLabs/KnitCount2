import React, {useState} from 'react';
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';
import ProjectsStore from "./store/ProjectsStore";

import KnitCountNavigator from "./navigation/KnitCountNavigator";
import PROJECTS from "./constants/DummyData";
import AppSettingsStore from "./store/AppSettingsStore";
import AppSettings from "./models/AppSettings";
import {FilterPreference} from "./models/FilterPreference";
import Colors from "./constants/Colors";
import { init, insertProject, fetchProjects } from './store/db';

init().then(async() => {
  console.log('Initialized database');
  const project = PROJECTS[0];
  const dbResult = await insertProject(project);
  //const dbResult = await fetchProjects(0, 2);
  console.log("dbResult: ", dbResult)
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
  ProjectsStore.loadProjects(PROJECTS);
  // End temporary handling.

  return <KnitCountNavigator/>;
}
