import Colors from "../constants/Colors";

class AppSettings {
  constructor(
    isPremium = false,
    mainColor = Colors.primaryColor,
    mainTextColor = Colors.primaryTextColor,
    mainBGColor = Colors.primaryBGColor
  ) {
    this.isPremium = isPremium;
    this.mainColor = mainColor;
    this.mainTextColor = mainTextColor;
    this.mainBGColor = mainBGColor;
  }
}

export default AppSettings;
