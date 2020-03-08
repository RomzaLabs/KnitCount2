import * as SQLite from 'expo-sqlite';
import AppSettings from "../models/AppSettings";
import Sounds from "../constants/Sounds";

// Connect or create DB
const db = SQLite.openDatabase('knitcount.db');

export const initSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY NOT NULL,
            is_premium INTEGER NOT NULL,
            main_color TEXT NOT NULL,
            main_text_color TEXT NOT NULL,
            main_bg_color TEXT NOT NULL,
            filter_preference TEXT NOT NULL,
            interactions_towards_review_ask INTEGER NOT NULL,
            last_asked_to_review_date INTEGER NULL,
            audio_pack TEXT NOT NULL
          );
        `,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

const migrateOldSettings = (resolveFetch) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT
               id, 
               is_premium, 
               main_color, 
               main_text_color, 
               main_bg_color, 
               filter_preference, 
               interactions_towards_review_ask, 
               last_asked_to_review_date
        FROM settings;`,
        [],
        (_, result) => {
          const oldResult = result.rows._array[0];
          const newSettings = new AppSettings(
            oldResult.id,
            oldResult.is_premium,
            oldResult.main_color,
            oldResult.main_text_color,
            oldResult.main_bg_color,
            oldResult.filter_preference,
            oldResult.interactions_towards_review_ask,
            oldResult.last_asked_to_review_date,
            Sounds.default
          );

          dropSettings()
            .then(initSettings)
            .then(() => updateSettings(newSettings))
            .then(() => resolveFetch(fetchSettings()));

          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

const dropSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE settings;`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT
               id, 
               is_premium, 
               main_color, 
               main_text_color, 
               main_bg_color, 
               filter_preference, 
               interactions_towards_review_ask, 
               last_asked_to_review_date,
               audio_pack
        FROM settings;`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          if (err.message.includes("no such column")) {
            migrateOldSettings(resolve);
          } else {
            reject(err);
          }
        }
      );
    });
  });
  return promise;
};

export const insertSettings = (settings) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO settings (
                                is_premium, 
                                main_color, 
                                main_text_color, 
                                main_bg_color, 
                                filter_preference, 
                                interactions_towards_review_ask, 
                                last_asked_to_review_date,
                                audio_pack
                               )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
          settings.isPremium,
          settings.mainColor,
          settings.mainTextColor,
          settings.mainBGColor,
          settings.filterPreference,
          settings.interactionsTowardsReviewAsk,
          settings.lastAskedToReviewDate,
          settings.audioPack
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateSettings = (settings) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          UPDATE settings
          SET 
              is_premium = ?, 
              main_color = ?, 
              main_text_color = ?, 
              main_bg_color = ?, 
              filter_preference = ?,
              interactions_towards_review_ask = ?,
              last_asked_to_review_date = ?,
              audio_pack = ?
          WHERE id = 1
        `,
        [
          settings.isPremium,
          settings.mainColor,
          settings.mainTextColor,
          settings.mainBGColor,
          settings.filterPreference,
          settings.interactionsTowardsReviewAsk,
          settings.lastAskedToReviewDate,
          settings.audioPack
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
