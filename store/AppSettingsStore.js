import { observable, action } from "mobx";

class AppSettingsStore {

  // Observable Props
  @observable settings = null;

  // Computed Props

  // Actions
  @action
  setSettings = (settings) => {
    this.settings = settings;
  };

}

export default new AppSettingsStore();
