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
                      CREATE TABLE IF NOT EXISTS images (
                        id INTEGER PRIMARY KEY NOT NULL,
                        project_id INTEGER NOT NULL,
                        image_uri TEXT NOT NULL,
                        date_added INTEGER NOT NULL
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
          INSERT INTO projects (name, status, notes, start_date, modified_date, end_date)
          VALUES (?, ?, ?, ?, ?, ?);
        `,
        [project.name, project.status, project.notes, project.startDate, project.modifiedDate, project.endDate],
        (_, result) => {
          const projectId = result.insertId;
          if (project.counters && project.counters.length) {
            insertCounters(projectId, project.counters).then(r => console.log("counters inserted"));
          }
          if (project.images && project.images.length) {
            insertImages(projectId, project.images).then(r => console.log("images inserted"))
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

export const deleteProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM projects WHERE id = ?`,
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

export const deleteCounter = (counterId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM counters WHERE id = ?`,
        [counterId],
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

export const deleteCountersForProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM counters WHERE project_id = ?`,
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

const insertImages = async(projectId, images) => {
  for (const image of images) {
    try {
      await insertImage(projectId, image);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

export const insertImage = (projectId, image) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          INSERT INTO images (project_id, image_uri, date_added)
          VALUES (?, ?, ?);
        `,
        [projectId, image.imageUri, image.dateAdded],
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

export const deleteImage = (imageId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM images WHERE id = ?`,
        [imageId],
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

export const deleteImagesForProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM images WHERE project_id = ?`,
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

export const fetchImagesForProject = (projectId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, project_id, image_uri, date_added FROM images WHERE project_id = ? ORDER BY date_added desc;`,
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
