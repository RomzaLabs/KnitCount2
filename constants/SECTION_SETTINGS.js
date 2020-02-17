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

export const SECTION_SETTINGS_DATA = [
  { key: SECTION_SETTINGS.PREMIUM.key, title: SECTION_SETTINGS.PREMIUM.title, data: SECTION_SETTINGS.PREMIUM.data },
  { key: SECTION_SETTINGS.APP_COLOR.key, title: SECTION_SETTINGS.APP_COLOR.title, data: SECTION_SETTINGS.APP_COLOR.data },
  { key: SECTION_SETTINGS.GENERAL.key, title: SECTION_SETTINGS.GENERAL.title, data: SECTION_SETTINGS.GENERAL.data },
  { key: SECTION_SETTINGS.APP_VERSION.key, title: SECTION_SETTINGS.APP_VERSION.title, data: SECTION_SETTINGS.APP_VERSION.data }
];

export default SECTION_SETTINGS;
