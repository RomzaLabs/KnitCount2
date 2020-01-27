import Colors from "../constants/Colors";
import {FilterPreference} from "./FilterPreference";

class AppSettings {

  constructor(
    isPremium = false,
    mainColor = Colors.primaryColor,
    mainTextColor = Colors.primaryTextColor,
    mainBGColor = Colors.primaryBGColor,
    filterPreference = FilterPreference.WIP
  ) {
    this.isPremium = isPremium;
    this.mainColor = mainColor;
    this.mainTextColor = mainTextColor;
    this.mainBGColor = mainBGColor;
    this.filterPreference = filterPreference;
  }

}

export default AppSettings;
