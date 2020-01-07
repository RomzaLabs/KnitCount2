import React, {useState} from 'react';
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

enableScreens();

const fetchFonts = async () => {
  await Font.loadAsync({
    'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
    'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
    'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "avenir-roman"
  }
});
