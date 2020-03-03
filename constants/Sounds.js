class AudioPack {
  constructor(name) {
    this.tap = `/assets/sounds/taps/${name}_tap.wav`;
    this.rip = `/assets/sounds/rips/${name}_rip.wav`;
    this.complete = `/assets/sounds/complete/${name}_complete.wav`;
  }
}

const defaultPack = new AudioPack("default");
const brickPack = new AudioPack("brick");
const catPack = new AudioPack("cat");
const lightswitchPack = new AudioPack("lightswitch");

export const Sounds = {
  none: "no-sounds",
  default: defaultPack,
  brick: brickPack,
  cat: catPack,
  lightswitch: lightswitchPack
};
