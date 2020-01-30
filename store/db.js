import * as SQLite from 'expo-sqlite';

// Connect or create DB
const db = SQLite.openDatabase('knitcount.db');

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
              startDate INTEGER NOT NULL,
              modifiedDate INTEGER NOT NULL,
              endDate INTEGER NULL
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
                  stepsPerCount INTEGER NOT NULL
                );`,
              [],
              () => {
                db.transaction((tx) => {
                  tx.executeSql(
                    `
                      CREATE TABLE IF NOT EXISTS image_uris (
                        id INTEGER PRIMARY KEY NOT NULL,
                        project_id INTEGER NOT NULL,
                        imageUri TEXT NOT NULL
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

export const insertProject = (project) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO projects (name, status, notes, startDate, modifiedDate, endDate)
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
          INSERT INTO counters (project_id, label, value, stepsPerCount)
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
          INSERT INTO image_uris (project_id, imageUri)
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
          SELECT id, name, status, notes, startDate, modifiedDate, endDate
          FROM projects 
          ORDER BY modifiedDate 
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
        `SELECT id, project_id, label, value, stepsPerCount FROM counters WHERE project_id = ?;`,
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
        `SELECT id, project_id, imageUri FROM image_uris WHERE project_id = ?;`,
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
