class Counter {
  constructor(id, projectId, label, value = 0, stepsPerCount = 1) {
    this.id = id;
    this.projectId = projectId;
    this.label = label;
    this.value = value;
    this.stepsPerCount = stepsPerCount;
  }
}

// Presets
export const RowCounter = new Counter(null, null, "Row");
export const RepeatCounter = new Counter(null, null, "Repeat");
export const IncreaseCounter = new Counter(null, null, "Increase");
export const DecreaseCounter = new Counter(null, null, "Decrease");
export const PRESET_COUNTERS = [RowCounter, RepeatCounter, IncreaseCounter, DecreaseCounter];

export default Counter;
