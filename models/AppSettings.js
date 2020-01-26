import Colors from "../constants/Colors";

class AppSettings {
  constructor(isPremium = false, mainColor = Colors.primaryColor, mainTextColor = Colors.primaryTextColor) {
    this.isPremium = isPremium;
    this.mainColor = mainColor;
    this.mainTextColor = mainTextColor;
  }
}

export default AppSettings;
