import { Audio } from 'expo-av';

import { Taps, Rips, Complete } from "./Sounds";

const bubblePop = require("../assets/sounds/taps/bubble-pop.wav");
const frog = require("../assets/sounds/rips/frog.wav");
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

  playRipSound = async(name) => {
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Rips.frog:
        default:
          await soundObject.loadAsync(frog);
          await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Unable to play rip sound: ", error);
    }
  };

  playCompleteSound = async(name) => {
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Complete.yay:
        default:
          await soundObject.loadAsync(yay);
          await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Unable to play complete sound: ", error);
    }
  };

}

export default new AudioManager();
