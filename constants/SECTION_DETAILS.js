export const MARK_FINISHED_BTN_ID = "markFinishedBtn";
export const UPDATE_TITLE_BTN_ID = "updateTitleBtn";
export const DELETE_PROJECT_BTN_ID = "deleteProjectBtn";

export const SECTION_DETAILS = {
  COUNTERS: {
    key: 0,
    title: "",
    data: []
  },
  PHOTOS: {
    key: 1,
    title: "Photos",
    data: []
  },
  NOTES: {
    key: 2,
    title: "Notes",
    data: []
  },
  ACTIONS: {
    key: 3,
    title: "",
    data: [MARK_FINISHED_BTN_ID, UPDATE_TITLE_BTN_ID, DELETE_PROJECT_BTN_ID]
  }
};

export default SECTION_DETAILS;
