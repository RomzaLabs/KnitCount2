export const PREMIUM = "premium";
export const COLORS = "colors";
export const SEND_FEEDBACK = "sendFeedback";
export const TUTORIAL = "tutorial";
export const INSTAGRAM = "instagram";
export const RATE = "rate";
export const VERSION = "version";

export const SECTION_SETTINGS = {
  PREMIUM: {
    key: 0,
    title: "Premium",
    data: [PREMIUM]
  },
  APP_COLOR: {
    key: 1,
    title: "Main App Color",
    data: [COLORS]
  },
  GENERAL: {
    key: 2,
    title: "General",
    data: [SEND_FEEDBACK, TUTORIAL, INSTAGRAM, RATE]
  },
  APP_VERSION: {
    key: 3,
    title: "Application Version",
    data: [VERSION]
  }
};

export default SECTION_SETTINGS;
