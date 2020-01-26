import {observable, action, computed} from "mobx";
import Colors from "../constants/Colors";

class AppSettingsStore {

  // Observable Props
  @observable settings = null;
  @observable mainColor = Colors.primaryColor;
  @observable mainTextColor = Colors.primaryTextColor;
  @observable mainBGColor = Colors.primaryBGColor;

  // Computed Props

  // Actions
  @action
  setSettings = (settings) => {
    this.settings = settings;
    this.mainColor = settings.mainColor;
    this.mainTextColor = settings.mainTextColor;
    this.mainBGColor = settings.mainBGColor;
  };

}

export default new AppSettingsStore();
