import { Audio } from 'expo-av';

import { Taps, Rips, Complete } from "./Sounds";

const bubblePop = require("../assets/sounds/taps/bubble-pop.wav");
const yay = require("../assets/sounds/complete/yay.mp3");

class AudioManager {

  playTapSound = async(name) => {
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Taps.bubblePop:
        default:
          await soundObject.loadAsync(bubblePop);
          await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Unable to play tap sound: ", error);
    }
  };

}

export default new AudioManager();
