import { Audio } from 'expo-av';
import {isAudioEnabled} from "expo-av/build/Audio/AudioAvailability";
import * as Sentry from 'sentry-expo';

import Sounds from "./Sounds";
import SoundType from "./SoundType";

class AudioManager {

  constructor() {
    /* Preload all sounds. */
    this.defaultTapSoundObject = new Audio.Sound();
    this.defaultTapSoundObject.loadAsync(require("../assets/sounds/taps/default_tap.wav")).then();
    this.defaultRipSoundObject = new Audio.Sound();
    this.defaultRipSoundObject.loadAsync(require("../assets/sounds/rips/default_rip.wav")).then();
    this.defaultCompleteSoundObject = new Audio.Sound();
    this.defaultCompleteSoundObject.loadAsync(require("../assets/sounds/complete/default_complete.mp3")).then();

    this.brickTapSoundObject = new Audio.Sound();
    this.brickTapSoundObject.loadAsync(require("../assets/sounds/taps/brick_tap.wav")).then();
    this.brickRipSoundObject = new Audio.Sound();
    this.brickRipSoundObject.loadAsync(require("../assets/sounds/rips/brick_rip.wav")).then();
    this.brickCompleteSoundObject = new Audio.Sound();
    this.brickCompleteSoundObject.loadAsync(require("../assets/sounds/complete/brick_complete.mp3")).then();

    this.catTapSoundObject = new Audio.Sound();
    this.catTapSoundObject.loadAsync(require("../assets/sounds/taps/cat_tap.wav")).then();
    this.catRipSoundObject = new Audio.Sound();
    this.catRipSoundObject.loadAsync(require("../assets/sounds/rips/cat_rip.wav")).then();
    this.catCompleteSoundObject = new Audio.Sound();
    this.catCompleteSoundObject.loadAsync(require("../assets/sounds/complete/cat_complete.mp3")).then();

    this.lightswitchTapSoundObject = new Audio.Sound();
    this.lightswitchTapSoundObject.loadAsync(require("../assets/sounds/taps/lightswitch_tap.wav")).then();
    this.lightswitchRipSoundObject = new Audio.Sound();
    this.lightswitchRipSoundObject.loadAsync(require("../assets/sounds/rips/lightswitch_rip.wav")).then();
    this.lightswitchCompleteSoundObject = new Audio.Sound();
    this.lightswitchCompleteSoundObject.loadAsync(require("../assets/sounds/complete/lightswitch_complete.mp3")).then();
  }

  playSound = async(name, soundType) => {
    if (!isAudioEnabled()) return undefined;
    if (name === Sounds.none) return undefined;
    const soundObject = this.getSoundObject(name, soundType);
    try {
      await soundObject.playFromPositionAsync(0);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  getSoundObject = (name, soundType) => {
    if (soundType === SoundType.tap) return this.getTapSound(name);
    if (soundType === SoundType.rip) return this.getRipSound(name);
    if (soundType === SoundType.complete) return this.getCompleteSound(name);
    return undefined;
  };

  getTapSound = (name) => {
    switch (name) {
      case Sounds.brick: return this.brickTapSoundObject;
      case Sounds.cat: return this.catTapSoundObject;
      case Sounds.lightswitch: return this.lightswitchTapSoundObject;
      default: return this.defaultTapSoundObject;
    }
  };

  getRipSound = (name) => {
    switch (name) {
      case Sounds.brick: return this.brickRipSoundObject;
      case Sounds.cat: return this.catRipSoundObject;
      case Sounds.lightswitch: return this.lightswitchRipSoundObject;
      default: return this.defaultRipSoundObject;
    }
  };

  getCompleteSound = (name) => {
    switch (name) {
      case Sounds.brick: return this.brickCompleteSoundObject;
      case Sounds.cat: return this.catCompleteSoundObject;
      case Sounds.lightswitch: return this.lightswitchCompleteSoundObject;
      default: return this.lightswitchCompleteSoundObject;
    }
  };

}

export default new AudioManager();
