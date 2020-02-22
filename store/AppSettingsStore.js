import {observable, action, computed} from "mobx";

import Colors from "../constants/Colors";
import {FilterPreference} from "../models/FilterPreference";
import { updateSettings } from "../store/settingsDbHelper";


class AppSettingsStore {

  // Observable Props
  @observable settings = null;
  @observable appOpened = true; // Immediately flipped to false. Used to detect first launch.

  // Computed Props
  @computed get mainColor() { return this.settings ? this.settings.mainColor : Colors.primaryColor; }
  @computed get mainTextColor() { return this.settings ? this.settings.mainTextColor : Colors.primaryTextColor; }
  @computed get mainBGColor() { return this.settings ? this.settings.mainBGColor : Colors.primaryBGColor; }
  @computed get filterPreference() { return this.settings ? this.settings.filterPreference : FilterPreference.WIP; }

  @computed get allowedToAskForReview() {
    const {interactionsTowardsReviewAsk, lastAskedToReviewDate} = this.settings;

    const MIN_INTERACTIONS = 50;
    const MIN_DAYS_BETWEEN_ASK = 14;
    const FOURTEEN_DAYS = MIN_DAYS_BETWEEN_ASK * 24 * 60 * 60 * 1000; // Not all days are 24 hours, but whatever.
    const interactions = interactionsTowardsReviewAsk ? interactionsTowardsReviewAsk : 0;
    const enoughInteractions = interactions >= MIN_INTERACTIONS;

    if (!lastAskedToReviewDate) {
      // Never asked before so we can ask as long as they have more than MIN_INTERACTIONS;
      return this.appOpened && enoughInteractions;
    } else {
      // Calculate days since last ask. Only ask at most every 2 weeks.
      const today = +new Date();
      const enoughDays = (today - FOURTEEN_DAYS) >= lastAskedToReviewDate;
      return this.appOpened && enoughInteractions && enoughDays;
    }
  }

  // Actions
  @action setSettings = (settings) => this.settings = settings;

  @action doneWithAppOpened = () => this.appOpened = false;

  @action interactionTowardReviewAsk = () => {
    const {interactionsTowardsReviewAsk} = this.settings;
    const interactions = interactionsTowardsReviewAsk ? interactionsTowardsReviewAsk : 0;
    const newInteractionsCount = interactions + 1;
    this.settings = {...this.settings, interactionsTowardsReviewAsk: newInteractionsCount};
    this.persistSettings();
  };

  @action resetInteractionsTowardsReviewAsk = () => {
    const interactionsTowardsReviewAsk = 0;
    const lastAskedToReviewDate = +new Date();
    this.settings = {...this.settings, interactionsTowardsReviewAsk, lastAskedToReviewDate};
    this.persistSettings();
  };

  @action setColor = (color) => {
    switch (color) {
      case Colors.clearChillColor:
        this.settings = {
          ...this.settings,
          mainColor: Colors.clearChillColor,
          mainTextColor: Colors.clearChillTextColor,
          mainBGColor: Colors.clearChillBGColor
        };
        break;
      case Colors.watermelonColor:
        this.settings = {
          ...this.settings,
          mainColor: Colors.watermelonColor,
          mainTextColor: Colors.watermelonTextColor,
          mainBGColor: Colors.watermelonBGColor
        };
        break;
      case Colors.brightGreekColor:
        this.settings = {
          ...this.settings,
          mainColor: Colors.brightGreekColor,
          mainTextColor: Colors.brightGreekTextColor,
          mainBGColor: Colors.brightGreekBGColor
        };
        break;
      case Colors.coralColor:
        this.settings = {
          ...this.settings,
          mainColor: Colors.coralColor,
          mainTextColor: Colors.coralTextColor,
          mainBGColor: Colors.coralBGColor
        };
        break;
      case Colors.ufoColor:
        this.settings = {
          ...this.settings,
          mainColor: Colors.ufoColor,
          mainTextColor: Colors.ufoTextColor,
          mainBGColor: Colors.ufoBGColor
        };
        break;
      default: break;
    }
    this.persistSettings();
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
