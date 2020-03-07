import Colors from "../constants/Colors";
import {FilterPreference} from "./FilterPreference";
import Sounds from "../constants/Sounds";

class AppSettings {

  constructor(
    id = 1,
    isPremium = false,
    mainColor = Colors.primaryColor,
    mainTextColor = Colors.primaryTextColor,
    mainBGColor = Colors.primaryBGColor,
    filterPreference = FilterPreference.WIP,
    interactionsTowardsReviewAsk = 0,
    lastAskedToReviewDate = null,
    audioPack = Sounds.default
  ) {
    this.id = id;
    this.isPremium = isPremium;
    this.mainColor = mainColor;
    this.mainTextColor = mainTextColor;
    this.mainBGColor = mainBGColor;
    this.filterPreference = filterPreference;
    this.interactionsTowardsReviewAsk = interactionsTowardsReviewAsk;
    this.lastAskedToReviewDate = lastAskedToReviewDate;
    this.audioPack = audioPack;
  }

}

export default AppSettings;
