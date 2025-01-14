import pickProperties from '../../utilities/pick_properties.js';
import { sendResponse } from '../../helpers/message_sender.js';

const combinationPostValidation = (req, res, next) => {
  try {
    const keys = ['data', 'length'];
    const dataObj = pickProperties(req.body, keys);

    const data = dataObj?.data;
    const combLength = dataObj?.length;

    if (!data || !combLength) {
      throw new Error('Combo: Some of the required properties are missing (data or length)');
    }

    if (typeof combLength !== 'number') {
      throw new Error('Combo: Length should be a number');
    }

    if (!Array.isArray(data)) {
      throw new Error('Combo: Data should be an array of numbers');
    }

    if (data.length > 26) {
      throw new Error('Combo: Length should be at least 26 characters');
    }

    // Check if all items in the data array are numbers
    data.forEach(item => {
      if (typeof item !== 'number') {
        throw new Error('Combo: Data should be an array of numbers');
      }
    });

    next();
  } catch (error) {
    // Handle errors based on type
    if (error instanceof SyntaxError) {
      sendResponse(res, 400, false, 'Invalid JSON format');
    } else if (error.message.includes('Combo:')) {
      sendResponse(res, 400, false, error.message);
    } else {
      sendResponse(res, 500, false, 'Internal Server Error');
    }
  }
};

export default combinationPostValidation;
