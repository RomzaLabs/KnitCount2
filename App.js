import React, {useState} from 'react';
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';
import ProjectsStore from "./store/ProjectsStore";
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import 'mobx-react-lite/batchingForReactNative';

import KnitCountNavigator from "./navigation/KnitCountNavigator";
import AppSettingsStore from "./store/AppSettingsStore";
import AppSettings from "./models/AppSettings";
import {FilterPreference} from "./models/FilterPreference";
import Colors from "./constants/Colors";
import { initProjects } from './store/projectsDbHelper';
import { initSettings, fetchSettings, insertSettings } from './store/settingsDbHelper';
import Sounds from "./constants/Sounds";

Sentry.init({
  dsn: 'https://0d46591ae0b9460f925fb006d1432a34@sentry.io/2980617',
  enableInExpoDevelopment: true,
  debug: true
});

Sentry.setRelease(Constants.manifest.revisionId);

enableScreens();
try {
  initProjects();
  initSettings();
} catch (e) {
  Sentry.captureException(e);
}

const loadFonts = async () => {
  return await Font.loadAsync({
    'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
    'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf')
  });
};

const loadSettings = async() => {
  try {
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
        null,
        Sounds.default
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
        dbSettings.last_asked_to_review_date,
        dbSettings.audio_pack
      );
      AppSettingsStore.setSettings(userSettings);
    }
  } catch (e) {
    Sentry.captureException(e);
  }
};

const loadKnitCount = async () => {
  try {
    await loadFonts();
  } catch (e) {
    Sentry.captureException(e);
  }

  try {
    await loadSettings();
  } catch (e) {
    Sentry.captureException(e);
  }

  try {
    await ProjectsStore.loadProjectsFromDB(0, 20);
  } catch (e) {
    Sentry.captureException(e);
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
