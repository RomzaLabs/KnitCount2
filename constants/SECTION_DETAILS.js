export const MARK_FINISHED_BTN_ID = "markFinishedBtn";
export const UPDATE_TITLE_BTN_ID = "updateTitleBtn";
export const DELETE_PROJECT_BTN_ID = "deleteProjectBtn";

export const ACTION_BUTTONS = {
  "markFinishedBtn": "Mark Finished",
  "updateTitleBtn": "Update Title",
  "deleteProjectBtn": "Delete Project"
};

export const SECTION_DETAILS = {
  COUNTERS: {
    key: 0,
    title: "",
    data: []
  },
  PHOTOS: {
    key: 1,
    title: "Photos",
    data: ["photos"]
  },
  NOTES: {
    key: 2,
    title: "Notes",
    data: ["notes"]
  },
  ACTIONS: {
    key: 3,
    title: "Actions",
    data: [MARK_FINISHED_BTN_ID, UPDATE_TITLE_BTN_ID, DELETE_PROJECT_BTN_ID]
  }
};

export default SECTION_DETAILS;
