import Colors from "../constants/Colors";

class AppSettings {
  constructor(isPremium = false, mainColor = Colors.primaryColor) {
    this.isPremium = isPremium;
    this.mainColor = mainColor;
  }
}

export default AppSettings;
