import db from '../connection/db.js';

const Combination = {
  postCombination: async (items, combinations) => {
    // Start the transaction
    try {
      await db.query('START TRANSACTION'); // Begin transaction

      // Insert items into the 'items' table and get inserted IDs
      const insertItemsQuery = 'INSERT INTO items (data) VALUES (?)';
      const itemsJSON = JSON.stringify(items);
      const [insertedItems] = await db.query(insertItemsQuery, [itemsJSON]);

      // Insert combinations into the 'combinations' table using the inserted item IDs
      const insertCombinationsQuery = 'INSERT INTO combinations (items_id, data) VALUES (?, ?)';
      const combinationsJSON = JSON.stringify(combinations);
      const [insertedCombinations] = await db.query(insertCombinationsQuery, [insertedItems.insertId, combinationsJSON]);

      // Insert a success response into the 'responses' table
      const insertResponseQuery = 'INSERT INTO responses (status, message, data) VALUES (?, ?, ?)';
      await db.query(insertResponseQuery, [
        'success',
        'Items and combinations were successfully inserted.',
        JSON.stringify({ insertedItemID: insertedItems.insertId, combinationID: insertedCombinations.insertId })
      ]);

      // Commit the transaction
      await db.query('COMMIT');
      return { status: 'success', message: 'Items and combinations were successfully inserted.', combinations };

    } catch (error) {
      // Rollback transaction if error
      await db.query('ROLLBACK');

      // Insert an error response into the 'responses' table
      const insertErrorResponseQuery = 'INSERT INTO responses (status, message, data) VALUES (?, ?, ?)';
      await db.query(insertErrorResponseQuery, [
        'error',
        error.message || 'An error occurred while processing the request.',
        null
      ]);

      return { status: 'error', message: error.message || 'An error occurred.', combinations: null };
    }
  }
};

export default Combination;