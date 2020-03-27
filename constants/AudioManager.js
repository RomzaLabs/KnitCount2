import { Audio } from 'expo-av';
import {isAudioEnabled} from "expo-av/build/Audio/AudioAvailability";
import * as Sentry from 'sentry-expo';

import Sounds from "./Sounds";
import SoundType from "./SoundType";

const default_tap = require("../assets/sounds/taps/default_tap.wav");
const default_rip = require("../assets/sounds/rips/default_rip.wav");
const default_complete = require("../assets/sounds/complete/default_complete.mp3");
const brick_tap = require("../assets/sounds/taps/brick_tap.wav");
const brick_rip = require("../assets/sounds/rips/brick_rip.wav");
const brick_complete = require("../assets/sounds/complete/brick_complete.mp3");
const cat_tap = require("../assets/sounds/taps/cat_tap.wav");
const cat_rip = require("../assets/sounds/rips/cat_rip.wav");
const cat_complete = require("../assets/sounds/complete/cat_complete.mp3");
const lightswitch_tap = require("../assets/sounds/taps/lightswitch_tap.wav");
const lightswitch_rip = require("../assets/sounds/rips/lightswitch_rip.wav");
const lightswitch_complete = require("../assets/sounds/complete/lightswitch_complete.mp3");

class AudioManager {

  playSound = async(name, soundType) => {
    if (!isAudioEnabled()) return undefined;
    if (name === Sounds.none) return undefined;
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      staysActiveInBackground: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true
    });
    const soundObject = new Audio.Sound();
    const source = this.getSource(name, soundType);
    try {
      await soundObject.loadAsync(source);
      await soundObject.playAsync();
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  getSource = (name, soundType) => {
    if (soundType === SoundType.tap) return this.getTapSound(name);
    if (soundType === SoundType.rip) return this.getRipSound(name);
    if (soundType === SoundType.complete) return this.getCompleteSound(name);
    return undefined;
  };

  getTapSound = (name) => {
    switch (name) {
      case Sounds.brick: return brick_tap;
      case Sounds.cat: return cat_tap;
      case Sounds.lightswitch: return lightswitch_tap;
      default: return default_tap;
    }
  };

  getRipSound = (name) => {
    switch (name) {
      case Sounds.brick: return brick_rip;
      case Sounds.cat: return cat_rip;
      case Sounds.lightswitch: return lightswitch_rip;
      default: return default_rip;
    }
  };

  getCompleteSound = (name) => {
    switch (name) {
      case Sounds.brick: return brick_complete;
      case Sounds.cat: return cat_complete;
      case Sounds.lightswitch: return lightswitch_complete;
      default: return default_complete;
    }
  };

}

export default new AudioManager();
