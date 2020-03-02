import { Audio } from 'expo-av';
import {isAudioEnabled} from "expo-av/build/Audio/AudioAvailability";
import * as Sentry from 'sentry-expo';

import { Taps, Rips, Complete } from "./Sounds";

const tap = require("../assets/sounds/taps/default_tap.wav");
const rip = require("../assets/sounds/rips/default_rip.wav");
const complete = require("../assets/sounds/complete/default_complete.mp3");

class AudioManager {

  playTapSound = async(name) => {
    if (!isAudioEnabled()) return undefined;
    const soundObject = new Audio.Sound();
    try {
      switch (name) {
        case Taps.default:
        default:
          await soundObject.loadAsync(tap);
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
        case Rips.default:
        default:
          await soundObject.loadAsync(rip);
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
        case Complete.default:
        default:
          await soundObject.loadAsync(complete);
          await soundObject.playAsync();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

}

export default new AudioManager();
