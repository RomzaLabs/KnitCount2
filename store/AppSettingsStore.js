import {observable, action, computed} from "mobx";
import Colors from "../constants/Colors";

class AppSettingsStore {

  // Observable Props
  @observable settings = null;
  @observable mainColor = Colors.primaryColor;
  @observable mainTextColor = Colors.primaryTextColor;

  // Computed Props

  // Actions
  @action
  setSettings = (settings) => {
    this.settings = settings;
    this.mainColor = settings.mainColor;
    this.mainTextColor = settings.mainTextColor;
  };

}

export default new AppSettingsStore();
