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
            filter_preference TEXT NOT NULL
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

export const initProjects = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          CREATE TABLE IF NOT EXISTS projects (
              id INTEGER PRIMARY KEY NOT NULL, 
              name TEXT NOT NULL, 
              status TEXT NOT NULL,
              notes TEXT NOT NULL,
              start_date INTEGER NOT NULL,
              modified_date INTEGER NOT NULL,
              end_date INTEGER NULL
          );
        `,
        [],
        () => {
          db.transaction((tx) => {
            tx.executeSql(
              `
                CREATE TABLE IF NOT EXISTS counters (
                  id INTEGER PRIMARY KEY NOT NULL,
                  project_id INTEGER NOT NULL,
                  label TEXT NOT NULL,
                  value INTEGER NOT NULL,
                  steps_per_count INTEGER NOT NULL
                );`,
              [],
              () => {
                db.transaction((tx) => {
                  tx.executeSql(
                    `
                      CREATE TABLE IF NOT EXISTS image_uris (
                        id INTEGER PRIMARY KEY NOT NULL,
                        project_id INTEGER NOT NULL,
                        image_uri TEXT NOT NULL
                      );`,
                    [],
                    () => {
                      resolve();
                    },
                    (_, err) => {
                      reject(err);
                    }
                  )
                });
              },
              (_, err) => {
                reject(err);
              }
            )
          });
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
        `SELECT id, is_premium, main_color, main_text_color, main_bg_color, filter_preference FROM settings;`,
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
          INSERT INTO settings (is_premium, main_color, main_text_color, main_bg_color, filter_preference)
          VALUES (?, ?, ?, ?, ?);
        `,
        [settings.isPremium, settings.mainColor, settings.mainTextColor, settings.mainBGColor, settings.filterPreference],
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
          SET is_premium = ?, main_color = ?, main_text_color = ?, main_bg_color = ?, filter_preference = ?
          WHERE id = 1
        `,
        [settings.isPremium, settings.mainColor, settings.mainTextColor, settings.mainBGColor, settings.filterPreference],
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

export const insertProject = (project) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO projects (name, status, notes, start_date, modified_date, end_date)
          VALUES (?, ?, ?, ?, ?, ?);
        `,
        [project.name, project.status, project.notes, project.startDate, project.modifiedDate, project.endDate],
        (_, result) => {
          const projectId = result.insertId;
          if (project.counters && project.counters.length) {
            insertCounters(projectId, project.counters).then(r => console.log("counters inserted"));
          }
          if (project.imageUris && project.imageUris.length) {
            insertImageUris(projectId, project.imageUris).then(r => console.log("image uris inserted"))
          }
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

export const updateProject = (project) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          UPDATE projects
          SET name = ?, status = ?, notes = ?, start_date = ?, modified_date = ?, end_date = ?
          WHERE id = ?
        `,
        [project.name, project.status, project.notes, project.startDate, project.modifiedDate, project.endDate, project.id],
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

export const updateCounter = (counter) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          UPDATE counters
          SET label = ?, value = ?, steps_per_count = ?
          WHERE id = ?
        `,
        [counter.label, counter.value, counter.stepsPerCount, counter.id],
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

const insertCounters = async(projectId, counters) => {
  for (const counter of counters) {
    try {
      await insertCounter(projectId, counter);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

const insertCounter = (projectId, counter) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO counters (project_id, label, value, steps_per_count)
          VALUES (?, ?, ?, ?);
        `,
        [projectId, counter.label, counter.value, counter.stepsPerCount],
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

const insertImageUris = async(projectId, imageUris) => {
  for (const imageUri of imageUris) {
    try {
      await insertImageUri(projectId, imageUri);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

const insertImageUri = (projectId, imageUri) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO image_uris (project_id, image_uri)
          VALUES (?, ?);
        `,
        [projectId, imageUri],
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

export const fetchProjects = (offset = 0, limit = 20) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          SELECT id, name, status, notes, start_date, modified_date, end_date
          FROM projects 
          ORDER BY modified_date 
          LIMIT ? OFFSET ?;
        `,
        [limit, offset],
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

export const fetchCountersForProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, project_id, label, value, steps_per_count FROM counters WHERE project_id = ?;`,
        [projectId],
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

export const fetchImageUrisForProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, project_id, image_uri FROM image_uris WHERE project_id = ?;`,
        [projectId],
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
