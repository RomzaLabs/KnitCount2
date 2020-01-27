import {observable, action} from "mobx";
import Colors from "../constants/Colors";
import {FilterPreference} from "../models/FilterPreference";

class AppSettingsStore {

  // Observable Props
  @observable settings = null;
  @observable mainColor = Colors.primaryColor;
  @observable mainTextColor = Colors.primaryTextColor;
  @observable mainBGColor = Colors.primaryBGColor;
  @observable filterPreference = FilterPreference.WIP;

  // Computed Props

  // Actions
  @action
  setSettings = (settings) => {
    this.settings = settings;
    this.mainColor = settings.mainColor;
    this.mainTextColor = settings.mainTextColor;
    this.mainBGColor = settings.mainBGColor;
    this.filterPreference = settings.filterPreference;
  };

}

export default new AppSettingsStore();
