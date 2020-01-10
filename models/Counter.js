class Counter {
  constructor(id, label, value = 0, stepsPerCount = 1) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.stepsPerCount = stepsPerCount;
  }
}

// Presets
export const IncreaseCounter = new Counter(1, "Increase");
export const DecreaseCounter = new Counter(2, "Decrease");
export const RowCounter = new Counter(3, "Row");
export const RepeatCounter = new Counter(4, "Repeat");

export default Counter;
