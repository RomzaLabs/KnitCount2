import * as SQLite from 'expo-sqlite';

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
          reject(err);
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
