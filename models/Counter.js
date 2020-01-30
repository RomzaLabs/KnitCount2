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
export const IncreaseCounter = new Counter(1, 1, "Increase");
export const DecreaseCounter = new Counter(2, 1,"Decrease");
export const RowCounter = new Counter(3, 1,"Row");
export const RepeatCounter = new Counter(4, 1, "Repeat");

export default Counter;
