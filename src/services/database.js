import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'itemsDB.db' });

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);'
    );
  });
};

export const getAllItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM items;', [], (tx, results) => {
      callback(results.rows.raw());
    }, (error) => {
      console.error('Error fetching items:', error);
      callback([]);
    });
  });
};

export const addItemToDB = (name, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, description) VALUES (?,?);',
      [name, description],
      (tx, results) => {
        callback(results.insertId);
      },
      (error) => {
        console.error('Error adding item:', error);
        callback(null);
      }
    );
  });
};

export const updateItemInDB = (id, name, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE items SET name=?, description=? WHERE id=?;',
      [name, description, id],
      () => callback(true),
      (error) => {
        console.error('Error updating item:', error);
        callback(false);
      }
    );
  });
};

export const deleteItemFromDB = (id, callback) => {
  db.transaction(tx => {
    // First check if the item exists
    tx.executeSql(
      'SELECT id FROM items WHERE id = ?;',
      [id],
      (tx, results) => {
        if (results.rows.length === 0) {
          // Item doesn't exist, consider it a success
          callback(true);
          return;
        }
        
        // Item exists, proceed with deletion
        tx.executeSql(
          'DELETE FROM items WHERE id=?;',
          [id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              callback(true);
            } else {
              callback(false);
            }
          },
          (error) => {
            console.error('Error deleting item:', error);
            callback(false);
          }
        );
      },
      (error) => {
        console.error('Error checking item existence:', error);
        callback(false);
      }
    );
  });
};
