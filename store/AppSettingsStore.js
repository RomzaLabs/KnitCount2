import {observable, action, computed} from "mobx";

import Colors from "../constants/Colors";
import {FilterPreference} from "../models/FilterPreference";
import {updateSettings} from "../store/db";


class AppSettingsStore {

  // Observable Props
  @observable settings = null;

  // Computed Props
  @computed get mainColor() { return this.settings ? this.settings.mainColor : Colors.primaryColor; }
  @computed get mainTextColor() { return this.settings ? this.settings.mainTextColor : Colors.primaryTextColor; }
  @computed get mainBGColor() { return this.settings ? this.settings.mainBGColor : Colors.primaryBGColor; }
  @computed get filterPreference() { return this.settings ? this.settings.filterPreference : FilterPreference.WIP; }

  // Actions
  @action
  setSettings = (settings) => {
    this.settings = settings;
  };

  @action
  updateFilterPreference = (filterPreference) => {
    this.settings.filterPreference = filterPreference;
    this.persistSettings();
  };

  persistSettings = () => {
    updateSettings(this.settings);
  }

}

export default new AppSettingsStore();
