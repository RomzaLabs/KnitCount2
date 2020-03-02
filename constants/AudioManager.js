import { Audio } from 'expo-av';
import {isAudioEnabled} from "expo-av/build/Audio/AudioAvailability";
import * as Sentry from 'sentry-expo';

import { Taps, Rips, Complete } from "./Sounds";

const bubblePop = require("../assets/sounds/taps/bubble-pop.wav");
const frog = require("../assets/sounds/rips/frog.wav");
const yay = require("../assets/sounds/complete/yay.mp3");

class AudioManager {

  playTapSound = async(name) => {
    if (!isAudioEnabled()) return undefined;
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Taps.bubblePop:
        default:
          await soundObject.loadAsync(bubblePop);
          await soundObject.playAsync();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  playRipSound = async(name) => {
    if (!isAudioEnabled()) return undefined;
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Rips.frog:
        default:
          await soundObject.loadAsync(frog);
          await soundObject.playAsync();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  playCompleteSound = async(name) => {
    if (!isAudioEnabled()) return undefined;
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Complete.yay:
        default:
          await soundObject.loadAsync(yay);
          await soundObject.playAsync();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

}

export default new AudioManager();
